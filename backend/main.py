from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.responses import JSONResponse
import os
import random
import json
from fastapi.middleware.cors import CORSMiddleware
import asyncpg

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    conn = None
    try:
        conn = await asyncpg.connect("postgresql://postgres:postgres@db:5432/temator")
        await conn.execute("SELECT 1;")
        return {"status": "ok", "db_ready": True}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {str(e)}")
    finally:
        if conn:
            await conn.close()

@app.get("/topic")
async def gettopic():
    conn = None
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'topics.json')
        with open(file_path, 'r') as file:
            topics = json.load(file)
            randomTopic = random.choice(topics)
            return JSONResponse(randomTopic)
    except Exception as e:
        return {"error": str(e)}
    finally:
        if conn:
            cursor.close()
            conn.close()
    
# TODO: add error handling for the database connection
# TODO: 503 for database connection errors
# TODO: 404 for empty result set
# TODO: make sure the query is safe - sql injection
# TODO: add logging
# TODO: Display user-friendly error messages