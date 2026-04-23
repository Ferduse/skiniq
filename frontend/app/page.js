"use client"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [ingredients, setIngredients] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const result = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: ingredients })
    })
    const data = await result.json()
    setResponse(data.response)
    setLoading(false)
    
  }
return (
  <main style={{ 
    maxWidth: "680px", 
    margin: "0 auto", 
    padding: "60px 24px" 
  }}>
    
    {/* Header */}
    <div style={{ marginBottom: "40px" }}>
      <h1 style={{ 
        fontSize: "42px", 
        fontWeight: "700", 
        color: "#1a1714",
        letterSpacing: "-0.02em",
        marginBottom: "8px"
      }}>
        Skin<span style={{ color: "#c4726a" }}>IQ</span>
      </h1>
      <p style={{ color: "#8a7f75", fontSize: "15px" }}>
        Know what's in your products. Build a routine that works.
      </p>
    </div>

    {/* Suggestion */}
    <div style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      gap: "10px", 
      marginBottom: "16px" 
    }}>
      {[
        "What ingredients are good for dry skin?",
        "Is retinol safe for sensitive skin?",
        "What conflicts with vitamin C?",
        "Best ingredients for acne-prone skin"
      ].map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => setIngredients(suggestion)}
          style={{
            background: "#ffffff",
            border: "1px solid #d9cfc4",
            borderRadius: "20px",
            padding: "8px 16px",
            fontSize: "13px",
            color: "#8a7f75",
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          {suggestion}
        </button>
      ))}
    </div>

    {/* Input area */}
    <div style={{ marginBottom: "16px" }}>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Paste an ingredient list or ask about a specific ingredient..."
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #d9cfc4",
          background: "#ffffff",
          fontSize: "14px",
          color: "#1a1714",
          resize: "vertical",
          outline: "none",
          fontFamily: "inherit"
        }}
      />
    </div>

    {/* Button */}
    <button 
      onClick={handleSubmit}
      style={{
        background: "#c4726a",
        color: "white",
        border: "none",
        borderRadius: "10px",
        padding: "12px 28px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        marginBottom: "32px"
      }}
    >
      {loading ? "Analyzing..." : "Analyze"}
    </button>

    {/* Results */}
    <div style={{ marginTop: "8px" }}>
      {response && (
        <div style={{ 
          background: "#ffffff",
          borderRadius: "14px",
          border: "1px solid #d9cfc4",
          padding: "24px",
          lineHeight: "1.9",
          fontSize: "15px"
        }}>
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p style={{marginBottom: "14px"}} {...props} />,
              h3: ({node, ...props}) => <h3 style={{marginTop: "20px", marginBottom: "8px", fontWeight: "600"}} {...props} />,
              ul: ({node, ...props}) => <ul style={{paddingLeft: "20px", marginBottom: "12px"}} {...props} />,
              li: ({node, ...props}) => <li style={{marginBottom: "6px"}} {...props} />,
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>

  </main>
)
}