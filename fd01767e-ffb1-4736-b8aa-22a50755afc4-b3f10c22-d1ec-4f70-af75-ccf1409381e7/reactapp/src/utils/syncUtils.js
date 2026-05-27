import * as api from '../services/api';

export const syncUsers = async () => {
  try {
    // Get users from backend
    const backendUsers = await api.fetchAllUsers();
    
    // Get users from localStorage
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Sync local users to backend
    for (const localUser of localUsers) {
      const existsInBackend = backendUsers.data.some(bu => bu.username === localUser.username);
      if (!existsInBackend) {
        try {
          await api.createUser(localUser);
          console.log(`Synced user ${localUser.username} to backend`);
        } catch (error) {
          console.error(`Failed to sync user ${localUser.username}:`, error);
        }
      }
    }
    
    // Update localStorage with backend users
    const allUsers = [...backendUsers.data, ...localUsers.filter(lu => 
      !backendUsers.data.some(bu => bu.username === lu.username)
    )];
    
    localStorage.setItem('registeredUsers', JSON.stringify(allUsers));
    
    return { success: true, message: 'Users synchronized successfully' };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, message: 'Sync failed: ' + error.message };
  }
};

export const addUserToBoth = async (userData) => {
  const results = { frontend: false, backend: false };
  
  try {
    // Add to backend
    await api.createUser(userData);
    results.backend = true;
  } catch (error) {
    console.error('Backend creation failed:', error);
  }
  
  try {
    // Add to localStorage
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userWithId = { ...userData, id: userData.id || Date.now() };
    localUsers.push(userWithId);
    localStorage.setItem('registeredUsers', JSON.stringify(localUsers));
    results.frontend = true;
  } catch (error) {
    console.error('Frontend creation failed:', error);
  }
  
  return results;
};