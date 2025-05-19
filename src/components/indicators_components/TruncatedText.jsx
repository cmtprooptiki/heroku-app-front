import React, { useState } from "react";

const TruncatedText = ({ text, limit = 30 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isTruncated = text.length > limit;
  const displayText = expanded || !isTruncated ? text : text.slice(0, limit) + "...";

  return (
    <span>
      {displayText}{" "}
      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            padding: 0,
            fontSize: "0.9em",
          }}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </span>
  );
};

export default TruncatedText;
