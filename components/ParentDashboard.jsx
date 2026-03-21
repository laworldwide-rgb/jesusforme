import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ParentDashboard() {
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [simplifying, setSimplifying] = useState(false);
  const [saved, setSaved] = useState([]);

  // LOAD SAVED QUESTIONS
  useEffect(() => {
    const stored = localStorage.getItem("savedQuestions");
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);

  // ASK
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

  // SAVE
  const handleSave = () => {
    if (!question || !answer) return;

    const newItem = {
      question,
      answer,
      id: Date.now()
    };

    const updated = [newItem, ...saved];

    setSaved(updated);
    localStorage.setItem("savedQuestions", JSON.stringify(updated));
  };

  // SIMPLIFY
  const handleSimplify = async () => {
    if (!answer) return;

    setSimplifying(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: `Simplify this explanation for a younger child (shorter, clearer, gentler):

${answer}`,
        }),
      });

      const data = await res.json();
      setAnswer(typeof data.answer === "string" ? data.answer : answer);
    } catch (err) {
      console.error("SIMPLIFY ERROR:", err);
    }

    setSimplifying(false);
  };

  // SPEAK
  const handleSpeak = () => {
    if (!answer) return;

    const { child } = parseAnswer(answer);
    if (!child) return;

    const utterance = new SpeechSynthesisUtterance(child);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // PARSER
  function parseAnswer(text) {
    if (!text || typeof text !== "string") {
      return { child: "", parent: "" };
    }

    const childMatch = text.match(/CHILD EXPLANATION:\s*([\s\S]*?)(PARENT NOTE:|$)/i);
    const parentMatch = text.match(/PARENT NOTE:\s*([\s\S]*)/i);

    const child = childMatch ? childMatch[1].trim() : "";
    const parent = parentMatch ? parentMatch[1].trim() : "";

    if (!child && !parent) {
      return { child: text, parent: "" };
    }

    return { child, parent };
  }

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

        <button
          onClick={() => router.back()}
          style={{
            marginBottom: "10px",
            background: "none",
            border: "none",
            color: "#4f46e5",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>

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

      {/* ANSWER SECTION */}
      {answer && (() => {
        const { child, parent } = parseAnswer(answer);

        return (
          <>
            {/* CHILD */}
            {child && (
              <div style={{
                background: "#eef2ff",
                borderRadius: "14px",
                padding: "14px",
                marginBottom: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ fontSize: "15px", marginBottom: "6px" }}>
                  👶 What to say to your child
                </h3>

                <div style={{ marginBottom: "10px" }}>
                  <button onClick={handleSimplify} style={{ marginRight: "8px" }}>
                    {simplifying ? "Simplifying..." : "Make it simpler"}
                  </button>

                  <button onClick={handleSpeak} style={{ marginRight: "8px" }}>
                    🔊 Read aloud
                  </button>

                  <button onClick={handleSave}>
                    💾 Save
                  </button>
                </div>

                <div style={{ fontSize: "15px", lineHeight: "1.5" }}>
                  {child}
                </div>
              </div>
            )}

            {/* PARENT */}
            {parent && (
              <div style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "14px",
                border: "1px solid #eee",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ fontSize: "14px", marginBottom: "6px" }}>
                  👨 For you
                </h3>

                <div style={{
                  fontSize: "13px",
                  lineHeight: "1.5",
                  color: "#555"
                }}>
                  {parent}
                </div>
              </div>
            )}
          </>
        );
      })()}

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

      {/* SAVED QUESTIONS */}
      {saved.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>
            Saved Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {saved.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                  background: "white",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setQuestion(item.question);
                  setAnswer(item.answer);
                }}
              >
                <div style={{ fontWeight: "600", fontSize: "14px" }}>
                  {item.question}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
