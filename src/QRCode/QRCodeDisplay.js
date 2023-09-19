import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function QRCodeDisplay() {
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
        // Fetch the room code immediately when the component is mounted
        fetchRoomCode();

        // Set an interval to fetch the room code every 10 minutes
        const interval = setInterval(fetchRoomCode, 30 * 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    const fetchRoomCode = async () => {
        try {
            const response = await axios.get('/api/roomCode');
            setRoomCode(response.data.roomCode);
        } catch (error) {
            console.error('Error fetching room code:', error);
        }
    };

    return (
        <div>
            {roomCode ? (
                <>
                    <h2>Your Room Code:</h2>
                    <p>{roomCode}</p>
                    <h3>Scan the QR Code:</h3>
                    <QRCode value={roomCode} />
                </>
            ) : (
                <p>Loading room code...</p>
            )}
        </div>
    );
}

export default QRCodeDisplay;
