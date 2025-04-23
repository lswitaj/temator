from logging import log
from fastapi import FastAPI
import os
import random
import json

app = FastAPI()

@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/topics")
async def gettopic():
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'topics.json')
        with open(file_path, 'r') as file:
            topics = json.load(file)
            randomTopic = random.choice(topics)["name"]
            return {"message": randomTopic}
    except Exception as e:
        return {"error": str(e)}