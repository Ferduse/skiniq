import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SkinIQ",
  description: "Know what's in your products. Build a routine that works.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* Nav */}
        <nav style={{
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #d9cdb8",
          background: "#f5f0ea"
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: "700",
              color: "#2a1f14"
            }}>
              Skin<span style={{ color: "#6b8c6e", fontStyle: "italic" }}>IQ</span>
            </span>
          </Link>

          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <Link href="/" style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#7a6a55",
              fontWeight: "500",
              letterSpacing: "0.02em"
            }}>
              Analyzer
            </Link>
            <Link href="/routine" style={{
              textDecoration: "none",
              background: "#6b8c6e",
              color: "white",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "500"
            }}>
              Build Routine
            </Link>
          </div>
        </nav>

        {/* Page content */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          background: "#2a1f14",
          color: "#f5f0ea",
          padding: "48px 40px 32px"
        }}>
          <div style={{
            maxWidth: "720px",
            margin: "0 auto"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "32px"
            }}>

              {/* About */}
              <div style={{ maxWidth: "300px" }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#f5f0ea"
                }}>
                  Skin<span style={{ color: "#6b8c6e", fontStyle: "italic" }}>IQ</span>
                </span>
                <p style={{
                  fontSize: "14px",
                  color: "#9c8a78",
                  lineHeight: "1.7",
                  marginTop: "12px",
                  fontWeight: "300"
                }}>
                  An AI-powered skincare app that analyzes ingredients and builds personalized routines, so you know exactly what's going on your skin.
                </p>
              </div>

              {/* Links */}
              <div>
                <p style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6b8c6e",
                  marginBottom: "16px"
                }}>
                  Features
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link href="/" style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "#9c8a78",
                    fontWeight: "300"
                  }}>
                    Ingredient Analyzer
                  </Link>
                  <Link href="/routine" style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "#9c8a78",
                    fontWeight: "300"
                  }}>
                    Routine Builder
                  </Link>
                  
                <a href="https://github.com/Ferduse/skiniq"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "#9c8a78",
                    fontWeight: "300"
                  }}
                >
                  GitHub
                </a>
                </div>
              </div>

            </div>

            {/* Bottom row */}
            <div style={{
              borderTop: "1px solid #3d2e22",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px"
            }}>
              <p style={{ fontSize: "13px", color: "#9c8a78", fontWeight: "300" }}>
                © 2026 SkinIQ. Built by Ferduse Rahman.
              </p>
              <p style={{ fontSize: "13px", color: "#9c8a78", fontWeight: "300" }}>
                Powered by OpenAI + RAG
              </p>
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}