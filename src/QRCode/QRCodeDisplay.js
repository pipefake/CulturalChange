import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

function QRCodeDisplay() {
  const [roomCode, setRoomCode] = useState("");
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch the room code immediately when the component is mounted
    fetchRoomCode();

    // Set an interval to fetch the room code every 10 minutes
    const interval = setInterval(fetchRoomCode, 30 * 1000);

    // Fetch the user count immediately when the component is mounted or the room code changes
    fetchUserCount();

    // Set an interval to fetch the user count every 30 seconds or another suitable interval
    const userCountInterval = setInterval(fetchUserCount, 30 * 1000);

    // Clear the interval when the component is unmounted
    return () => {
        clearInterval(interval);
        clearInterval(userCountInterval);
    }
    
  }, [roomCode]);

  const fetchRoomCode = async () => {
    try {
      const response = await axios.get("/api/roomCode");
      setRoomCode(response.data.roomCode);
    } catch (error) {
      console.error("Error fetching room code:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      if (roomCode) {
        const response = await axios.get(`/api/roomUsers/${roomCode}`);
        setUserCount(response.data.userCount);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  return (
    <div>
      {roomCode ? (
        <div>
          <h2>Your Room Code:</h2>
          <p>{roomCode}</p>
          <h3>Scan the QR Code:</h3>
          <QRCode value={roomCode} />
        </div>
      ) : (
        <p>Loading room code...</p>
      )}
    </div>
  );
}

export default QRCodeDisplay;
