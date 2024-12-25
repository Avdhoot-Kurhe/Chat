import React, { useState } from 'react';
import { db, id } from '../services/dbService';

export default function MessageInput({ selectedUser, currentUser }) {
  const [message, setMessage] = useState('');

  console.log(selectedUser);
  const sendMessage = () => {
    if (!message.trim()) return;

    db.transact(
      db.tx.messages[id()].update({
        sender: currentUser.name,
        receiver: selectedUser.id,
        text: message,
        timestamp: Date.now(),
      })
    );

    setMessage('');
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={styles.input}
      />
      <button onClick={sendMessage} style={styles.sendButton}>Send</button>
    </div>
  );
}

const styles = {
  inputContainer: { display: 'flex', padding: '10px', borderTop: '1px solid gray' },
  input: { flex: 1, padding: '10px' },
  sendButton: { marginLeft: '10px' }
};
