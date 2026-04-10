from sqlmodel import SQLModel, Field, create_engine, Session
from typing import Optional
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()

# Get the database URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

# Ingredient table
class Ingredient(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    inci_name: str
    function: str
    safety_score: int
    skin_types: str
    conflicts: str
    notes: str

# Creates the table in Supabase 
def create_db():
    SQLModel.metadata.create_all(engine)
    
if __name__ == "__main__":
    create_db()
    print("Table created!")