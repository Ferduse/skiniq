"use client"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [ingredients, setIngredients] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const result = await fetch("https://skiniq-production-e075.up.railway.app/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: ingredients })
    })
    const data = await result.json()
    setResponse(data.response)
    setLoading(false)
  }

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #e8f0e8 0%, #f5f0ea 50%, #f5e8df 100%)",
        padding: "80px 40px",
        textAlign: "center",
        borderBottom: "1px solid #d9cdb8"
      }}>
        <div style={{
          display: "inline-block",
          background: "#ffffff",
          border: "1px solid #d9cdb8",
          borderRadius: "20px",
          padding: "6px 16px",
          fontSize: "12px",
          color: "#6b8c6e",
          fontWeight: "500",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "24px"
        }}>
          AI-Powered Ingredient Analysis
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "56px",
          fontWeight: "700",
          color: "#2a1f14",
          letterSpacing: "-0.02em",
          lineHeight: "1.1",
          marginBottom: "16px"
        }}>
          Know what's in<br/>
          <em style={{ color: "#6b8c6e" }}>your products.</em>
        </h1>

        <p style={{
          color: "#7a6a55",
          fontSize: "17px",
          fontWeight: "300",
          maxWidth: "480px",
          margin: "0 auto 40px",
          lineHeight: "1.7"
        }}>
          Paste any ingredient list and get an instant breakdown — safety scores, functions, and conflict warnings.
        </p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center"
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
                border: "1px solid #d9cdb8",
                borderRadius: "20px",
                padding: "8px 18px",
                fontSize: "13px",
                color: "#7a6a55",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input section */}
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "48px 24px"
      }}>
        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #d9cdb8",
          padding: "24px",
          marginBottom: "16px",
          boxShadow: "0 2px 12px rgba(107,140,110,0.06)"
        }}>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Paste an ingredient list or ask about a specific ingredient..."
            style={{
              width: "100%",
              minHeight: "120px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: "#2a1f14",
              resize: "vertical",
              fontFamily: "inherit",
              background: "transparent",
              lineHeight: "1.6"
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? "#d9cdb8" : "#6b8c6e",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit"
              }}
            >
              {loading ? "Analyzing..." : "Analyze →"}
            </button>
          </div>
        </div>

        {response && (
          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #d9cdb8",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(107,140,110,0.06)"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #e8f0e8, #f5f0ea)",
              padding: "16px 24px",
              borderBottom: "1px solid #d9cdb8",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ fontSize: "16px" }}>✦</span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: "600",
                color: "#2a1f14"
              }}>
                Analysis Results
              </span>
            </div>
            <div style={{ padding: "24px", lineHeight: "1.9", fontSize: "15px", color: "#2a1f14" }}>
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <p style={{marginBottom: "14px"}} {...props} />,
                  h3: ({node, ...props}) => <h3 style={{
                    marginTop: "24px",
                    marginBottom: "10px",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "18px",
                    color: "#2a1f14"
                  }} {...props} />,
                  ul: ({node, ...props}) => <ul style={{paddingLeft: "20px", marginBottom: "12px"}} {...props} />,
                  li: ({node, ...props}) => <li style={{marginBottom: "8px", color: "#4a3728"}} {...props} />,
                  strong: ({node, ...props}) => <strong style={{color: "#6b8c6e"}} {...props} />,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}