import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleUpdate = async (user) => {
    await axios.put(`http://localhost:5000/api/users/${user._id}`, user);
    setEditingUser(null);
    fetchUsers();
  };

  const styles = {
    container: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '40px auto',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      background: '#28a745',
      color: 'white',
      padding: '10px',
    },
    td: {
      border: '1px solid #ccc',
      padding: '10px',
    },
    button: {
      padding: '8px 12px',
      margin: '5px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    editButton: {
      background: '#007bff',
      color: 'white',
    },
    deleteButton: {
      background: '#dc3545',
      color: 'white',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#333' }}>All Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Date of Birth</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>About</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.age}</td>
              <td style={styles.td}>{new Date(user.dob).toLocaleDateString()}</td>
              <td style={styles.td}>{user.gender}</td>
              <td style={styles.td}>{user.about}</td>
              <td style={styles.td}>
                <button onClick={() => setEditingUser(user)} style={{ ...styles.button, ...styles.editButton }}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit User</h3>
          <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} style={styles.input} />
          <input type="number" value={editingUser.age} onChange={(e) => setEditingUser({ ...editingUser, age: e.target.value })} style={styles.input} />
          <input type="date" value={editingUser.dob} onChange={(e) => setEditingUser({ ...editingUser, dob: e.target.value })} style={styles.input} />
          <select value={editingUser.gender} onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value })} style={styles.input}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea value={editingUser.about} onChange={(e) => setEditingUser({ ...editingUser, about: e.target.value })} style={styles.input} />
          <button onClick={() => handleUpdate(editingUser)} style={{ ...styles.button, background: '#28a745', color: 'white' }}>Save</button>
          <button onClick={() => setEditingUser(null)} style={{ ...styles.button, background: '#6c757d', color: 'white' }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
