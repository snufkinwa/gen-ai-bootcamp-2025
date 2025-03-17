import boto3
import os
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Any

# Initialize DynamoDB client
dynamodb = boto3.resource("dynamodb", region_name=os.getenv("AWS_REGION", "us-east-1"))

# Table references
USER_PROGRESS_TABLE = os.getenv("DYNAMODB_USER_PROGRESS_TABLE", "KOTOBA_NEXUS_UserProgress")
STUDY_SESSIONS_TABLE = os.getenv("DYNAMODB_STUDY_SESSIONS_TABLE", "StudySessions")
REVIEW_LOGS_TABLE = os.getenv("DYNAMODB_REVIEW_LOGS_TABLE", "ReviewLogs")

user_progress_table = dynamodb.Table(USER_PROGRESS_TABLE)
study_sessions_table = dynamodb.Table(STUDY_SESSIONS_TABLE)
review_logs_table = dynamodb.Table(REVIEW_LOGS_TABLE)

class StudyProgressRepository:
    """Handles study progress tracking across multiple DynamoDB tables"""

    def get_user_progress(self, user_id: str) -> Dict[str, Any]:
        """Retrieve all study progress data for a user from DynamoDB"""
        try:
            response = user_progress_table.query(
                KeyConditionExpression="user_id = :uid",
                ExpressionAttributeValues={":uid": user_id}
            )
            items = response.get("Items", [])

            # Calculate summary
            total_words = len(items)
            total_correct = sum(item.get("correct_count", 0) for item in items)
            total_wrong = sum(item.get("wrong_count", 0) for item in items)
            study_time = total_words * 5  # Assume 5 minutes per word studied

            # Calculate study streak
            today = datetime.utcnow().date()
            study_dates = set(
                item.get("last_reviewed", "").split("T")[0] for item in items if item.get("last_reviewed")
            )
            study_dates = sorted([datetime.strptime(date, "%Y-%m-%d").date() for date in study_dates])

            streak = 0
            for i in range(len(study_dates) - 1, -1, -1):
                if today - timedelta(days=streak) == study_dates[i]:
                    streak += 1
                else:
                    break

            return {
                "user_id": user_id,
                "total_words_studied": total_words,
                "total_correct": total_correct,
                "total_wrong": total_wrong,
                "success_rate": round(total_correct / max(1, total_correct + total_wrong) * 100, 1),
                "study_streak": streak,
                "minutes_studied": study_time
            }
        except Exception as e:
            print(f"Error retrieving user progress: {str(e)}")
            return {"error": str(e)}

    def update_word_progress(self, user_id: str, word_id: str, correct: bool) -> Dict[str, Any]:
        """Update word progress in the UserProgress table"""
        now = datetime.now().isoformat()
        
        # Get current progress
        current_progress = self.get_word_progress(user_id, word_id)
        
        # Calculate new proficiency level
        current_proficiency = current_progress.get("proficiency_level", 0)
        new_proficiency = min(10, current_proficiency + 1) if correct else max(0, current_proficiency - 1)

        # Update item
        response = user_progress_table.update_item(
            Key={"user_id": user_id, "word_id": word_id},
            UpdateExpression=(
                "SET last_reviewed = :now, proficiency_level = :prof, "
                + ("correct_count = if_not_exists(correct_count, :zero) + :one" if correct
                   else "wrong_count = if_not_exists(wrong_count, :zero) + :one")
            ),
            ExpressionAttributeValues={":now": now, ":prof": new_proficiency, ":zero": 0, ":one": 1},
            ReturnValues="ALL_NEW",
        )
        
        return response.get("Attributes", {})

    def log_review(self, user_id: str, session_id: str, word_id: str, correct: bool) -> Dict[str, Any]:
        """Log a review event and update study session stats"""
        try:
            review_id = str(uuid.uuid4())
            now = datetime.now().isoformat()

            # Insert into ReviewLogs
            review_item = {
                "id": review_id,
                "user_id": user_id,
                "session_id": session_id,
                "word_id": word_id,
                "correct": correct,
                "timestamp": now
            }
            review_logs_table.put_item(Item=review_item)

            # Update Study Session Statistics
            update_expr = "ADD review_count :inc, "
            update_expr += "correct_count :inc" if correct else "wrong_count :inc"

            study_sessions_table.update_item(
                Key={"id": session_id},
                UpdateExpression=update_expr,
                ExpressionAttributeValues={":inc": 1}
            )

            # Update word progress
            progress = self.update_word_progress(user_id, word_id, correct)

            return {
                "review_id": review_id,
                "session_id": session_id,
                "word_id": word_id,
                "correct": correct,
                "timestamp": now,
                "proficiency_level": progress.get("proficiency_level", 0)
            }
        except Exception as e:
            print(f"Error logging review: {str(e)}")
            raise

    def get_user_progress_summary(self, user_id: str) -> Dict[str, Any]:
        """Get overall study progress summary for a user"""
        try:
            response = user_progress_table.query(
                KeyConditionExpression="user_id = :uid",
                ExpressionAttributeValues={":uid": user_id}
            )
            items = response.get("Items", [])

            # Calculate statistics
            total_words = len(items)
            total_correct = sum(item.get("correct_count", 0) for item in items)
            total_wrong = sum(item.get("wrong_count", 0) for item in items)

            # Count words at different proficiency levels
            proficiency_counts = {i: 0 for i in range(11)}
            for item in items:
                level = item.get("proficiency_level", 0)
                proficiency_counts[level] += 1

            return {
                "user_id": user_id,
                "total_words_studied": total_words,
                "total_correct": total_correct,
                "total_wrong": total_wrong,
                "success_rate": round(total_correct / max(1, total_correct + total_wrong) * 100, 1),
                "proficiency_distribution": proficiency_counts,
                "mastered_words": proficiency_counts.get(10, 0)
            }
        except Exception as e:
            print(f"Error getting progress summary: {str(e)}")
            return {
                "user_id": user_id,
                "total_words_studied": 0,
                "error": str(e)
            }