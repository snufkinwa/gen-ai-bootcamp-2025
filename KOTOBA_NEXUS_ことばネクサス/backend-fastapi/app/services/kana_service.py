# kana_service.py
import os
from typing import List, Dict, Any, Optional
from app.services.vision_service import VisionService
from app.services.cloudfront_service import CloudFrontService

class KanaService:
    """Service for Kana character operations"""
    
    def __init__(self):
        """Initialize with vision service for image processing"""
        self.vision_service = VisionService()
    
    @staticmethod
    async def get_kana() -> Dict[str, List[Dict[str, str]]]:
        """Fetch Kana (Hiragana & Katakana) data"""
        try:
            # Use CloudFront to fetch kana data
            return await CloudFrontService.fetch_json("kana-data.json")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch kana: {str(e)}")
    
    @staticmethod
    async def search_kana(query: str) -> List[Dict[str, Any]]:
        """Search for kana characters by Romaji or Japanese character"""
        results = []
        kana_data = await KanaService.get_kana()
        
        # Iterate through hiragana and katakana
        for script_type, kana_list in kana_data.items():
            for kana_item in kana_list:
                if (query.lower() in kana_item["character"] or 
                    query.lower() in kana_item["romaji"].lower()):
                    results.append({
                        "character": kana_item["character"],
                        "romaji": kana_item["romaji"],
                        "script": script_type  # "hiragana" or "katakana"
                    })
        return results
    
    async def evaluate_kana_image(self, image_data: bytes, expected_kana: Optional[str] = None) -> Dict[str, Any]:
        """
        Evaluate kana writing from image data
        
        Args:
            image_data: Raw image bytes
            expected_kana: Expected kana character (if checking against known value)
            
        Returns:
            Evaluation results including recognition and scoring
        """
        # Build a specific prompt for kana recognition
        prompt = """
        Please analyze this image containing a handwritten Japanese kana character.
        
        1. Identify the kana character visible in the image
        2. Indicate whether it's hiragana or katakana
        3. Provide the romanization of the character
        4. Rate the character formation on a scale of 1-10
        
        Format your response as a JSON object with the fields:
        - character: The identified kana character
        - script: Either "hiragana" or "katakana"
        - romanization: The romanization of the character
        - quality_score: A number 1-10 rating how well-formed the character is
        - feedback: Brief feedback on the character formation
        
        Return only the JSON object, no other text.
        """
        
        # If expected_kana is provided, enhance the prompt
        if expected_kana:
            prompt += f"\n\nThe expected kana character is '{expected_kana}'. Please include a 'match' field in your response that is true if the written character matches the expected one, false otherwise."
        
        # Use the vision service for image processing
        response = self.vision_service.process_image(image_data, prompt)
        
        if not response.get("success", False):
            return response
        
        # Try to extract JSON from response
        try:
            import json
            from json.decoder import JSONDecodeError
            
            # Extract JSON from the text response 
            text = response.get("text", "")
            
            # Look for JSON block in markdown
            if "```json" in text:
                json_text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                json_text = text.split("```")[1].split("```")[0].strip()
            else:
                json_text = text
                
            result = json.loads(json_text)
            result["success"] = True
            
            # Add any additional kana-specific logic here
            
            return result
            
        except Exception as e:
            return {
                "success": True,
                "raw_response": response.get("text", ""),
                "error_parsing": str(e)
            }