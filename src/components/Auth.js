import React, { useState, useEffect } from 'react';
import { db, id } from '../services/dbService';

export default function Auth({ onLogin }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('chatUser');
    if (storedUser) {
      onLogin(JSON.parse(storedUser));  
    }
  }, [onLogin]);

  const handleLogin = () => {
    if (!username.trim()) return;  
  
    const userId = id();  
    console.log('Generated User ID:', userId); 
  
    const existingUser = db.tx.users[userId]?.get(); 
    console.log('Existing User:', existingUser);  
  
    let user;
  
    if (existingUser) {
      if (existingUser.name !== username) {
        user = { id: userId, name: username };
        console.log('Updating user with new username:', user); 
        db.transact(db.tx.users[userId].update(user));  
      } else {
        user = existingUser;  
        console.log('Username is the same, no update needed.');
      }
    } else {
      user = { id: userId, name: username };
      console.log('Creating new user:', user);  
      db.transact(db.tx.users[userId].add(user));
    }
  
    localStorage.setItem('chatUser', JSON.stringify(user));
  
    onLogin(user);
  };
  
  

  return (
    <div style={styles.container}>
      <h2>Welcome to Chat App</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Enter Chat</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
