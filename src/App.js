import React, { useState } from 'react';
import Auth from './components/Auth.js';
import Sidebar from './components/Sidebar.js';
import ChatWindow from './components/ChatWindow.js';
import MessageInput from './components/MessageInput.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  if (!currentUser) {
    return <Auth onLogin={setCurrentUser} />;
  }

  return (
    <div style={styles.container}>
      <Sidebar onSelectUser={setSelectedUser} currentUser={currentUser} />
      {selectedUser ? (
        <div style={styles.chatSection}>
          <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
          <MessageInput selectedUser={selectedUser} currentUser={currentUser} />
        </div>
      ) : (
        <div>Select a user to start chatting</div>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh' },
  chatSection: { flex: 1, display: 'flex', flexDirection: 'column' }
};
