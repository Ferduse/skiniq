from fastapi.testclient import TestClient
from main import app  

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_safety_guardrail_blocks_dangerous_combo():
    payload = {
        "skin_type": "combination",
        "concerns": "acne and aging",
        "products": "retinol, glycolic acid"
    }
    response = client.post("/routine", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert "conflict warnings" in data["response"].lower()
    assert "avoid" in data["response"].lower()