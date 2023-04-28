import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './LoginForm.css';


function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g. send data to a server
    console.log(`Email: ${email}, Password: ${password}`);
  };
  return (
    <div className="App">
      <header className="App-header">
      <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      {/* <button onClick={() => <Link} type="submit">Login</button> */}
      <Link to="/car">Login</Link>
    </form>
      </header>
    </div>
  );
}

export default Login;
