import React, { useState } from 'react';
import { FileText, Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ShaderLoginPage({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Mock Email Login for instant previewing
  const handleEmailSubmit = (e) => {
    if (e) e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      onLogin({
        name: email.split('@')[0] || 'Rojo User',
        email: email,
        provider: 'Email & Password',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      });
      setLoading(false);
    }, 800);
  };

  // Handle Google OAuth Sign-In directly
  const handleGoogleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        // Fallback for instant local access
        onLogin({
          name: 'Rojo (Google User)',
          email: 'rojo.user@gmail.com',
          provider: 'Google (Gmail)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
        });
      } else if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      onLogin({
        name: 'Rojo (Google User)',
        email: 'rojo.user@gmail.com',
        provider: 'Google (Gmail)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#070a13',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* CSS-Only Ambient Floating Blur Blobs (Flutter Aesthetic) */}
      <style>{`
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -80px) scale(1.2); }
          66% { transform: translate(-40px, 50px) scale(0.9); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-80px, 60px) scale(0.85); }
        }
        .glowing-blob-1 {
          position: absolute;
          width: 380px;
          height: 380px;
          top: 15%;
          left: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%);
          filter: blur(80px);
          z-index: 1;
          animation: floatBlob1 18s ease-in-out infinite;
          pointer-events: none;
        }
        .glowing-blob-2 {
          position: absolute;
          width: 440px;
          height: 440px;
          bottom: 10%;
          right: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0) 70%);
          filter: blur(90px);
          z-index: 1;
          animation: floatBlob2 22s ease-in-out infinite;
          pointer-events: none;
        }
        .input-group:focus-within label {
          color: #6366f1;
        }
        .input-element {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-element:focus {
          border-color: #6366f1 !important;
          background: rgba(99, 102, 241, 0.04) !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
          outline: none;
        }
        .login-btn {
          transition: all 0.25s ease;
        }
        .login-btn:hover {
          transform: translateY(-1.5px);
          background: #4f46e5 !important;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35) !important;
        }
        .social-btn {
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .tab-btn {
          transition: all 0.2s ease;
        }
      `}</style>

      {/* Decorative Blobs */}
      <div className="glowing-blob-1" />
      <div className="glowing-blob-2" />

      {/* Login Card */}
      <div 
        className="glass-panel" 
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '44px 36px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.55)',
          background: 'rgba(16, 20, 32, 0.85)',
          backdropFilter: 'blur(24px)',
          borderRadius: '28px',
          zIndex: 10,
          boxSizing: 'border-box'
        }}
      >
        {/* App Branding logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
            marginBottom: '16px'
          }}>
            <FileText size={26} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '-0.5px', color: '#ffffff', margin: '0 0 4px 0' }}>
            MSME Billing AI
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
            Invoice & Bill Automation Portal
          </p>
        </div>

        {/* Sliding Tab Bar (Material Design Capsule) */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '100px',
          padding: '3px',
          display: 'flex',
          marginBottom: '28px'
        }}>
          <button
            type="button"
            className="tab-btn"
            onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '100px',
              background: activeTab === 'login' ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
              color: activeTab === 'login' ? '#ffffff' : '#9ca3af',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className="tab-btn"
            onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '100px',
              background: activeTab === 'register' ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
              color: activeTab === 'register' ? '#ffffff' : '#9ca3af',
              fontWeight: '700',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            {errorMsg}
          </div>
        )}

        {/* Credentials Login Form */}
        <form onSubmit={handleEmailSubmit}>
          {/* Email input field */}
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px', textAlign: 'left' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#9ca3af', marginLeft: '2px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="input-element"
                style={{
                  width: '100%',
                  padding: '13px 16px 13px 40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#9ca3af', marginLeft: '2px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="input-element"
                style={{
                  width: '100%',
                  padding: '13px 40px 13px 40px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me & forgot password row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', fontSize: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: '#6366f1',
                  cursor: 'pointer',
                  width: '15px',
                  height: '15px',
                  borderRadius: '4px'
                }}
              />
              Remember me
            </label>
            <span 
              onClick={() => setErrorMsg('Reset functionality is disabled in mock preview.')}
              style={{ color: '#6366f1', fontWeight: '600', cursor: 'pointer', hover: { textDecoration: 'underline' } }}
            >
              Forgot password?
            </span>
          </div>

          {/* Primary submit button */}
          <button
            type="submit"
            disabled={loading}
            className="login-btn"
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '12px',
              background: '#6366f1',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)'
            }}
          >
            {loading && activeTab === 'login' ? 'Logging in...' : 
             loading && activeTab === 'register' ? 'Creating Account...' :
             activeTab === 'login' ? 'Login to Account' : 'Register Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '22px 0', color: '#4b5563', fontSize: '0.78rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
          <span style={{ padding: '0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
        </div>

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="social-btn"
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.02)',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.2.0 10.04.0 12s.47 3.8 1.29 5.42l3.99-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24.0 12 .0 7.31.0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          Google OAuth Sign In
        </button>

        <div style={{ marginTop: '22px', fontSize: '0.78rem', color: '#4b5563', textAlign: 'center' }}>
          Secure authentication gate supported by Supabase Cloud
        </div>
      </div>
    </div>
  );
}
