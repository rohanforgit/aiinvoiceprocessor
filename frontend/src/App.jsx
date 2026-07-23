import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricsCards from './components/MetricsCards';
import InvoiceUpload from './components/InvoiceUpload';
import InvoiceTable from './components/InvoiceTable';
import InvoiceReviewModal from './components/InvoiceReviewModal';
import AnalyticsView from './components/AnalyticsView';
import SettingsModal from './components/SettingsModal';
import AuthModal from './components/AuthModal';
import { supabase } from './supabaseClient';

export default function App() {
  // Load saved invoices from localStorage
  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem('msme_user_invoices');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [webhookUrl, setWebhookUrl] = useState('https://rojosh.app.n8n.cloud/webhook/invoice-upload');

  // Auth State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('msme_user_auth');
      return savedUser ? JSON.parse(savedUser) : {
        name: 'Rojo (MSME Owner)',
        email: 'rojo.owner@business.com',
        provider: 'Google (Gmail)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    } catch (e) {
      return {
        name: 'Rojo (MSME Owner)',
        email: 'rojo.owner@business.com',
        provider: 'Google (Gmail)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      };
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Sync invoices to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('msme_user_invoices', JSON.stringify(invoices));
    } catch (e) {
      console.warn("LocalStorage save note:", e);
    }
  }, [invoices]);

  // Listen for live Supabase Google OAuth callback
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        saveAuthSession({
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          provider: 'Google (Gmail)',
          avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
        });
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        saveAuthSession({
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          email: session.user.email,
          provider: 'Google (Gmail)',
          avatar: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
        });
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const saveAuthSession = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    try {
      localStorage.setItem('msme_user_auth', JSON.stringify(userData));
    } catch (e) {
      console.warn("LocalStorage auth save note:", e);
    }
  };

  const handleLogin = (userData) => {
    saveAuthSession(userData);
  };

  const handleGuestContinue = () => {
    saveAuthSession({
      name: 'MSME Manager',
      email: 'owner@business.com',
      provider: 'Guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setShowAuthModal(true);
  };

  // Save newly extracted invoice to state & localStorage
  const handleInvoiceExtracted = (newInvoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    setSelectedInvoice(newInvoice);
  };

  const handleApproveInvoice = (id) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id ? { ...inv, status: 'approved' } : inv
    ));
  };

  const handleRejectInvoice = (id) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id ? { ...inv, status: 'rejected' } : inv
    ));
  };

  const handleDeleteInvoice = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const handleSaveModalInvoice = (updatedInvoice) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ));
    setSelectedInvoice(null);
  };

  const pendingCount = invoices.filter(i => i.status === 'pending').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'settings') {
            setShowSettingsModal(true);
          } else {
            setActiveTab(tab);
          }
        }}
        pendingCount={pendingCount}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Header */}
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSettings={() => setShowSettingsModal(true)}
          pendingCount={pendingCount}
          user={user}
        />

        {/* Content Body */}
        <main style={{ flex: '1', padding: '28px', maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
          
          {/* KPI Stat Cards */}
          <MetricsCards 
            invoices={invoices} 
            onFilterStatus={(st) => {
              setStatusFilter(st);
              setActiveTab('invoices');
            }} 
          />

          {/* Views */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <InvoiceTable 
                invoices={invoices}
                onSelectInvoice={setSelectedInvoice}
                onApproveInvoice={handleApproveInvoice}
                onRejectInvoice={handleRejectInvoice}
                onDeleteInvoice={handleDeleteInvoice}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
              <AnalyticsView invoices={invoices} />
            </div>
          )}

          {activeTab === 'invoices' && (
            <InvoiceTable 
              invoices={invoices}
              onSelectInvoice={setSelectedInvoice}
              onApproveInvoice={handleApproveInvoice}
              onRejectInvoice={handleRejectInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}

          {activeTab === 'upload' && (
            <InvoiceUpload 
              webhookUrl={webhookUrl} 
              onInvoiceExtracted={handleInvoiceExtracted} 
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView invoices={invoices} />
          )}
        </main>

      </div>

      {/* Manual Review Modal */}
      {selectedInvoice && (
        <InvoiceReviewModal 
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onSave={handleSaveModalInvoice}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal 
          webhookUrl={webhookUrl}
          setWebhookUrl={setWebhookUrl}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* Optional Auth Switch Modal */}
      {showAuthModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999 }}>
          <AuthModal 
            onLogin={(u) => { handleLogin(u); setShowAuthModal(false); }} 
            onGuestContinue={() => { handleGuestContinue(); setShowAuthModal(false); }} 
          />
        </div>
      )}

    </div>
  );
}
