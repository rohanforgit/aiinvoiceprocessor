import React, { useEffect } from 'react';
import { renderCanvas } from './ui/canvas';
import { Button } from './ui/button';
import { Sparkles, ArrowRight, Plus, LogIn, FileText, Database, FileSpreadsheet } from 'lucide-react';

export default function LandingHomePage({ onOpenLogin, onLaunchDashboard }) {
  useEffect(() => {
    const cleanup = renderCanvas();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden flex flex-col font-sans">
      
      {/* Background Interactive Canvas */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 mx-auto w-full h-full z-0 opacity-40"
      />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-black/75 backdrop-blur-md border-b border-zinc-900 flex items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchDashboard}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <FileText size={20} className="text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            MSME Billing AI
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">AI Features</a>
          <a href="#workflow" className="hover:text-white transition-colors">How it Works</a>
          <a href="#supabase" className="hover:text-white transition-colors">Supabase Sync</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <LogIn size={15} /> Login
          </button>
          
          <button
            onClick={onLaunchDashboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-md shadow-indigo-500/20 hover:scale-105 transition-all cursor-pointer"
          >
            Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 flex-1 flex flex-col items-center justify-center pt-28 pb-16 px-6 text-center max-w-6xl mx-auto w-full">
        
        {/* Introducing Pill */}
        <div className="mb-6 animate-fade-in-down">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 text-xs font-semibold text-zinc-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>Introducing MSME Billing AI</span>
            <span className="h-3 w-px bg-zinc-800" />
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
            >
              Explore <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Bordered Headline Box */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <div className="relative border border-zinc-800 bg-zinc-950/40 p-8 md:p-16 rounded-xl backdrop-blur-sm shadow-2xl shadow-indigo-500/5">
            
            {/* Corner Pluses */}
            <div className="absolute -left-2.5 -top-2.5 text-zinc-700 font-light text-xl select-none">+</div>
            <div className="absolute -left-2.5 -bottom-2.5 text-zinc-700 font-light text-xl select-none">+</div>
            <div className="absolute -right-2.5 -top-2.5 text-zinc-700 font-light text-xl select-none">+</div>
            <div className="absolute -right-2.5 -bottom-2.5 text-zinc-700 font-light text-xl select-none">+</div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Your complete platform for Invoice & Bill Automation.
            </h1>

            {/* Pulse Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] text-emerald-400 font-extrabold tracking-widest uppercase">Available Now</p>
            </div>

          </div>
        </div>

        {/* Subtitle Message */}
        <h2 className="text-lg md:text-xl font-semibold text-zinc-200 mb-2">
          Welcome to our billing dashboard! Supercharged by{' '}
          <span className="text-indigo-400 font-bold">Grok 2 & Gemini.</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p className="max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
          I craft enchanting visuals for brands, and conjure design resources to empower others.
          Extract line items, taxes, customer details & sync with Supabase PostgreSQL instantly.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
          <Button
            variant="default"
            size="lg"
            onClick={onLaunchDashboard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-5 rounded-lg shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            Start Project
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onOpenLogin}
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 font-bold px-8 py-5 rounded-lg backdrop-blur-sm cursor-pointer"
          >
            Book a call / Sign In
          </Button>
        </div>

      </section>

      {/* Minimal Project Feature Highlights */}
      <section id="features" className="relative z-10 px-6 py-20 bg-zinc-950/80 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold mb-4">
            <Sparkles size={12} /> Built for MSMEs
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-3">
            What Our Project Does
          </h2>
          
          <p className="text-zinc-400 max-w-2xl mx-auto mb-12 text-sm md:text-base">
            A clean, clutter-free billing system designed for small and medium business owners to extract, check, and manage invoices effortlessly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="glass-panel p-8 text-left bg-zinc-900/30 border border-zinc-800/60 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Grok 2 Vision AI Extraction
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Automatically parses vendor details, full customer address, timestamp, coupons (`FIRST3`), line items, taxes, and amounts from any receipt image or PDF.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-8 text-left bg-zinc-900/30 border border-zinc-800/60 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                <Database size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Supabase Cloud Persistence
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Stores extracted invoice JSON records directly into your Supabase PostgreSQL cloud table with RLS security policies and duplicate detection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8 text-left bg-zinc-900/30 border border-zinc-800/60 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                <FileSpreadsheet size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Fault Correction & CSV Export
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clean split modal allows MSME owners to correct any typo, adjust line items or rates, and export structured financial records to Excel/CSV anytime.
              </p>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Ready to process your bills?</h3>
              <p className="text-sm text-zinc-400">Log in with Google or launch your dashboard immediately.</p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={onOpenLogin}
                className="bg-white text-zinc-950 hover:bg-zinc-100 font-bold px-6 py-2.5 rounded-lg cursor-pointer"
              >
                Sign In with Google
              </Button>
              <Button 
                onClick={onLaunchDashboard}
                className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-6 py-2.5 rounded-lg cursor-pointer"
              >
                Launch Dashboard
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-zinc-600 border-t border-zinc-900 z-10">
        MSME AI Invoice Processor • Built with Grok 2 Vision, Gemini 1.5, Supabase & Vite React
      </footer>

    </div>
  );
}
