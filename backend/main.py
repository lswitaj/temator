from fastapi import FastAPI
from fastapi.responses import JSONResponse
import os
import random
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "ok"}

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