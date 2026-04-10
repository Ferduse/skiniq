from sqlmodel import Session
from database import Ingredient, engine

# Creating data
def create_ingredients():
    ingredient_1 = Ingredient(
        name="Niacinamide", 
        inci_name="Niacinamide",
        function="brightening",
        safety_score=9,
        skin_types="all",
        conflicts="none",
        notes="great for beginners"
    )
    
    ingredient_2 = Ingredient(
        name="Retinol", 
        inci_name="Retinol",
        function="anti-aging",
        safety_score=6,
        skin_types="normal, oily",
        conflicts="AHA, BHA",
        notes="start slow"
    )
    
    ingredient_3 = Ingredient(
        name="Hyaluronic Acid", 
        inci_name="Sodium Hyaluronate",
        function="hydration, plumping",
        safety_score=10,
        skin_types="all",
        conflicts="none",
        notes="can be used with almost everything, apply on damp skin"
    )
    
    with Session(engine) as session:
        session.add(ingredient_1)
        session.add(ingredient_2)
        session.add(ingredient_3)
        
        session.commit()
        print("Done!")
    
if __name__ == "__main__":
    create_ingredients()