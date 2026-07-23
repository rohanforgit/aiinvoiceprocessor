import React, { useEffect } from 'react';
import { renderCanvas } from './ui/canvas';
import { Button } from './ui/button';
import { 
  Sparkles, 
  ArrowRight, 
  Plus, 
  LogIn, 
  FileText, 
  Database, 
  FileSpreadsheet, 
  ShieldCheck, 
  Zap, 
  Receipt, 
  CheckCircle2,
  Cpu,
  RefreshCw
} from 'lucide-react';

export default function LandingHomePage({ onOpenLogin, onLaunchDashboard }) {
  useEffect(() => {
    const cleanup = renderCanvas();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0b0f19] text-white relative overflow-x-hidden flex flex-col font-sans">
      
      {/* Background Interactive Canvas */}
      <canvas
        id="canvas"
        className="pointer-events-none fixed inset-0 w-full h-full z-0 opacity-45"
      />

      {/* Top Navigation Bar with Purple Glow */}
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#0b0f19]/80 backdrop-blur-xl border-b border-purple-500/15 flex items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchDashboard}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400/30">
            <FileText size={22} className="text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              MSME Billing AI
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-purple-200/70">
          <a href="#about" className="hover:text-purple-300 transition-colors">Project Details</a>
          <a href="#workflow" className="hover:text-purple-300 transition-colors">How it Works</a>
          <a href="#features" className="hover:text-purple-300 transition-colors">AI Features</a>
          <a href="#login-info" className="hover:text-purple-300 transition-colors">Google Login</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-purple-200/80 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-all cursor-pointer"
          >
            <LogIn size={15} /> Login / Sign In
          </button>
          
          <button
            onClick={onLaunchDashboard}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-bold shadow-lg shadow-purple-600/30 hover:scale-105 transition-all cursor-pointer"
          >
            Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Purple Hero Section */}
      <section id="home" className="relative z-10 flex-1 flex flex-col items-center justify-center pt-28 pb-16 px-6 text-center max-w-6xl mx-auto w-full">
        
        {/* Pill Badge */}
        <div className="mb-6 animate-fade-in-down">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-bold text-purple-200 backdrop-blur-md shadow-lg shadow-purple-500/10">
            <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            <span>AI Invoice & Bill Processing for MSMEs</span>
            <span className="h-3 w-px bg-purple-500/30" />
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-extrabold transition-colors cursor-pointer"
            >
              Explore <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Hero Headline Box with Purple Glow */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <div className="relative border border-purple-500/20 bg-[#111827]/60 p-8 md:p-14 rounded-2xl backdrop-blur-md shadow-2xl shadow-purple-900/20">
            
            {/* Corner Pluses */}
            <div className="absolute -left-2.5 -top-2.5 text-purple-400/80 font-light text-xl select-none">+</div>
            <div className="absolute -left-2.5 -bottom-2.5 text-purple-400/80 font-light text-xl select-none">+</div>
            <div className="absolute -right-2.5 -top-2.5 text-purple-400/80 font-light text-xl select-none">+</div>
            <div className="absolute -right-2.5 -bottom-2.5 text-purple-400/80 font-light text-xl select-none">+</div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="text-white">Automate Invoices with </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                AI Precision & Cloud Sync.
              </span>
            </h1>

            {/* Pulse Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
              <p className="text-[11px] text-purple-300 font-extrabold tracking-widest uppercase">Grok 2 Vision & Gemini 1.5 Active</p>
            </div>

          </div>
        </div>

        {/* Subtitle Message */}
        <p className="max-w-2xl text-sm md:text-base text-purple-200/80 leading-relaxed mb-8">
          Extract food delivery bills, customer addresses, line items, timestamps, tax breakdowns, and coupon discounts instantly into your Supabase database.
        </p>

        {/* Purple CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
          <Button
            variant="default"
            size="lg"
            onClick={onLaunchDashboard}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-5 rounded-xl shadow-xl shadow-purple-600/25 border border-purple-400/30 cursor-pointer"
          >
            Start Bill Extraction
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onOpenLogin}
            className="border-purple-500/30 bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 font-bold px-8 py-5 rounded-xl backdrop-blur-sm cursor-pointer"
          >
            Google Sign In
          </Button>
        </div>

      </section>

      {/* Project Information & Technical Architecture Section */}
      <section id="about" className="relative z-10 px-6 py-20 bg-[#0d1222]/90 border-t border-purple-500/15">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold mb-3">
              <Cpu size={14} /> Project Architecture
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              About The MSME Billing AI Project
            </h2>
            
            <p className="text-purple-200/70 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              Designed for small and medium enterprises (MSMEs) to convert chaotic physical bills, receipts, and food delivery orders into structured financial data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Detail 1 */}
            <div className="p-8 rounded-2xl bg-[#111827]/70 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-5 border border-purple-400/30">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Dual AI Vision Engine (Grok + Gemini)
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Utilizes Grok 2 Vision as the primary OCR extractor with Gemini 1.5 fallback for zero-downtime parsing. Extracts line items, CGST/SGST taxes, discounts, delivery addresses, and customer timestamps accurately.
              </p>
            </div>

            {/* Detail 2 */}
            <div className="p-8 rounded-2xl bg-[#111827]/70 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-5 border border-indigo-400/30">
                <Receipt size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Rupee (₹) Currency Precision
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Engineered specifically for Indian and international MSMEs with automatic Rupee (₹) currency formatting, preventing dollar ($) misclassifications across itemized bill calculations.
              </p>
            </div>

            {/* Detail 3 */}
            <div className="p-8 rounded-2xl bg-[#111827]/70 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-5 border border-purple-400/30">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Supabase PostgreSQL Cloud Table
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Extracted invoice objects are persisted directly into Supabase PostgreSQL cloud storage. Features local `localStorage` caching and instant duplicate prevention.
              </p>
            </div>

            {/* Detail 4 */}
            <div className="p-8 rounded-2xl bg-[#111827]/70 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center mb-5 border border-pink-400/30">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Interactive Split Review & Excel Export
              </h3>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                MSME owners can inspect invoice image side-by-side with extracted JSON, correct OCR typos, approve or reject bills, and export financial summaries to Excel/CSV with one click.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How it Works Workflow Section */}
      <section id="workflow" className="relative z-10 px-6 py-20 bg-[#0b0f19]">
        <div className="max-w-6xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-3">
            <RefreshCw size={14} /> Step-by-Step Flow
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 tracking-tight">
            How The Extraction Workflow Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl bg-[#111827]/50 border border-purple-500/15 text-left relative">
              <div className="text-4xl font-black text-purple-500/30 mb-3">01</div>
              <h4 className="text-lg font-bold text-white mb-2">Upload Bill or Receipt</h4>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Drag and drop food delivery bills (Tandoori Tikka, Choco Lava Cake, etc.), utility receipts, or business invoices.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111827]/50 border border-purple-500/15 text-left relative">
              <div className="text-4xl font-black text-purple-500/30 mb-3">02</div>
              <h4 className="text-lg font-bold text-white mb-2">AI Extraction Pipeline</h4>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                n8n webhook triggers Grok 2 Vision to extract vendor details, timestamp, line items, taxes, and coupon discounts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111827]/50 border border-purple-500/15 text-left relative">
              <div className="text-4xl font-black text-purple-500/30 mb-3">03</div>
              <h4 className="text-lg font-bold text-white mb-2">Sync & Export</h4>
              <p className="text-sm text-purple-200/70 leading-relaxed">
                Review extracted JSON data, sync automatically to Supabase database, and export financial summaries to Excel.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Google Login Information Section */}
      <section id="login-info" className="relative z-10 px-6 py-20 bg-[#0d1222]/90 border-t border-purple-500/15">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-[#13192e] via-[#1a1c38] to-[#121029] border border-purple-500/30 shadow-2xl shadow-purple-900/30 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-400/30">
                <ShieldCheck size={22} className="text-purple-300" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Google OAuth Login Information</h3>
            </div>

            <p className="text-sm md:text-base text-purple-200/80 leading-relaxed mb-6">
              To ensure your company billing records and Supabase cloud tables are protected, users must sign in via official Google (Gmail) OAuth authentication.
            </p>

            <ul className="space-y-3 mb-8 text-sm text-purple-200/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400" />
                <span>Single-click Google OAuth authentication powered by Supabase Auth</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400" />
                <span>Stores authenticated email & avatar session securely in localStorage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400" />
                <span>Instant access to MSME Invoice Upload, Table Reviews, & Analytics</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onOpenLogin}
                className="bg-white text-zinc-950 hover:bg-purple-100 font-extrabold px-8 py-3 rounded-xl shadow-lg cursor-pointer"
              >
                Continue with Google (Gmail)
              </Button>

              <Button 
                onClick={onLaunchDashboard}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold px-8 py-3 rounded-xl cursor-pointer"
              >
                Launch Dashboard Directly
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-purple-300/40 border-t border-purple-500/10 z-10">
        MSME AI Invoice Processor • Built with Grok 2 Vision, Gemini 1.5, Supabase & Vite React
      </footer>

    </div>
  );
}
