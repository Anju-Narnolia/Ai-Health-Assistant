import { useState } from "react";
import { getHealthResponse } from "../services/openaiService";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    if (!query.trim()) return;
    setResponse("Thinking...");
    const answer = await getHealthResponse(query);
    setResponse(answer);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center", padding: "20px" }}>
      <h1>AI Health Assistant 🤖</h1>
      <input
        type="text"
        placeholder="Ask about symptoms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "80%", padding: "10px", margin: "10px 0" }}
      />
      <br />
      <button onClick={askAI} style={{ padding: "10px 20px", cursor: "pointer" }}>Ask</button>
      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{response}</p>
    </div>
  );
}
