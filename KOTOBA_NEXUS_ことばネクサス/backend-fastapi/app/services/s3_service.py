import boto3
import os
from datetime import datetime, timedelta

class S3Service:
    """Service to handle S3 operations"""
    
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
            aws_secret_access_key=os.getenv('AWS_SECRET_KEY'),
            region_name=os.getenv('AWS_REGION', 'us-east-1')
        )
        self.bucket_name = os.getenv('S3_BUCKET_NAME')
    
    def generate_presigned_url(self, file_key, expiration=3600):
        """
        Generate a presigned URL for uploading to S3
        
        Args:
            file_key: The S3 object key for the file
            expiration: URL expiration time in seconds
            
        Returns:
            Presigned URL for PUT operation
        """
        try:
            response = self.s3_client.generate_presigned_url(
                'put_object',
                Params={
                    'Bucket': self.bucket_name,
                    'Key': file_key,
                    'ContentType': 'image/jpeg'
                },
                ExpiresIn=expiration
            )
            return response
        except Exception as e:
            print(f"Error generating presigned URL: {str(e)}")
            return None