import React, { useEffect, useState, useRef } from 'react';
import Input from './Input';
import { getClientData } from './ClientData';

function ChatRoom({ roomName, onSendMessage }) {
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [text, setText] = useState('');
  const [members, setMembers] = useState({});
  const [scaleDroneStatus, setScaleDroneStatus] = useState('Connecting...');
  const clientData = useRef(getClientData());
  const bottomSentRef = useRef(null);
  const bottomReceivedRef = useRef(null);

  const handleSendMessage = (messageText) => {
    if (messageText.trim() === '') return;

    console.log('Message:', messageText);

    const newMessage = {
      content: messageText,
      clientData: { name: clientData.current.name, color: clientData.current.color },
    };

    setSentMessages((prevMessages) => [...prevMessages, newMessage]);
    setText('');

    onSendMessage(messageText, clientData.current.name);
  };

  useEffect(() => {
    const drone = new window.Scaledrone('oF7N20yHG9tPm0b8', {
      data: { name: clientData.current.name, color: clientData.current.color },
    });

    drone.on('open', function () {
      console.log('Connected to drone.');
      setScaleDroneStatus('Connected');
    });

    drone.on('error', function (error) {
      alert('Error connecting to drone: ' + error.message);
      console.error('Error connecting to drone:', error);
      setScaleDroneStatus('Error');
    });

    drone.on('reconnect', () => {
      setScaleDroneStatus('Reconnecting');
    });

    const room = drone.subscribe(roomName);

    room.on('open', (error) => {
      if (error) {
        console.error(error);
        setScaleDroneStatus(`Error: Could not connect to room 🔴`);
      }
    });

    room.on('message', (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
      console.log('received-message:', message);
    });

  }, [roomName]);

  useEffect(() => {
    if (bottomSentRef.current) {
      bottomSentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sentMessages]);

  useEffect(() => {
    if (bottomReceivedRef.current) {
      bottomReceivedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [receivedMessages]);

  return (
    <div className="chat-room">
      <div className="messages">
        {sentMessages.map((message, index) => (
          <div key={index} className="message">
  {message.clientData && message.clientData.color && (
    <span style={{ color: message.clientData.color }}>
      {message.clientData.name}: {message.content}
    </span>
  )}
</div>
        ))}
        <div ref={bottomSentRef} />
      </div>

      <div className="received-messages">
        {receivedMessages.map((message, index) => (
          <div key={index} className="received-message">
            {message.clientData && message.clientData.color && (
              <span style={{ color: message.clientData.color }}>
                {message.clientData.name}:
              </span>
            )}
            <span>
              {message.data && message.data.content}
            </span>
          </div>
        ))}
      </div>

      <Input onSendMessage={handleSendMessage} />
      <div>Status: {scaleDroneStatus}</div>
    </div>
  );
}
export default ChatRoom;

