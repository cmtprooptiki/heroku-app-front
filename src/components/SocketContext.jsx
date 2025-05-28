import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from "../socket";
 
const SocketContext = createContext();
 
export function SocketProvider({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [isConnected, setIsConnected] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0); // ✅ NEW

  const [activityLog, setActivityLog] = useState([]);
  const [cellInUse, setCellInUse] = useState("");
  const [liveChanges, setLiveChanges] = useState([]);

  const [activeCells,setActiveCells]=useState([])

 
  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect();
    }
 
    if (!user && socket.connected) {
      socket.disconnect();
    }
 
    const onConnect = () => {
      setIsConnected(true);
      socket.emit("request-online-users"); // ✅ NEW — emit after connect
      console.log("Socket connected, requesting user count");
 
    };
 
    const onDisconnect = () => setIsConnected(false);
    const onFoo = (data) => setFooEvents(prev => [...prev, data]);
    const onOnlineCount = (num) => {
      setOnlineCount(num)
      console.log("listening count")
      console.log("count num",num);
    }; // ✅ NEW — listener
 
    socket.on("foo", onFoo);
    socket.on("response-online-users", onOnlineCount);    // ✅ NEW — listen globally
    // socket.on("connect", onConnect);

    console.log("⏱️ Starting socket setup");

    const start = Date.now();

    socket.on("connect", () => {
      console.log("✅ Socket connected", socket.id);
      console.log("⏱️ Connection time:", Date.now() - start, "ms");
    });

    socket.on("disconnect", onDisconnect);
    
 
     // fallback in case connection already happened before mount
    if (socket.connected) {
      socket.emit("request-online-users");
    } else {
      socket.once("connect", () => {
        socket.emit("request-online-users");
      });
    }

    ///////////////////////////////ACTIVITY-LOGS CELL-IN-USE LIVE-CHANGES
    socket.emit("request-logs");
    socket.emit("request-notification");

    socket.on("activity-log", (logLines) => {
      // const parsed = logLines
      //   .map((line) => {
      //     const match = line.match(
      //       /^\[(.*?)\]\s+(\w+)\s+edited\s+field:"(.*?)"\s+for\s+Indicator:\s+indicator\s+(.*?)\s+value:"(.*?)"$/
      //     );
      //     if (!match) return null;
      //     const [, timestamp, user, field, indicatorId, value] = match;
      //     return { timestamp, user, field, indicatorId, value };
      //   })
      //   .filter(Boolean);
      // setActivityLog(parsed.slice(0, 20));
      setActivityLog(logLines.slice(0, 20));

    });
////////////////
    socket.on("notify-all-cell-in-use", (cellInfo) => {
      setCellInUse(`Cell ${cellInfo.field} for ${cellInfo.indicatorId} is currently in use.`);
    });

    socket.on("cell-complete-broadcast", (change) => {
      setLiveChanges((prev) => [...prev, change]);
    });



    ///////////////////////////////




    socket.emit("request_active_cell_logs");

    const deleteActiveCell = (field, indicatorId) => {
      const key = `${field}|${indicatorId}`;
    
      // Locally remove from UI immediately
      setActiveCells(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    
      // Notify server to remove it for everyone
      socket.emit("delete-active-cell", { field, indicatorId });
    };

    socket.on("delete-active-cell", deleteActiveCell)

    socket.on("active_cells_log",(active_cells) => {
      setActiveCells(active_cells);
      console.log("active cells log",active_cells)
    });

    ////////////////////////////////
 
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFoo);
      socket.off("response-online-users", onOnlineCount);
      // socket.off("activity-log");

      socket.off("notify-all-cell-in-use");
      socket.off("cell-complete-broadcast");
      socket.off("active_cells_log");
    };
  }, [user]);
 
  useEffect(() => {
    console.log("User is", user);
    console.log("Socket connected?", socket.connected);
  }, [user]);
 
  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      fooEvents,
      onlineCount,
      activityLog,
      cellInUse,
      liveChanges,
      activeCells,
      setActiveCells
    }}>
      {children}
    </SocketContext.Provider>
    
  );
}
 
export function useSocket() {
  return useContext(SocketContext);
}