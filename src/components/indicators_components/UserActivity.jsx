import React from "react";
import { useSocket } from "../SocketContext";

const UserActivity = () => {
  const { activityLog, cellInUse, liveChanges,activeCells } = useSocket();

  return (
    <div>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "16px",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          margin: "20px",
          width: "max-content"
        }}
      >
        <h4 style={{ marginBottom: "12px", fontWeight: "600" }}>Activity Log</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {activityLog.length === 0 && (
            <li style={{ color: "#666" }}>No activity yet.</li>
          )}
          {activityLog.map((act, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #eee",
                padding: "10px 12px",
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor: "#f9f9ff"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#e0e7ff",
                    color: "#3730a3",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold"
                  }}
                >
                  {act.user.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: "500", color: "#333" }}>{act.user}</span>
              </div>
              <div style={{ flex: 1, textAlign: "center", fontSize: "14px", color: "#444" }}>
  edited <span style={{ color: "#2563eb", fontWeight: "600" }}>"{act.field}"</span>{" "}
  for <span style={{ fontWeight: "600" }}>{act.indicatorId}</span> with value <span style={{ fontWeight: "600", color: "#059669" }}>{act.value}</span>
</div>
              <div style={{ fontSize: "12px", color: "#888", width: "90px", textAlign: "right" }}>
                {new Date(act.timestamp).toLocaleTimeString()}
              </div>
            </li>
          ))}
        </ul>
        {cellInUse && (
          <div style={{ marginTop: "12px", color: "red", fontWeight: "500" }}>
            {cellInUse}
          </div>
        )}
      </div>

      

      
    </div>
  );
};

export default UserActivity;
