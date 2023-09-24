import React, { useEffect, useRef } from 'react';

export default function Messages({ messages, me }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function Message({ member, data, id }) {
   
    const username = member.username;  
    const color = member.color;  

    return (
      <div key={id}>
        <span style={{ backgroundColor: color }} />
        <div>
          <div>{username}</div>
          <div>{data}</div>
        </div>
      </div>
    );
  }

  return (
      <div>
        {messages.map((m) => (
          <Message
            key={m.id}
            member={m.member}
            data={m.data}
            id={m.id}
          />
        ))}
        <div ref={bottomRef}></div>
    </div>
  );
}

