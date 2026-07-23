import React from 'react';
import { Plus, FileText, CheckCircle2 } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
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
      {/* Active Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: '800' }}>
          {activeTab === 'dashboard' ? 'Dashboard & Recent Bills' :
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

      {/* Action Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            boxShadow: '0 2px 14px rgba(99, 102, 241, 0.4)'
          }}
        >
          <Plus size={16} /> Extract New Bill
        </button>
      </div>
    </header>
  );
}
