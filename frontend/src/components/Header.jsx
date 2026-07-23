import React from 'react';
import { Plus, CheckCircle2, LogIn, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenAuth,
  user
}) {
  return (
    <header style={{
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px'
    }}>
      {/* Active Title & Tab Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: '800' }}>
          {activeTab === 'hero' ? 'Animated Shader Hero' :
           activeTab === 'dashboard' ? 'Dashboard & Recent Bills' :
           activeTab === 'invoices' ? 'All Invoices' :
           activeTab === 'upload' ? 'Extract New Bill' :
           'Business Expense Analytics'}
        </h2>

        <span style={{
          background: 'rgba(16, 185, 129, 0.12)',
          color: 'var(--emerald)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '3px 10px',
          borderRadius: '20px',
          fontSize: '0.72rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <CheckCircle2 size={13} /> MSME Billing System
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {activeTab !== 'hero' && (
          <button
            onClick={() => setActiveTab('hero')}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={15} color="var(--amber)" /> Hero View
          </button>
        )}

        {activeTab === 'hero' && (
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <LayoutDashboard size={15} color="var(--primary)" /> Go to Dashboard
          </button>
        )}

        <button
          onClick={onOpenAuth}
          style={{
            background: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--primary)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '8px 14px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
          title="Google & Email Account Login"
        >
          <LogIn size={15} /> {user?.name ? user.name : 'Google Sign In'}
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#ffffff',
            padding: '9px 18px',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 14px rgba(99, 102, 241, 0.4)',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Extract New Bill
        </button>
      </div>
    </header>
  );
}
