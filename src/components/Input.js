import React, { useState } from 'react';

function Input({ onSendMessage }) {
  const [text, setText] = useState('');

  function onChange(e) {
    const text = e.target.value;
    setText(text);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText('');
    onSendMessage(text);
  }

  return (
    <div className="form-row">
      <div className="col-4">
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            value={text}
            type="text"
            className="form-control"
            placeholder="Enter your message and press Send"
            autoFocus
          />
          <button className="btn btn-primary" type="submit">
          Send
        </button>
        </form>
      </div>
    </div>
  );
}

export default Input;



