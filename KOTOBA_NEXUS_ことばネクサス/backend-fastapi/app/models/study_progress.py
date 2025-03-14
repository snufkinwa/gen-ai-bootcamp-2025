# app/models/study_progress.py
import boto3
import os
import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional

# DynamoDB client
dynamodb = boto3.resource(
    'dynamodb',
    region_name=os.getenv('AWS_REGION', 'us-east-1')
)

class StudyProgressRepository:
    """Repository for tracking user study progress in DynamoDB"""
    
    def __init__(self):
        self.sessions_table = dynamodb.Table(os.getenv('DYNAMODB_SESSIONS_TABLE', 'StudySessions'))
        self.progress_table = dynamodb.Table('WordProgress')
        self.review_logs_table = dynamodb.Table('ReviewLogs')
    
    def get_word_progress(self, user_id: str, word_id: str) -> Dict[str, Any]:
        """Get the progress for a specific word for a user"""
        try:
            response = self.progress_table.get_item(
                Key={
                    'user_id': user_id,
                    'word_id': word_id
                }
            )
            
            item = response.get('Item')
            if not item:
                # Initialize progress if it doesn't exist
                return {
                    'user_id': user_id,
                    'word_id': word_id,
                    'correct_count': 0,
                    'wrong_count': 0,
                    'last_reviewed': None,
                    'proficiency_level': 0  # 0-10 scale
                }
            
            return item
        except Exception as e:
            print(f"Error getting word progress: {str(e)}")
            # Return default values if there's an error
            return {
                'user_id': user_id,
                'word_id': word_id,
                'correct_count': 0,
                'wrong_count': 0,
                'last_reviewed': None,
                'proficiency_level': 0
            }
    
    def update_word_progress(self, user_id: str, word_id: str, correct: bool) -> Dict[str, Any]:
        """Update the progress for a word after a review"""
        now = datetime.now().isoformat()
        
        # Get current progress
        current_progress = self.get_word_progress(user_id, word_id)
        
        # Calculate new proficiency level
        # Simple algorithm: Increase by 1 if correct, decrease by 1 if wrong
        current_proficiency = current_progress.get('proficiency_level', 0)
        new_proficiency = min(10, current_proficiency + 1) if correct else max(0, current_proficiency - 1)
        
        # Update item
        response = self.progress_table.update_item(
            Key={
                'user_id': user_id,
                'word_id': word_id
            },
            UpdateExpression='SET last_reviewed = :now, proficiency_level = :prof, ' + 
                             ('correct_count = if_not_exists(correct_count, :zero) + :one' if correct else 
                              'wrong_count = if_not_exists(wrong_count, :zero) + :one'),
            ExpressionAttributeValues={
                ':now': now,
                ':prof': new_proficiency,
                ':zero': 0,
                ':one': 1
            },
            ReturnValues='ALL_NEW'
        )
        
        return response.get('Attributes', {})
    
    def log_review(self, user_id: str, session_id: str, word_id: str, correct: bool) -> Dict[str, Any]:
        """Log a review and update progress"""
        try:
            # 1. Log the review
            review_id = str(uuid.uuid4())
            now = datetime.now().isoformat()
            
            review_item = {
                'id': review_id,
                'user_id': user_id,
                'session_id': session_id,
                'word_id': word_id,
                'correct': correct,
                'timestamp': now
            }
            
            self.review_logs_table.put_item(Item=review_item)
            
            # 2. Update session stats
            update_expr = 'ADD review_count :inc, '
            update_expr += 'correct_count :inc' if correct else 'wrong_count :inc'
            
            self.sessions_table.update_item(
                Key={'id': session_id},
                UpdateExpression=update_expr,
                ExpressionAttributeValues={
                    ':inc': 1
                }
            )
            
            # 3. Update word progress
            progress = self.update_word_progress(user_id, word_id, correct)
            
            return {
                'review_id': review_id,
                'session_id': session_id,
                'word_id': word_id,
                'correct': correct,
                'timestamp': now,
                'proficiency_level': progress.get('proficiency_level', 0)
            }
        except Exception as e:
            print(f"Error logging review: {str(e)}")
            raise
    
    def get_user_progress_summary(self, user_id: str) -> Dict[str, Any]:
        """Get overall progress summary for a user"""
        try:
            # Scan for all progress items for this user
            response = self.progress_table.query(
                KeyConditionExpression='user_id = :uid',
                ExpressionAttributeValues={
                    ':uid': user_id
                }
            )
            
            items = response.get('Items', [])
            
            # Calculate statistics
            total_words = len(items)
            total_correct = sum(item.get('correct_count', 0) for item in items)
            total_wrong = sum(item.get('wrong_count', 0) for item in items)
            
            # Count words at different proficiency levels
            proficiency_counts = {i: 0 for i in range(11)}  # 0-10 levels
            for item in items:
                level = item.get('proficiency_level', 0)
                proficiency_counts[level] += 1
            
            return {
                'user_id': user_id,
                'total_words_studied': total_words,
                'total_correct': total_correct,
                'total_wrong': total_wrong,
                'success_rate': round(total_correct / max(1, total_correct + total_wrong) * 100, 1),
                'proficiency_distribution': proficiency_counts,
                'mastered_words': proficiency_counts.get(10, 0)
            }
        except Exception as e:
            print(f"Error getting progress summary: {str(e)}")
            return {
                'user_id': user_id,
                'total_words_studied': 0,
                'error': str(e)
            }