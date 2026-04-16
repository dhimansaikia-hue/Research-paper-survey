import { useState } from 'react';
import logo from '../assets/logo.svg';

export default function LoginScreen({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="login-screen">
      <img src={logo} alt="Ananta Realty Partners" className="login-logo" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(email, password);
        }}
        className="form-card"
      >
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
        {error && <p className="error">{error}</p>}
        <button className="primary" type="submit">Sign In</button>
      </form>
    </main>
  );
}
