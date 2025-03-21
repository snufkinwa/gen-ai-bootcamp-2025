from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import routers
from app.routers import vocabulary_router, kana_practice_router, study_progress_router, listening_router
# Create FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(vocabulary_router.router)
app.include_router(kana_practice.router)
app.include_router(study_progress.router)
app.include_router(listening.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "app": "Kotoba Nexus",
        "status": "online"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)