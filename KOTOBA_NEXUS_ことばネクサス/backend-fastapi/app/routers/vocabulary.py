from fastapi import APIRouter, HTTPException, Query, Path
from typing import Dict, List, Any, Optional

from app.services.vocabulary_service import VocabularyService

router = APIRouter(prefix="/api/vocabulary", tags=["Vocabulary"])

@router.get("/verbs")
async def get_verbs():
    """Get all verbs from the CloudFront-hosted JSON file"""
    return await VocabularyService.get_verbs()

@router.get("/adjectives")
async def get_adjectives():
    """Get all adjectives from the CloudFront-hosted JSON file"""
    return await VocabularyService.get_adjectives()

@router.get("/all")
async def get_all_words():
    """Get all vocabulary words from all hosted JSON files"""
    return await VocabularyService.get_all_words()

@router.get("/search")
async def search_words(query: str = Query(..., description="Search term")):
    """Search for words across all vocabulary types"""
    results = await VocabularyService.search_words(query)
    return {
        "query": query,
        "results": results,
        "count": len(results)
    }

@router.get("/{word_id}")
async def get_word(word_id: str = Path(..., description="Word ID")):
    """Get a specific word by ID"""
    word = await VocabularyService.get_word_by_id(word_id)
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    return word