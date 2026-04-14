from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import APIRouter
from rag import analyze_with_rag

app = FastAPI()
router = APIRouter()

@app.get("/health")
def health():
    return {"status": "ok", "project": "SkinIQ"}

@app.get("/version")
def version():
    return {"version": "0.1.0", "description": "SkinIQ API — AI skincare analyzer"}

# To receive Data
class AnalyzeRequest(BaseModel):
    prompt: str
    
@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    return {"response": analyze_with_rag(request.prompt)}