import yt_dlp
from typing import Dict, Any
from fastapi import HTTPException

class YouTubeTranscriptionService:
    """Fetch transcriptions from YouTube videos using yt-dlp"""

    @staticmethod
    def get_video_transcription(video_url: str, lang: str = "en") -> Dict[str, Any]:
        """Fetch transcription text from a YouTube video using yt-dlp."""
        ydl_opts = {
            "quiet": True,
            "skip_download": True,
            "writesubtitles": True,
            "writeautomaticsub": True,
            "subtitleslangs": [lang],  
            "subtitlesformat": "srt",  
        }

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(video_url, download=False)
                subtitles = info.get("subtitles", {}) or info.get("automatic_captions", {})

                if lang not in subtitles:
                    raise HTTPException(status_code=404, detail=f"No subtitles found for language: {lang}")

                subtitle_url = subtitles[lang][0]["url"]
                return {"video_url": video_url, "subtitle_url": subtitle_url}

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch transcription: {str(e)}")
