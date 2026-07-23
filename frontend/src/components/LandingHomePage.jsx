import React from 'react';
import Hero from './ui/animated-shader-hero';
import { FileText, LogIn, Sparkles, Database, FileSpreadsheet, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingHomePage({ onOpenLogin, onLaunchDashboard }) {
  return (
    <div style={{ background: '#000000', color: '#ffffff', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      
      {/* Top Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 36px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}>
            <FileText size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              MSME Billing AI
            </span>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '0.88rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)' }}>
          <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>AI Features</a>
          <a href="#workflow" style={{ color: 'inherit', textDecoration: 'none' }}>How it Works</a>
          <a href="#supabase" style={{ color: 'inherit', textDecoration: 'none' }}>Supabase DB</a>
        </div>

        {/* Top Right Login Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenLogin}
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LogIn size={16} /> Login / Sign In
          </button>

          <button
            onClick={onLaunchDashboard}
            style={{
              padding: '9px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 16px rgba(99, 102, 241, 0.4)',
              cursor: 'pointer'
            }}
          >
            Launch Dashboard <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Standalone Shader Hero Section */}
      <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
        <Hero
          trustBadge={{
            text: "Trusted by 1,000+ MSMEs & Fast-Growing Businesses",
            icons: ["✨", "⚡", "🚀"]
          }}
          headline={{
            line1: "AI-Powered",
            line2: "Invoice & Bill Automation"
          }}
          subtitle="Instant AI extraction for bills, receipts, line items & taxes using Grok 2 Vision & Gemini 1.5. Syncs directly with Supabase & Excel."
          buttons={{
            primary: {
              text: "Get Started & Extract Bill",
              onClick: onLaunchDashboard
            },
            secondary: {
              text: "Google & Email Sign In",
              onClick: onOpenLogin
            }
          }}
        />
      </div>

      {/* Minimal Project Feature Highlights */}
      <section id="features" style={{ padding: '80px 24px', background: '#0b0f19', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.3)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '16px' }}>
            <Sparkles size={14} /> Built for MSMEs
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            What Our Project Does
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 48px auto' }}>
            A clean, clutter-free billing system designed for small and medium business owners to extract, check, and manage invoices effortlesly.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Feature 1 */}
            <div className="glass-panel" style={{ padding: '28px', textAlign: 'left', background: 'rgba(17, 24, 39, 0.7)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>
                Grok 2 Vision AI Extraction
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Automatically parses vendor details, full customer address, timestamp, coupons (`FIRST3`), line items, taxes, and amounts from any receipt image or PDF.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: '28px', textAlign: 'left', background: 'rgba(17, 24, 39, 0.7)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <Database size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>
                Supabase Cloud Persistence
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Stores extracted invoice JSON records directly into your Supabase PostgreSQL cloud table with RLS security policies and duplicate detection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: '28px', textAlign: 'left', background: 'rgba(17, 24, 39, 0.7)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                <FileSpreadsheet size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>
                Fault Correction & CSV Export
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Clean split modal allows MSME owners to correct any typo, adjust line items or rates, and export structured financial records to Excel/CSV anytime.
              </p>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <div style={{ marginTop: '56px', padding: '40px 30px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800' }}>Ready to process your bills?</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Log in with Google or launch your dashboard immediately.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={onOpenLogin}
                style={{ padding: '12px 24px', borderRadius: '10px', background: '#ffffff', color: '#000000', fontWeight: '800', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Sign In with Google
              </button>
              <button 
                onClick={onLaunchDashboard}
                style={{ padding: '12px 24px', borderRadius: '10px', background: 'var(--primary)', color: '#ffffff', fontWeight: '800', fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Launch App Dashboard
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        MSME AI Invoice Processor • Built with Grok 2 Vision, Gemini 1.5, Supabase & Vite React
      </footer>

    </div>
  );
}
