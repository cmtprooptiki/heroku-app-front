import React from "react";
import { useSocket } from "../SocketContext";
import { Timeline } from "primereact/timeline";
import { Avatar } from "primereact/avatar";
import apiBaseUrl from "../../apiConfig";
import TruncatedText from "./TruncatedText";

const UserActivity = () => {
  const { activityLog, cellInUse, liveChanges, activeCells } = useSocket();

   const timelineData = activityLog.map((act) => {
    const profileImage = act.profileImage
      ? `${apiBaseUrl}/${act.profileImage}`
      : `${apiBaseUrl}\\uploads\\default.png`;
{console.log("profile",`${apiBaseUrl}/${act.profileImage}`)}
    return {
      date: new Date(act.timestamp).toLocaleString(),
      user:act.user,
      icon: "pi pi-pencil",
      color: "#4caf50",
      profileImage,
      content: (
        <div>
         
          {/* <p style={{ marginBottom: "4px", fontSize: "14px" }}>
            edited <span style={{ color: "#2563eb" }}>"{act.field}"</span> for <strong>{act.indicatorId}</strong>
          </p>
          <p style={{ fontSize: "13px", color: "#059669", wordBreak: "break-word" }}>
            New value: <strong>{act.value}</strong>
          </p> */}
          <p style={{ marginBottom: "4px", fontSize: "14px" }}>
            The field <span style={{ color: "#2563eb" }}>"{act.field}"</span> was updated for <strong>{act.indicatorId}</strong> with the value: <strong><TruncatedText text={act.value} />
</strong>
          </p>
        </div>
      ),
    };
  });

  return (
    <div>



    <div style={{ padding: "1rem", maxHeight: "400px", overflowY: "auto" }}>
      <h4 style={{ marginBottom: "1rem", fontWeight: "600" }}>Activity Log</h4>
      {timelineData.length > 0 ? (
        <Timeline
          
          value={timelineData}
          align="opposite"
          opposite={(item) => (<div style={{display:"flex" ,justifyContent:"flex-end",alignItems:"center", gap:"5px"}}>
            <Avatar
              image={item.profileImage}
              shape="circle"
              size="large"
              style={{ border: "2px solid #ccc" }}
            />
            <div>

             <p style={{ marginBottom: "4px", fontSize: "12px"}}>{item.date}</p>
             <strong><p style={{ marginBottom: "4px", fontSize: "14px"}}>{item.user}</p></strong>
            </div>
          </div>
          )}
          content={(item) => item.content}
          marker={(item) => (
            <i className={item.icon} style={{ color: item.color }} />
          )}
          style={{ fontSize: "14px" ,gap:"5px"}}
        />
      ) : (
        <p style={{ color: "#777" }}>No activity yet.</p>
      )}
    </div>










      {/* <div
        style={{
          // border: "1px solid #ddd",
          // borderRadius: "12px",
          padding: "16px",
          maxHeight: "300px",
          overflowY: "auto",
          // backgroundColor: "#fff",
          // boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          margin: "20px",
          // width: "-webkit-fill-",
        }}
      >
        <h4 style={{ marginBottom: "12px", fontWeight: "600" }}>
          Activity Log
        </h4>
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
                backgroundColor: "#f9f9ff",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
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
                    fontWeight: "bold",
                  }}
                >
                  {act.user.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: "500", color: "#333" }}>
                  {act.user}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#444",
                }}
              >
                edited{" "}
                <span style={{ color: "#2563eb", fontWeight: "600" }}>
                  "{act.field}"
                </span>{" "}
                for <span style={{ fontWeight: "600" }}>{act.indicatorId}</span>{" "}
                with value{" "}
                <span style={{ fontWeight: "600", color: "#059669" }}>
                  {act.value}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#888",
                  width: "90px",
                  textAlign: "right",
                }}
              >
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
      </div> */}
    </div>
  );
};

export default UserActivity;
