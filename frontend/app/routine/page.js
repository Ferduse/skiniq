"use client"
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

export default function Routine() {
  const [skinType, setSkinType] = useState("")
  const [concern, setConcern] = useState("")
  const [products, setProducts] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const result = await fetch("https://skiniq-production-e075.up.railway.app/routine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skin_type: skinType, concerns: concern, products: products })
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
          AI-Powered Routine Builder
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
          Build your perfect<br/>
          <em style={{ color: "#6b8c6e" }}>skincare routine.</em>
        </h1>

        <p style={{
          color: "#7a6a55",
          fontSize: "17px",
          fontWeight: "300",
          maxWidth: "480px",
          margin: "0 auto",
          lineHeight: "1.7"
        }}>
          Tell us your skin type, concerns, and products — we'll build a personalized AM/PM routine with conflict warnings.
        </p>
      </div>

      {/* Form section */}
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "48px 24px"
      }}>

        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #d9cdb8",
          padding: "32px",
          marginBottom: "16px",
          boxShadow: "0 2px 12px rgba(107,140,110,0.06)"
        }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>

            <div>
              <label style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "500",
                color: "#7a6a55",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px"
              }}>
                Skin Type
              </label>
              <input
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                placeholder="oily, dry, combination, sensitive..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #d9cdb8",
                  background: "#f5f0ea",
                  fontSize: "14px",
                  color: "#2a1f14",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "500",
                color: "#7a6a55",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px"
              }}>
                Skin Concerns
              </label>
              <input
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                placeholder="acne, aging, dark spots, dryness..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #d9cdb8",
                  background: "#f5f0ea",
                  fontSize: "14px",
                  color: "#2a1f14",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "500",
                color: "#7a6a55",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "8px"
              }}>
                Products You Own
              </label>
              <textarea
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                placeholder="niacinamide serum, retinol, vitamin C, moisturizer..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #d9cdb8",
                  background: "#f5f0ea",
                  fontSize: "14px",
                  color: "#2a1f14",
                  minHeight: "100px",
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>

          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              {loading ? "Building routine..." : "Build My Routine →"}
            </button>
          </div>
        </div>

        {/* Results */}
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
                Your Personalized Routine
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