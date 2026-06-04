import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, InlineNotification, Stack } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function LoginView() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f4f4' }}>
      <div style={{ width: '400px', background: '#fff', padding: '3.5rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #e0e0e0' }}>
        <h3 style={{ fontWeight: 400, marginBottom: '0.5rem' }}>Log in</h3>
        <p style={{ color: '#525252', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Use internal network registration profiles.</p>
        
        {error && <InlineNotification kind="error" lowContrast title="Auth Failure" subtitle={error} style={{ marginBottom: '1.5rem' }} />}

        <form onSubmit={handleFormSubmit}>
          <Stack gap={6}>
            <TextInput 
              id="username" 
              labelText="User ID / Role Identifier" 
              placeholder="e.g., admin or user" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            
            {/* Swapped TextInput.PasswordInput for standalone PasswordInput component */}
            <PasswordInput 
              id="password" 
              labelText="Security Password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            
            <Button type="submit" renderIcon={() => <ArrowRight size={16} />} style={{ marginTop: '1.5rem', width: '100%' }}>
              Continue
            </Button>
          </Stack>
        </form>
        <div style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#8d8d8d' }}>
          <p>Demo Config Hints:</p>
          <p>• Admin Access: <strong>admin</strong> / <strong>admin123</strong></p>
          <p>• User Access: <strong>user</strong> / <strong>user123</strong></p>
        </div>
      </div>
      <div
  style={{
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '4rem',
    overflow: 'hidden',
    minHeight: '500px'
  }}
>
  {/* Background Image */}
  <img
    src="https://wallpaperaccess.com/full/4472324.jpg"
    alt=""
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity : 0.9, // adjust opacity here
      zIndex: 0
    }}
  />

  {/* Content */}
  <div
    style={{
      maxWidth: '480px',
      color: '#161616',
      position: 'relative',
      zIndex: 1
    }}
  >
    <h1
      style={{
        fontWeight: 400,
        color: '#ecececff',
        marginBottom: '1rem',
        fontFamily : 'fantasy'
      }}
    >
      Clinical Data Integrity Guardian
    </h1>

    <p
      style={{
        color: '#000000ff',
        fontWeight: 400
      }}
    >
      Role-based network access ensures secure provisioning,
      evaluation logging, and publication lifecycles of mental
      health toolkits.
    </p>
  </div>
</div>
    </div>
  );
}