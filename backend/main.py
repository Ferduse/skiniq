from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "project": "SkinIQ"}

@app.get("/version")
def version():
    return {"version": "0.1.0", "description": "SkinIQ API — AI skincare analyzer"}