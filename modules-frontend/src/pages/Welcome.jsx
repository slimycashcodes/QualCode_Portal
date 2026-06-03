import React from 'react';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85)), url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: '"IBM Plex Sans", sans-serif'
    }}>
      
      {/* Top Navigation Header Bar */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.5rem 4rem', zIndex: 10
      }}>
        <div style={{ fontWeight: 600, fontSize: '1.2rem', tracking: '-0.02em' }}>
          Self Talk <span style={{ fontWeight: 300, opacity: 0.8 }}>Psychologist</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ background: '#ffffff', color: '#161616', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>Home</span>
          {['About', 'Our Programs', 'Become a Volunteer', 'Contact'].map(item => (
            <span key={item} style={{ fontSize: '0.9rem', color: '#e0e0e0', cursor: 'pointer', fontWeight: 400 }}>{item}</span>
          ))}
          <Button 
            size="sm" 
            kind="primary" 
            onClick={() => navigate('/login')}
            style={{ borderRadius: '20px', padding: '0 1.5rem', background: '#0f62fe' }}
          >
            Portal Login
          </Button>
        </nav>
      </header>

      {/* Main Content Body Hero Wrapper */}
      <div style={{
        flexGrow: 1, display: 'grid', gridTemplateColumns: '1.2fr 1fr',
        alignItems: 'center', padding: '0 4rem', zIndex: 5
      }}>
        <div style={{ maxWidth: '650px' }}>
          <h1 style={{
            fontSize: '4rem', fontWeight: 400, lineHeight: '1.15',
            letterSpacing: '-0.03em', marginBottom: '2rem'
          }}>
            Stronger Minds,<br />Brighter Careers.
          </h1>
          
          <Button 
            renderIcon={() => <ArrowRight size={16} />} 
            onClick={() => navigate('/login')}
            style={{
              background: '#ffffff', color: '#161616', fontWeight: 500,
              borderRadius: '30px', padding: '0.8rem 2rem', height: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            Try the Zen Pilot Program
          </Button>
        </div>

        {/* Right Decorative Graphic Graphic Focal Point */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: '320px', height: '320px', borderRadius: '50%',
            overflow: 'hidden', border: '4px solid #ffffff',
            boxShadow: '0 12px 36px rgba(0,0,0,0.3)', zIndex: 2
          }}>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
              alt="Professional Counselor representation"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Wave Accent Ring Graphic Layer */}
          <div style={{
            position: 'absolute', width: '380px', height: '380px',
            border: '2px dashed #4589ff', borderRadius: '50%', opacity: 0.4,
            top: '-30px', animation: 'spin 120s linear infinite'
          }} />
        </div>
      </div>

      {/* Bottom Product Tab Footers (Glassmorphism layout matching design reference image_a3c2c2.png) */}
      <footer style={{
        padding: '0 4rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1.5rem', zIndex: 5
      }}>
        <div style={{
          background: '#ffffff', color: '#161616', padding: '1.5rem',
          borderRadius: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, tracking: '0.05em', textTransform: 'uppercase', color: '#0f62fe' }}>Program Hub</span>
          <h5 style={{ fontWeight: 600, marginTop: '0.25rem' }}>MIND MATTERS™</h5>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '1.5rem',
          borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase' }}>Enterprise Sync</span>
          <h5 style={{ fontWeight: 500, marginTop: '0.25rem' }}>WORKWELL™</h5>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', padding: '1.5rem',
          borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase' }}>Clinical Network</span>
          <h5 style={{ fontWeight: 500, marginTop: '0.25rem' }}>SELF TALK™</h5>
        </div>
      </footer>
    </div>
  );
}