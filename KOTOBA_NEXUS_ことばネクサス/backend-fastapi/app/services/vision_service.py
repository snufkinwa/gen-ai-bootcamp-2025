# vision_service.py
import os
import base64
from typing import List, Dict, Any, Optional
import requests
from io import BytesIO
from PIL import Image
import numpy as np
from anthropic import Anthropic

class VisionService:
    """Service for processing images with Claude Vision API for OCR and character recognition"""

    def __init__(self):
        """Initialize the vision service with Claude client"""
        self.claude = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))
        self.model = "claude-3-opus-20240229"  
    
    def process_image(self, image_data: bytes, prompt: str) -> Dict[str, Any]:
        """
        Process an image using Claude Vision API
        
        Args:
            image_data: Raw image bytes
            prompt: Instruction for Claude about how to process the image
            
        Returns:
            Dict containing the response from Claude
        """
        # Convert image to base64 for API
        try:
            # Ensure the image is properly formatted
            image = Image.open(BytesIO(image_data))
            
            # Convert to JPEG if it's not already
            if image.format != 'JPEG':
                buffer = BytesIO()
                image.convert('RGB').save(buffer, format='JPEG')
                image_data = buffer.getvalue()
            
            # Create the message with the image
            response = self.claude.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            },
                            {
                                "type": "image",
                                "source": {
                                    "type": "base64",
                                    "media_type": "image/jpeg",
                                    "data": base64.b64encode(image_data).decode('utf-8')
                                }
                            }
                        ]
                    }
                ]
            )
            
            return {
                "success": True,
                "text": response.content[0].text,
                "model": response.model
            }
            
        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def recognize_characters(self, image_data: bytes, language: str = "japanese") -> Dict[str, Any]:
        """
        Recognize characters in an image for a specific language
        
        Args:
            image_data: Raw image bytes
            language: Target language Japanese
            
        Returns:
            Dict with recognized text and confidence
        """
        prompt = f"""
        Please analyze this image containing handwritten or printed {language} characters.
        
        1. Identify all {language} characters visible in the image
        2. Provide the transcription of the character(s)
        3. If applicable, provide the romanization
        4. Rate the character formation on a scale of 1-10
        
        Format your response as a JSON object with the fields:
        - characters: The identified characters
        - romanization: The romanization of the characters
        - quality_score: A number 1-10 rating how well-formed the characters are
        - feedback: Brief feedback on the character formation
        
        Return only the JSON object, no other text.
        """
        
        response = self.process_image(image_data, prompt)
        
        if not response["success"]:
            return response
        
        # Try to extract JSON from response
        try:
            import json
            from json.decoder import JSONDecodeError
            
            # Extract JSON from the text response 
            text = response["text"]
            
            # Look for JSON block in markdown
            if "```json" in text:
                json_text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                json_text = text.split("```")[1].split("```")[0].strip()
            else:
                json_text = text
                
            result = json.loads(json_text)
            result["success"] = True
            return result
            
        except (JSONDecodeError, Exception) as e:
            return {
                "success": True,
                "raw_response": response["text"],
                "error_parsing": str(e)
            }