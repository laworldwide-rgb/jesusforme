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

  return (
  <div style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px"
  }}>
      <h1>Parent Guide</h1>

      <p>You don’t have to have all the answers. I’ll help you explain it simply.</p>

      <textarea
  style={{
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    marginBottom: "12px"
  }}
        placeholder="What did your child ask?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br /><br />

      <button
  onClick={handleAsk}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
        {loading ? "Thinking..." : "Help me explain this"}
      </button>

      <br /><br />

<div>
{answer && (
<div style={{
  marginTop: "20px",
  padding: "16px",
  borderRadius: "12px",
  background: "#f9fafb",
  border: "1px solid #eee"
}}>
    <h3 style={{ marginBottom: "8px" }}>What to say</h3>

    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
      {typeof answer === "string" ? answer : ""}
    </div>
  </div>
)}
  
</div>

      <hr />

      <h2>Quick Actions</h2>

      <button>Read a Story</button>
      <button>Practice a Verse</button>
      <button>Say a Prayer</button>
    </div>
  );
}
