import React, { useState } from 'react';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import Header from './components/Header';
import Footer from './components/Footer';

const CHANNEL_ID = 'oF7N20yHG9tPm0b8';
const ROOM_NAME = 'observable-algebra';
const Scaledrone = window.Scaledrone;

function App() {
  const [clientName, setClientName] = useState(null);
  const [clientColor, setClientColor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [drone, setDrone] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]); // Dodajte ovu liniju
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Dodajte ovu liniju

  const handleLogin = (data) => {
    setClientName(data.username);
    setClientColor(data.color);
    setIsUserLoggedIn(true);

    const droneInstance = new Scaledrone(CHANNEL_ID, {
      data: { name: data.username, color: data.color },
    });

    droneInstance.on('message', (message) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        {
          content: message.data.content,
          clientData: { name: message.client.name, color: message.client.color },
        },
      ]);
    });

    setDrone(droneInstance);
  };

  const addMessage = (messageText, member) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: messageText,
        clientData: { name: member, color: clientColor },
      },
    ]);
  };

  return (
    <div className="App">
      <Header />
      {isUserLoggedIn ? (
        <ChatRoom
          clientName={clientName}
          clientColor={clientColor}
          roomName={ROOM_NAME}
          messages={messages}
          receivedMessages={receivedMessages}
          members={members}
          onSendMessage={(messageText) => {
            drone.publish({
              room: ROOM_NAME,
              message: { content: messageText, member: clientName },
            });

            addMessage(messageText, clientName);
          }}
          drone={drone}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Footer />
    </div>
  );
}

export default App;
