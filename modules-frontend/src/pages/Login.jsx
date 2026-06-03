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
      <div style={{ flexGrow: 1, background: '#161616', display: 'flex', alignItems: 'center', padding: '4rem' }}>
        <div style={{ maxWidth: '480px', color: '#fff' }}>
          <h2 style={{ fontWeight: 300, color: '#a8c0ff', marginBottom: '1rem' }}>Clinical Data Integrity Guardian</h2>
          <p style={{ color: '#c6c6c6', lineHeight: '1.6' }}>Role-based network access ensures secure provisioning, evaluation logging, and publication lifecycles of mental health toolkits.</p>
        </div>
      </div>
    </div>
  );
}