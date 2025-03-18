# app/services/vocabulary_service.py
import requests
import json
import os
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.services.cloudfront_service import CloudFrontService

class VocabularyService:
    """Service to fetch Verbs & Adjectives"""

    @staticmethod
    async def get_verbs():
        """Fetch verbs"""
        return await CloudFrontService.fetch_json("data_verb.json")

    @staticmethod
    async def get_adjectives():
        """Fetch adjectives"""
        return await CloudFrontService.fetch_json("data_adjectives.json")

    
    @staticmethod
    async def get_all_words() -> Dict[str, List[Dict[str, Any]]]:
        """Fetch all vocabulary words from both files"""
        verbs = await VocabularyService.get_verbs()
        adjectives = await VocabularyService.get_adjectives()
        
        return {
            "verbs": verbs,
            "adjectives": adjectives,
            "total_count": len(verbs) + len(adjectives)
        }
    
    @staticmethod
    async def get_word_by_id(word_id: str) -> Optional[Dict[str, Any]]:
        """Find a word by ID across all vocabulary types"""
        # First check verbs
        verbs = await VocabularyService.get_verbs()
        for verb in verbs:
            if verb.get('id') == word_id:
                verb['word_type'] = 'verb'
                return verb
        
        # Then check adjectives
        adjectives = await VocabularyService.get_adjectives()
        for adj in adjectives:
            if adj.get('id') == word_id:
                adj['word_type'] = 'adjective'
                return adj
        
        # Word not found
        return None
    
    @staticmethod
    async def search_words(query: str) -> List[Dict[str, Any]]:
        """Search for words across all vocabulary types"""
        results = []
        
        # Get all words
        verbs = await VocabularyService.get_verbs()
        adjectives = await VocabularyService.get_adjectives()
        
        # Search in verbs
        for verb in verbs:
            if (query.lower() in verb.get('japanese', '').lower() or
                query.lower() in verb.get('english', '').lower() or
                query.lower() in verb.get('romaji', '').lower()):
                verb['word_type'] = 'verb'
                results.append(verb)
        
        # Search in adjectives
        for adj in adjectives:
            if (query.lower() in adj.get('japanese', '').lower() or
                query.lower() in adj.get('english', '').lower() or
                query.lower() in adj.get('romaji', '').lower()):
                adj['word_type'] = 'adjective'
                results.append(adj)
        
        return results