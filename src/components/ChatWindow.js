import React from 'react';
import { db } from '../services/dbService';

export default function ChatWindow({ selectedUser, currentUser }) {
  const { data, isLoading, error } = db.useQuery({
    messages: {} 
  });

  if (isLoading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredMessages = data.messages.filter(msg =>
    (msg.sender === currentUser.name && msg.receiver === selectedUser.id) ||
    (msg.sender === selectedUser.name && msg.receiver === currentUser.id)
  );

  return (
    <div style={styles.chatWindow}>
      {filteredMessages.map(msg => (
        <div
          key={msg.id}
          style={{
            ...styles.message,
            alignSelf: msg.sender === currentUser.name ? 'flex-end' : 'flex-start'
          }}
        >
          <b>{msg.sender}:</b> {msg.text}
        </div>
      ))}
    </div>
  );
}

const styles = {
  chatWindow: { flex: 1, overflowY: 'auto', padding: '10px' },
  message: { margin: '5px 0', padding: '8px', borderRadius: '5px', background: '#f1f0f0' }
};
