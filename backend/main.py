from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.responses import JSONResponse
import os
import random
import json
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

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
        conn = psycopg2.connect("postgresql://postgres:postgres@db:5432/temator")
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")
        result = cursor.fetchone()  # Get the actual result
        cursor.close()
        conn.close()
        return {"status": "ok", "db_ready": True}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {str(e)}")
    finally:
        if conn:
            cursor.close()
            conn.close()

@app.get("/topic")
async def gettopic():
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'topics.json')
        with open(file_path, 'r') as file:
            topics = json.load(file)
            randomTopic = random.choice(topics)
            return JSONResponse(randomTopic)
    except Exception as e:
        return {"error": str(e)}

#TODO: add requirements.txt
#TODO: add dockerfile
#TODO: add deployment instructions
#TODO: add CI/CD pipeline
#TODO: add tests
#TODO: add documentation