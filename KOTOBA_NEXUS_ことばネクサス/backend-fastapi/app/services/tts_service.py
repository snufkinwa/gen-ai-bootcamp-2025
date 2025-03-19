import boto3
import os

# Initialize Polly client
polly = boto3.client("polly", region_name=os.getenv("AWS_REGION", "us-east-1"))

class TTSService:
    """Convert AI-generated text to speech using Amazon Polly"""

    @staticmethod
    def text_to_speech(text: str, voice: str = "Mizuki") -> str:
        """Convert text to MP3 audio using Amazon Polly"""
        response = polly.synthesize_speech(
            Text=text,
            OutputFormat="mp3",
            VoiceId=voice
        )
        return response["AudioStream"].read()
