from openai import OpenAI
from dotenv import load_dotenv
import os
from sqlmodel import Session, select
from database import Ingredient, engine
import json

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) # connection to OpenAI, grabs API key

# Generate skincare ingredients as a JSON array. 
def generate_ingredients(model="gpt-4o-mini"):
    messages=[
        {"role": "system", "content": "You are a skincare expert."},
        {"role": "user", "content": "Generate 50 unique skincare ingredients. Include a variety of actives, emollients, preservatives, and botanical extracts. Return as a JSON array with these exact fields: name, inci_name, function, safety_score (number 1-10), skin_types, conflicts, notes. Return ONLY the JSON array, no other text."}
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages
    )
    return response.choices[0].message.content

# Save generated skincare ingredients to Supabase
def save_ingredients(ingredients):
    with Session(engine) as session:
        for ingredient in ingredients:
            
            # check if exists
            existing = session.exec(
                select(Ingredient).where(Ingredient.name == ingredient["name"])).first()
            
            if existing:
                print(f"Skip {ingredient['name']}: it exists")
                continue
            else:
                new_ingredient = Ingredient(
                    name=ingredient["name"],
                    inci_name=ingredient["inci_name"],
                    function=ingredient["function"],
                    safety_score=ingredient["safety_score"],
                    skin_types=ingredient["skin_types"],
                    conflicts=ingredient["conflicts"],
                    notes=ingredient["notes"],
                )
                session.add(new_ingredient)
        session.commit()  

if __name__ == "__main__":
    # 1. generate data
    result = generate_ingredients()
    
    # 2. data cleaning
    clean = result.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    ingredients = json.loads(clean)
    print(f"Generated {len(ingredients)} ingredients")
    
    # 3. save to Supabase
    save_ingredients(ingredients)
    print("Saved.")
   
