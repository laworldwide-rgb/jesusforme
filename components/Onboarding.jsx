import { useState } from "react";

export default function Onboarding({ onSelect }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #eef2ff, #ffffff)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      textAlign: "center",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>

      {/* SALLY */}
      <img
        src="/images/sally.png"
        alt="Sally Sunday"
        style={{
          width: "120px",
          marginBottom: "20px"
        }}
      />

      {/* TITLE */}
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Hi, I’m Sally Sunday 👋
      </h1>

      {/* DESCRIPTION */}
      <p style={{
        fontSize: "15px",
        color: "#555",
        maxWidth: "300px",
        marginBottom: "30px"
      }}>
        I help you explain Jesus in simple, gentle ways your child can understand.
      </p>

      {/* BUTTONS */}
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <button
          onClick={() => onSelect("parent")}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "12px"
          }}
        >
          I’m the Parent
        </button>

        <button
          onClick={() => onSelect("child")}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            background: "white",
            fontSize: "16px"
          }}
        >
          I’m with my Child
        </button>
      </div>

    </div>
  );
}
