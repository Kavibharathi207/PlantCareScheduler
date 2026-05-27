import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import { syncUsers, addUserToBoth } from '../utils/syncUtils';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.fetchAllUsers();
      setUsers(response.data);
      
      // Sync with localStorage
      const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const combinedUsers = [...response.data, ...localUsers.filter(lu => 
        !response.data.some(bu => bu.username === lu.username)
      )];
      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to localStorage
      const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      setUsers(localUsers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const results = await addUserToBoth(newUser);
    
    if (results.backend && results.frontend) {
      setMessage('✅ User created successfully in both frontend and backend!');
    } else if (results.frontend) {
      setMessage('⚠️ User created in frontend. Backend sync failed.');
    } else {
      setMessage('❌ Failed to create user.');
    }
    
    setNewUser({ username: '', email: '', password: '', role: 'USER' });
    loadUsers();
    setLoading(false);
  };
  
  const handleSync = async () => {
    setLoading(true);
    const result = await syncUsers();
    setMessage(result.success ? '✅ ' + result.message : '❌ ' + result.message);
    loadUsers();
    setLoading(false);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    userList: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px'
    },
    userItem: {
      padding: '10px',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    message: {
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Management</h2>
      
      {message && <div style={styles.message}>{message}</div>}
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3>Add New User</h3>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({...newUser, username: e.target.value})}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          required
        />
        <select
          style={styles.input}
          value={newUser.role}
          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="GUEST">Guest</option>
        </select>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </button>
        <button 
          style={{...styles.button, backgroundColor: '#2196F3', marginTop: '10px'}} 
          type="button" 
          onClick={handleSync}
          disabled={loading}
        >
          {loading ? 'Syncing...' : 'Sync Frontend ↔️ Backend'}
        </button>
      </form>

      <div style={styles.userList}>
        <h3>All Users ({users.length})</h3>
        {users.map((user, index) => (
          <div key={user.id || index} style={styles.userItem}>
            <div>
              <strong>{user.username}</strong> - {user.email} ({user.role})
            </div>
            <div>
              {user.id ? 'Backend' : 'Frontend Only'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;