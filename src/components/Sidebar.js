import React, { useEffect } from 'react';
import { db } from '../services/dbService';

export default function Sidebar({ onSelectUser, currentUser }) {
  const { data, isLoading, error } = db.useQuery({ users: {} });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const users = data?.users || [];


  return (
    <div style={styles.sidebar}>
      <h3>AK Chat APP</h3>
      {users.map(user => (
        <div
          key={user.id || user.name} 
          onClick={() => onSelectUser(user)}
          style={{
            ...styles.user,
            fontWeight: user.id === currentUser?.id ? 'bold' : 'normal',
            backgroundColor: user.id === currentUser?.id ? '#f0f8ff' : 'transparent',
          }}
        >
          {user.name} {user.id === currentUser?.id && "(You)"}
        </div>
      ))}
    </div>
  );
}

const styles = {
  sidebar: { 
    width: '30%', 
    borderRight: '1px solid gray', 
    padding: '10px',
    overflowY: 'auto',
    maxHeight: '100vh'
  },
  user: { 
    cursor: 'pointer', 
    padding: '5px', 
    borderBottom: '1px solid lightgray' 
  }
};
