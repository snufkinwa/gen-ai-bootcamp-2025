import boto3
import os
from typing import Dict, Any

# AWS Bedrock settings
bedrock = boto3.client("bedrock-runtime", region_name=os.getenv("AWS_REGION", "us-east-1"))

class QuestionGenerationService:
    """Generate language learning questions using Amazon Bedrock"""

    @staticmethod
    def generate_question(transcript_snippet: str, use_mistral: bool = False) -> Dict[str, Any]:
        """Generate a question from a transcript snippet using Claude or Mistral 7B"""
        model_id = "anthropic.claude-v2" if not use_mistral else "mistral.mistral-7b-instruct"

        payload = {
            "prompt": f"Generate a language quiz question based on: {transcript_snippet}",
            "max_tokens": 100
        }

        response = bedrock.invoke_model(
            modelId=model_id,
            body=payload
        )

        output = response["body"].read().decode("utf-8")
        return {"question": output, "model_used": model_id}
