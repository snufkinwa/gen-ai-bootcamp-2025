from fastapi import APIRouter, Body, HTTPException, Depends
from typing import List, Dict, Any, Optional
from ..services.vector_store import VectorStoreService
from ..services.youtube_transcription import YouTubeTranscriptionService
from ..services.tts_service import TTSService
from ..services.question_generator import QuestionGeneratorService

router = APIRouter(prefix="/api/listening", tags=["Listening Practice"])

# Dependency injection
def get_vector_store():
    return VectorStoreService()

def get_youtube_service():
    return YouTubeTranscriptionService()

def get_tts_service():
    return TTSService()

def get_question_generator():
    return QuestionGeneratorService()

@router.post("/youtube/transcribe")
async def transcribe_youtube(
    youtube_url: str = Body(..., embed=True),
    youtube_service = Depends(get_youtube_service)
):
    """Get transcriptions from YouTube video"""
    try:
        transcription = await youtube_service.get_transcription(youtube_url)
        return {"success": True, "transcription": transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/store-transcriptions")
async def store_transcriptions(
    transcriptions: List[str] = Body(...),
    vector_store = Depends(get_vector_store)
):
    """Store transcriptions in vector database"""
    try:
        vector_store.add_transcriptions(transcriptions)
        return {"success": True, "message": f"Stored {len(transcriptions)} transcriptions"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-question")
async def generate_question(
    topic: str = Body(..., embed=True),
    difficulty: str = Body("medium"),
    vector_store = Depends(get_vector_store),
    question_generator = Depends(get_question_generator)
):
    """Generate a listening question based on a topic"""
    try:
        # Get similar transcriptions from vector store
        similar_texts = vector_store.search_similar(topic, top_k=3)
        
        # Generate question using the retrieved context
        context = " ".join([item["text"] for item in similar_texts])
        question = await question_generator.generate_question(context, topic, difficulty)
        
        return {
            "success": True,
            "question": question["question"],
            "options": question["options"],
            "correct_answer": question["correct_answer"],
            "context": question["context"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-audio")
async def generate_audio(
    text: str = Body(..., embed=True),
    tts_service = Depends(get_tts_service)
):
    """Generate audio for a given text using TTS service"""
    try:
        audio_url = await tts_service.generate_audio(text)
        return {"success": True, "audio_url": audio_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/vocabulary-to-question")
async def vocabulary_to_question(
    word_id: str = Body(..., embed=True),
    from_vocabulary_router = Depends(vocabulary_router.get_word),
    question_generator = Depends(get_question_generator),
    tts_service = Depends(get_tts_service)
):
    """Create a question and audio from vocabulary item"""
    try:
        # Get vocabulary word
        word = await from_vocabulary_router(word_id)
        
        # Generate question using the vocabulary
        question = await question_generator.generate_from_vocabulary(word)
        
        # Generate audio for the question
        audio_url = await tts_service.generate_audio(question["audio_text"])
        
        return {
            "success": True,
            "word": word,
            "question": question["question"],
            "options": question["options"],
            "correct_answer": question["correct_answer"],
            "audio_url": audio_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))