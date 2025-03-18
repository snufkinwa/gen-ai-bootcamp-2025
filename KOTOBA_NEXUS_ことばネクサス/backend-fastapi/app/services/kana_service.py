import requests
import os
from typing import List, Dict, Any
from fastapi import HTTPException
from app.services.cloudfront_service import CloudFrontService

class KanaService:
    """Service to fetch Kana characters"""

    @staticmethod
    async def get_kana():
        """Fetch Kana from CloudFront"""
        return await CloudFrontService.fetch_json("kana-data.json")

    @staticmethod
    async def get_kana() -> List[Dict[str, List[Dict[str, str]]]]:
        """Fetch Kana (Hiragana & Katakana) from kana-data.json"""
        try:
            url = f"{CLOUDFRONT_URL}/seed/kana-data.json"
            response = requests.get(url)
            response.raise_for_status()
            return response.json()  # Returns {"hiragana": [...], "katakana": [...]}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch kana: {str(e)}")

    @staticmethod
    async def search_kana(query: str) -> List[Dict[str, Any]]:
        """Search for kana characters by Romaji or Japanese character"""
        results = []
        kana_data = await KanaService.get_kana()

        for kana_dict in kana_data:  # kana_dict is either {"hiragana": [...] } or {"katakana": [...]}
            for script_type, kana_list in kana_dict.items():
                for kana_item in kana_list:
                    if (query.lower() in kana_item["character"] or
                        query.lower() in kana_item["romaji"].lower()):
                        results.append({
                            "character": kana_item["character"],
                            "romaji": kana_item["romaji"],
                            "script": script_type  # "hiragana" or "katakana"
                        })
        return results
