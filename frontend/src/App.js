import React, { useState } from 'react';
import UserForm from './components/userForm';
import UserTable from './components/userTable';
import './index.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>
        User Registration System
      </h1>
      <button
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        onClick={() => setShowForm(true)}
      >
        Register
      </button>
      {showForm && (
        <UserForm
          onClose={() => setShowForm(false)}
          fetchUsers={() => window.location.reload()}
        />
      )}
      <UserTable />
    </div>
  );
};

export default App;