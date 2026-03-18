import { useState } from "react";

export default function ParentDashboard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    console.log("CLICKED");

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("DATA:", data);

      setAnswer(data.answer);
    } catch (err) {
      console.error("ERROR:", err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Parent Guide</h1>

      <p>Use this when your child asks a hard question.</p>

      <textarea
        placeholder="Type your child's question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAsk}>
        {loading ? "Thinking..." : "Get Help Answering"}
      </button>

      <br /><br />

      {answer && (
        <div>
          <h3>Suggested Answer:</h3>
          <p>{answer}</p>
        </div>
      )}

      <hr />

      <h2>Quick Actions</h2>

      <button>Read a Story</button>
      <button>Practice a Verse</button>
      <button>Say a Prayer</button>
    </div>
  );
}
