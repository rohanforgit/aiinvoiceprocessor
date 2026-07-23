import React, { useEffect } from 'react';
import { renderCanvas } from './ui/canvas';
import { Button } from './ui/button';
import { Sparkles, ArrowRight, Plus, LogIn, FileText, CheckCircle2, Database, FileSpreadsheet } from 'lucide-react';

export default function LandingHomePage({ onOpenLogin, onLaunchDashboard }) {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div style={{ background: '#000000', color: '#ffffff', minHeight: '100vh', width: '100vw', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Background Interactive Canvas */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 mx-auto w-full h-full z-0 opacity-50"
      />

      {/* Top Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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

      {/* Styled Hero Section matching exactly the layout style */}
      <section id="home" className="relative z-10 pt-32 pb-20 px-4 text-center">
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
          
          {/* Top pill badge */}
          <div className="z-10 mb-8">
            <div className="relative inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 text-xs font-semibold leading-6 text-zinc-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Introducing MSME Billing AI.</span>
              <button
                onClick={onOpenLogin}
                className="hover:text-indigo-300 ml-1 flex items-center font-bold text-indigo-400 cursor-pointer"
              >
                Explore <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Bordered Headline Box with absolute corner Plus signs */}
          <div className="w-full px-2 mb-10">
            <div className="relative mx-auto max-w-4xl border border-zinc-800 bg-zinc-950/20 p-8 md:p-16 rounded-lg backdrop-blur-sm [mask-image:radial-gradient(80rem_40rem_at_center,white,transparent)]">
              
              {/* Corner Plus elements */}
              <div className="absolute -left-3.5 -top-3.5 text-zinc-600 font-extralight text-2xl select-none">+</div>
              <div className="absolute -left-3.5 -bottom-3.5 text-zinc-600 font-extralight text-2xl select-none">+</div>
              <div className="absolute -right-3.5 -top-3.5 text-zinc-600 font-extralight text-2xl select-none">+</div>
              <div className="absolute -right-3.5 -bottom-3.5 text-zinc-600 font-extralight text-2xl select-none">+</div>

              <h1 className="select-none text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
                Your complete platform for Invoice & Bill Automation.
              </h1>
              
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                </span>
                <p className="text-[11px] text-green-500 font-semibold tracking-wider uppercase">Available Now</p>
              </div>

            </div>
          </div>

          {/* Subheading Welcome */}
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100 mb-2">
            Welcome to our billing dashboard! Supercharged by{' '}
            <span className="text-indigo-400 font-bold">Grok 2 & Gemini.</span>
          </h2>

          {/* Descriptive subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed">
            I craft enchanting visuals for brands, and conjure design resources to empower others. 
            Extract bills, receipts, line items & taxes instantly and sync to your PostgreSQL database.
          </p>

          {/* CTAs using shadcn Buttons */}
          <div className="flex justify-center gap-4 relative z-20">
            <Button 
              variant="default" 
              size="lg" 
              onClick={onLaunchDashboard}
              className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-8 py-6 rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              Start Project
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onOpenLogin}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-900 font-bold px-8 py-6 rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              Book a call / Sign In
            </Button>
          </div>

        </div>
      </section>

      {/* Minimal Project Feature Highlights */}
      <section id="features" className="relative z-10 padding px-6 py-20 bg-zinc-950/80 border-t border-zinc-900">
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.3)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '16px' }}>
            <Sparkles size={14} /> Built for MSMEs
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            What Our Project Does
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 48px auto' }}>
            A clean, clutter-free billing system designed for small and medium business owners to extract, check, and manage invoices effortlessly.
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
              <Button 
                onClick={onOpenLogin}
                className="bg-white text-zinc-950 hover:bg-zinc-100 font-bold px-6 py-2 rounded-lg cursor-pointer"
              >
                Sign In with Google
              </Button>
              <Button 
                onClick={onLaunchDashboard}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-6 py-2 rounded-lg cursor-pointer"
              >
                Launch App Dashboard
              </Button>
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
