from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from typing import Optional
from ..services.kana_service import KanaService

router = APIRouter(prefix="/kana-practice", tags=["Kana Practice"])

# Dependency
def get_kana_service():
    return KanaService()

@router.post("/evaluate")
async def evaluate_kana(
    file: UploadFile = File(...),
    eval_type: str = Form("character"),
    expected_kana: Optional[str] = Form(None),
    kana_service: KanaService = Depends(get_kana_service)
):
    """Evaluate kana writing from uploaded image"""
    try:
        contents = await file.read()
        result = await kana_service.evaluate_kana_image(
            image_data=contents, 
            eval_type=eval_type,
            expected_kana=expected_kana
        )
        
        if not result.get("success", False):
            raise HTTPException(status_code=400, detail=result.get("error", "Evaluation failed"))
            
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/data")
async def get_kana_data(
    kana_service: KanaService = Depends(get_kana_service)
):
    """Get kana character data"""
    try:
        return await kana_service.get_kana()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
async def search_kana(
    query: str,
    kana_service: KanaService = Depends(get_kana_service)
):
    """Search for kana characters"""
    try:
        return await kana_service.search_kana(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/upload-url")
async def get_upload_url(
    filename: str,
    s3_service: S3Service = Depends(get_s3_service)
):
    """Get a presigned URL for uploading an image to S3"""
    try:
        # Generate a unique file key
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        file_key = f"user-uploads/{timestamp}_{filename}"
        
        # Generate the presigned URL
        presigned_url = s3_service.generate_presigned_url(file_key)
        
        if not presigned_url:
            raise HTTPException(status_code=500, detail="Failed to generate upload URL")
        
        return {
            "upload_url": presigned_url,
            "file_key": file_key
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))