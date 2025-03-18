import os
import requests
from fastapi import HTTPException
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

CLOUDFRONT_URL = os.getenv("CLOUDFRONT_URL")
if not CLOUDFRONT_URL:
    raise ValueError("CLOUDFRONT_URL is not set. Check your .env file.")

class CloudFrontService:
    """Service to fetch JSON data from CloudFront"""

    @staticmethod
    async def fetch_json(filename: str):
        """Fetch JSON from CloudFront with correct path"""
        try:
            # Ensure filename does not start with a slash
            filename = filename.lstrip('/')

            # Ensure correct path format: /seed/{filename}
            url = f"{CLOUDFRONT_URL}/seed/{filename}"

            response = requests.get(url)
            response.raise_for_status()
            return response.json()

        except requests.exceptions.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch {filename}: {str(e)}")
