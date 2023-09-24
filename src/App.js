import React, { useState, useRef } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';
import Header from './components/Header';
import Footer from './components/Footer';

function randomName() {
  const pokemonNames = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Jigglypuff', 'Meowth',
    'Psyduck', 'Snorlax', 'Dragonite', 'Mewtwo', 'Chikorita', 'Cyndaquil',
    'Totodile', 'Togepi', 'Mareep', 'Typhlosion', 'Feraligatr', 'Unown',
    'Wobbuffet', 'Girafarig', 'Shuckle', 'Swinub', 'Lugia', 'Ho-Oh',
    'Treecko', 'Torchic', 'Mudkip', 'Beautifly', 'Mightyena', 'Wurmple',
    'Gardevoir', 'Exploud', 'Kyogre', 'Groudon', 'Rayquaza', 'Turtwig',
    'Chimchar', 'Piplup', 'Luxray', 'Lucario'
  ];
  return pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const messagesRef = useRef(messages);

  const onSendMessage = (message) => {
    const newMessage = {
      data: message,
      member: me,
    };
    setMessages([...messagesRef.current, newMessage]);
  };

  return (
    <div className="App">
      <Header />
      <Messages messages={messages} me={me} />
      <Input onSendMessage={onSendMessage} />
      <Footer />
    </div>
  );
}