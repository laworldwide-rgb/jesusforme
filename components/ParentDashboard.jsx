import { useState } from "react";

export default function ParentDashboard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
   
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      

      const data = await res.json();
      

      setAnswer(typeof data.answer === "string" ? data.answer : "No valid response");
    } catch (err) {
      console.error("ERROR:", err);
    }

    setLoading(false);
  };
const actionBtn = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #eee",
  background: "white",
  fontSize: "14px",
  textAlign: "left",
};
  return (
  <div style={{
    maxWidth: "420px",
    margin: "0 auto",
    padding: "16px",
    fontFamily: "system-ui, -apple-system, sans-serif"
  }}>

    {/* HEADER */}
    <div style={{ marginBottom: "20px" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "6px" }}>
        Parent Guide
      </h1>
      <p style={{ color: "#666", fontSize: "14px" }}>
        You don’t have to have all the answers. I’ll help you explain it simply.
      </p>
    </div>

    {/* INPUT CARD */}
    <div style={{
      background: "white",
      borderRadius: "14px",
      padding: "14px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      marginBottom: "16px"
    }}>
      <textarea
        style={{
          width: "100%",
          minHeight: "90px",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          fontSize: "15px",
          marginBottom: "12px"
        }}
        placeholder="What did your child ask?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAsk}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          fontSize: "15px",
          fontWeight: "600"
        }}
      >
        {loading ? "Thinking..." : "Help me explain this"}
      </button>
    </div>

    {/* ANSWER CARD */}
    {answer && (
      <div style={{
        background: "white",
        borderRadius: "14px",
        padding: "14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "16px"
      }}>
        <h3 style={{
          fontSize: "16px",
          marginBottom: "8px"
        }}>
          What to say
        </h3>

        <div style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.5",
          fontSize: "14px"
        }}>
          {typeof answer === "string" ? answer : ""}
        </div>
      </div>
    )}

    {/* QUICK ACTIONS */}
    <div>
      <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>
        Quick Actions
      </h2>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <button style={actionBtn}>📖 Read a Story</button>
        <button style={actionBtn}>🧠 Practice a Verse</button>
        <button style={actionBtn}>🙏 Say a Prayer</button>
      </div>
    </div>

  </div>
);
