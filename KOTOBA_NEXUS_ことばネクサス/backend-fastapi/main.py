from fastapi import FastAPI, Body, Query, Path

app = FastAPI()

# 1) STUDY ACTIVITIES

@app.get("/api/study_activities/{id}")
def get_study_activity(id: int = Path(..., description="Study Activity ID")):
    return {"id": id, "name": "Mock Activity"}

@app.get("/api/study_activities/{id}/study_sessions")
def get_study_activity_sessions(
    id: int = Path(..., description="Study Activity ID"),
    page: int = Query(1, ge=1),
    per_page: int = Query(100, ge=1, le=100)
):
    return {
        "items": [
            {
                "id": 123,
                "activity_name": "Vocabulary Quiz",
                "group_name": "Basic Greetings",
                "start_time": "2025-02-08T17:20:23-05:00",
                "end_time": "2025-02-08T17:30:23-05:00",
                "review_items_count": 20
            }
        ],
        "pagination": {
            "current_page": page,
            "total_pages": 1,
            "total_items": 20,
            "items_per_page": per_page
        }
    }

@app.post("/api/study_activities")
def create_study_activity(
    group_id: int = Body(..., description="Group ID"),
    study_activity_id: int = Body(..., description="Activity Type ID")
):
    return {"id": 124, "group_id": group_id, "study_activity_id": study_activity_id}

# 2) WORDS

@app.get("/api/words")
def get_words(
    page: int = Query(1, ge=1),
    per_page: int = Query(100, ge=1, le=100)
):
    return {
        "items": [
            {
                "id": "1",
                "japanese": "こんにちは",
                "romaji": "konnichiwa",
                "english": "hello",
                "correct_count": 5,
                "wrong_count": 2
            }
        ],
        "pagination": {
            "current_page": page,
            "total_pages": 1,
            "total_items": 500,
            "items_per_page": per_page
        }
    }

@app.get("/api/words/{id}")
def get_word(id: int = Path(..., description="Word ID")):
    return {
        "japanese": "こんにちは",
        "romaji": "konnichiwa",
        "english": "hello",
        "stats": {"correct_count": 5, "wrong_count": 2},
        "groups": [
            {
                "id": 1,
                "name": "Basic Greetings"
            }
        ]
    }

# 3) GROUPS

@app.get("/api/groups")
def get_groups(
    page: int = Query(1, ge=1),
    per_page: int = Query(100, ge=1, le=100)
):
    return {
        "items": [
            {
                "id": 1,
                "name": "Basic Greetings",
                "word_count": 20
            }
        ],
        "pagination": {
            "current_page": page,
            "total_pages": 1,
            "total_items": 10,
            "items_per_page": per_page
        }
    }

@app.get("/api/groups/{id}")
def get_group(id: int = Path(..., description="Group ID")):
    return {
        "id": id,
        "name": "Basic Greetings",
        "stats": {"total_word_count": 20}
    }

@app.get("/api/groups/{id}/study_sessions")
def get_group_study_sessions(
    id: int = Path(..., description="Group ID"),
    page: int = Query(1, ge=1),
    per_page: int = Query(100, ge=1, le=100)
):
    return {
        "items": [
            {
                "id": 123,
                "activity_name": "Vocabulary Quiz",
                "group_name": "Basic Greetings",
                "start_time": "2025-02-08T17:20:23-05:00",
                "end_time": "2025-02-08T17:30:23-05:00",
                "review_items_count": 20
            }
        ],
        "pagination": {
            "current_page": page,
            "total_pages": 1,
            "total_items": 5,
            "items_per_page": per_page
        }
    }

# 4) STUDY SESSIONS

@app.get("/api/study_sessions")
def get_study_sessions(
    page: int = Query(1, ge=1),
    per_page: int = Query(100, ge=1, le=100)
):
    return {
        "items": [
            {
                "id": 123,
                "activity_name": "Vocabulary Quiz",
                "group_name": "Basic Greetings",
                "start_time": "2025-02-08T17:20:23-05:00",
                "end_time": "2025-02-08T17:30:23-05:00",
                "review_items_count": 20
            }
        ],
        "pagination": {
            "current_page": page,
            "total_pages": 5,
            "total_items": 100,
            "items_per_page": per_page
        }
    }

@app.get("/api/study_sessions/{id}")
def get_study_session(id: int = Path(..., description="Study Session ID")):
    return {
        "id": id,
        "activity_name": "Vocabulary Quiz",
        "group_name": "Basic Greetings",
        "start_time": "2025-02-08T17:20:23-05:00",
        "end_time": "2025-02-08T17:30:23-05:00",
        "review_items_count": 20
    }

@app.get("/api/study_sessions/{id}/words")
def get_study_session_words(
    id: int = Path(..., description="Study Session ID"),
    page: int = Query(1, ge=1),
    per_page: int = Query(100, ge=1, le=100)
):
    return {
        "items": [
            {
                "japanese": "こんにちは",
                "romaji": "konnichiwa",
                "english": "hello",
                "correct_count": 5,
                "wrong_count": 2
            }
        ],
        "pagination": {
            "current_page": page,
            "total_pages": 1,
            "total_items": 20,
            "items_per_page": per_page
        }
    }

# 5) RESET ENDPOINTS

@app.post("/api/reset_history")
def reset_history():
    return {
        "success": True,
        "message": "Study history has been reset"
    }

@app.post("/api/full_reset")
def full_reset():
    return {
        "success": True,
        "message": "System has been fully reset"
    }

# 6) REVIEW ENDPOINT

@router.post("/api/study_sessions/{session_id}/words/{word_id}/review")
def log_kana_review(
    session_id: int,
    word_id: int,
    user_id: str = Body(...),
    correct: bool = Body(...),
    mistakes: List[str] = Body([]),
    ai_feedback: str = Body("")
):
    """Logs AI feedback on Kana writing."""
    
    now = datetime.utcnow().isoformat()
    
    review_entry = {
        "user_id": user_id,
        "session_id": session_id,
        "word_id": word_id,
        "correct": correct,
        "mistakes": mistakes,
        "ai_feedback": ai_feedback,
        "timestamp": now
    }

    # Store in DynamoDB
    dynamodb.Table("KOTOBA_NEXUS_UserProgress").put_item(Item=review_entry)

    return {"message": "Review logged", "data": review_entry}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)