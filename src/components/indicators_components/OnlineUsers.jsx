import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
const OnlineUsers = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Attach to window for debugging
    window.socket = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket:', socket.id);
    });

    socket.on('online-users', (num) => {
      console.log('Received online count:', num);
      setCount(num);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
      window.socket = null;
    };
  }, []);

  return (
    <div className="online items-center space-x-2 bg-white px-3 py-1 rounded-full shadow text-sm text-gray-700">
    <FontAwesomeIcon icon={faCircle} className="text-green-500" style={{ fontSize: '0.75rem' }} />
    <span className="font-medium" style={{ fontFamily: "Poppins", color: "black" }}>
      Online Users: {count}
    </span>
  </div>
  );
};

export default OnlineUsers;
