from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv() # loads .env file to access key

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) # connection to OpenAI, grabs API key

# API call 
# System prompts sets the rules, user message asks questions
def get_completion(prompt, model="gpt-4o-mini", temperature=0):
    messages=[
        {"role": "system", "content": "You are a skincare expert."},
        {"role": "user", "content": "What does niacinamide do?"}
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    print(get_completion("What does niacinamide do?"))