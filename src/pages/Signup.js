import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data); // Save token + user data
      navigate('/profile');
    } catch (err) {
      console.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
