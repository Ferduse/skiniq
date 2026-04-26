from openai import OpenAI
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv() # loads .env file to access key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) # connection to OpenAI, grabs API key


class RoutineRequest(BaseModel):
    skin_type: str
    concerns: str
    products: str
    
def build_routine(request: RoutineRequest, model="gpt-4o-mini"):
    messages=[
    {"role": "system", "content": "You are a skincare expert. You receive the user's skin type, concerns and products. With this information, return an AM and PM routine with conflict warnings. Also suggest additional products the user should consider adding to their routine based on their skin type and concerns."},          
    {"role": "user", "content": f"Skin type: {request.skin_type}. Concerns: {request.concerns}. Products I own: {request.products}"}    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    test = RoutineRequest(
        skin_type="oily",
        concerns="acne, dark spots",
        products="niacinamide serum, retinol, moisturizer"
    )
    print(build_routine(test))