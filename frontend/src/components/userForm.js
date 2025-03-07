import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onClose, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dob: '',
    password: '',
    gender: '',
    about: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      fetchUsers();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    container: {
      background: '#f4f4f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '40px auto',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    registerButton: {
      background: '#28a745',
      color: 'white',
    },
    cancelButton: {
      background: '#dc3545',
      color: 'white',
    },
    select: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      background: 'white',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      minHeight: '80px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#333' }}>Register User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={styles.input} />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required style={styles.input} />
        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
        <select name="gender" value={formData.gender} onChange={handleChange} required style={styles.select}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="about" placeholder="About" value={formData.about} onChange={handleChange} maxLength="5000" required style={styles.textarea} />
        <button type="submit" style={{ ...styles.button, ...styles.registerButton }}>Register</button>
        <button type="button" onClick={onClose} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;