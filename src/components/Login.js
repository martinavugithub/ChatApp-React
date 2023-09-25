import React, { useState } from 'react';
import { getClientData } from './ClientData';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [showButton, setShowButton] = useState(true); // Postavite showButton na true pri inicijalizaciji
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, color } = getClientData();

    onLogin({ username, color });
    setShowButton(true);

    navigate('/chatroom');
  };

  return (
    <div id="login">
      <h2>Please feel free joining the funniest room ever</h2>
      <form id="login-form" onSubmit={handleLogin}>
        {showButton && <button type="submit">Enter Room</button>}
      </form>
    </div>
  );
};

export default Login;


