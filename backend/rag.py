import chromadb
from openai import OpenAI
import os
from dotenv import load_dotenv

from sqlmodel import Session, select
from database import Ingredient, engine

load_dotenv()
chroma_client = chromadb.Client()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) # connection to OpenAI, grabs API key

collection = chroma_client.get_or_create_collection(name="ingredients") # will be run many times, so its better to use get_or_create_collection instead of just create_collection as mentioned in the ChromaDB docs

# Reading data from Supabase
def embed_ingredients():
    with Session(engine) as session:
        statement = select(Ingredient)
        ingredients = session.exec(statement).all()        
        
        # Create short description of each ingredient
        for ingredient in ingredients:
            text = f"{ingredient.name}: function is {ingredient.function}, safety score {ingredient.safety_score}, good for {ingredient.skin_types} skin types, conflicts with {ingredient.conflicts}. Notes: {ingredient.notes}"            
            print(text)
            
            # Embed text 
            embedding = client.embeddings.create(
                input=text,
                model="text-embedding-3-small"
            )
            vector = embedding.data[0].embedding
            
            # Store in ChormaDB
            collection.add(
                ids=[str(ingredient.id)],
                documents=[text],
                embeddings=[vector]
            )

# Query
def search_ingredients(query):
    # Embed query 
    embedding = client.embeddings.create(
        input=query,
        model="text-embedding-3-small"
    )
    vector = embedding.data[0].embedding
            
    # Search in ChormaDB
    results = collection.query(
        query_embeddings=[vector],
        n_results=2
    )
    return results 
    
# Connecting search results to OpenAI
def analyze_with_rag(query):
    results = search_ingredients(query)
    context = results["documents"][0]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": f"You are a skincare expert. Use this ingredient data to answer: {context}"},
            {"role": "user", "content": query}
        ]
    )
    return response.choices[0].message.content
    
    
if __name__ == "__main__":
    embed_ingredients()
    answer = analyze_with_rag("what is good for anti-aging?")
    print(answer)