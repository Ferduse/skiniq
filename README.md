# SkinIQ

An AI-powered skincare app that analyzes ingredients and builds personalized routines.

## Live Demo

🌿 [skiniq-plum.vercel.app](https://skiniq-plum.vercel.app)

📹 [Watch the demo on Loom](https://www.loom.com/share/214914382a5a468d80e0ba8efea28657)

## What it does

SkinIQ helps anyone understand what's in their skincare products and whether those products are safe to use together. Paste in an ingredient list and get a full breakdown of what each ingredient does and how safe it is. Tell SkinIQ your skin type and the products you own and it will build you a safe AM/PM routine, flagging dangerous combinations like retinoids and AHAs.

## Features

- **Product Analyzer** — paste any ingredient list and get safety scores, functions, and conflict warnings powered by a RAG pipeline over 103 curated ingredients
- **Routine Builder** — input your skin type, concerns, and products to get a personalized AM/PM routine with conflict detection

## Tech Stack

- **Backend** — Python, FastAPI, OpenAI API (GPT-4o-mini), ChromaDB, SQLModel
- **Database** — PostgreSQL on Supabase (103 ingredients)
- **Frontend** — Next.js 14, Tailwind CSS
- **Deployment** — Docker, Railway (backend), Vercel (frontend)

## Architecture

    User → Next.js frontend (Vercel)
         → FastAPI backend (Railway/Docker)
         → ChromaDB RAG pipeline
         → OpenAI GPT-4o-mini
         → PostgreSQL on Supabase

## How to run locally

1. Clone the repo

       git clone https://github.com/Ferduse/skiniq.git
       cd skiniq

2. Set up the backend

       cd backend
       python3 -m venv venv
       source venv/bin/activate
       pip install -r requirements.txt

3. Add your environment variables — create a `.env` file in `/backend`

       DATABASE_URL=your_supabase_url
       OPENAI_API_KEY=your_openai_key

4. Run the backend

       uvicorn main:app --reload

5. Set up the frontend

       cd ../frontend
       npm install
       npm run dev

6. Open your browser
   - Backend API: http://localhost:8000/docs
   - Frontend: http://localhost:3000

