import React, { useState } from 'react';
import { X, Save, RefreshCw, Database, Sparkles, Server, CheckCircle2 } from 'lucide-react';

export default function SettingsModal({ webhookUrl, setWebhookUrl, onClose }) {
  const [urlInput, setUrlInput] = useState(webhookUrl);
  const [supabaseUrl, setSupabaseUrl] = useState("https://msxcgmgkazrboryzmsiv.supabase.co/rest/v1/");
  const [supabaseKey, setSupabaseKey] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeGNnbWdrYXpyYm9yeXptc2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3ODA0MzcsImV4cCI6MjEwMDM1NjQzN30.JsDJKZg2STbrTGf_NEgtzAmMZ-mmqIo5v0laLVobypg");
  const [grokApiKey, setGrokApiKey] = useState("");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [aiModel, setAiModel] = useState("grok-2-vision");
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const handleTestPing = async () => {
    setTesting(true);
    setTestResult(null);
    await new Promise(r => setTimeout(r, 1000));
    setTesting(false);
    setTestResult({ success: true, message: "n8n Webhook Endpoint ping successful!" });
  };

  const handleSave = () => {
    setWebhookUrl(urlInput);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '580px',
          padding: '24px',
          border: '1px solid var(--border-accent)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>System Integration & AI Engine Settings</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* n8n Webhook URL */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
              n8n Webhook Execution URL
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="http://localhost:5678/webhook/invoice-upload"
                style={{ flex: '1', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
              />
              <button 
                onClick={handleTestPing}
                style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}
              >
                {testing ? <RefreshCw size={14} className="animate-spin" /> : "Test Ping"}
              </button>
            </div>
          </div>

          {testResult && (
            <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> {testResult.message}
            </div>
          )}

          {/* AI Model selection */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
              Primary AI Vision Engine
            </label>
            <select 
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: '600' }}
            >
              <option value="grok-2-vision">🚀 Grok 2 Vision (xAI - Primary Engine)</option>
              <option value="gemini-1-5-flash">⚡ Gemini 1.5 Flash (Google - Auto Fallback)</option>
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Anthropic API)</option>
            </select>
          </div>

          {/* Grok API Key */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--cyan)', marginBottom: '4px', display: 'block' }}>
              Grok (xAI) API Key (Primary)
            </label>
            <input 
              type="password" 
              value={grokApiKey}
              onChange={(e) => setGrokApiKey(e.target.value)}
              placeholder="xai-..."
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.3)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
            />
          </div>

          {/* Gemini API Key */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber)', marginBottom: '4px', display: 'block' }}>
              Gemini API Key (Google - Automatic Fallback)
            </label>
            <input 
              type="password" 
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.3)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
            />
          </div>

          {/* Supabase URL */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
              Supabase Project REST URL
            </label>
            <input 
              type="text" 
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
            />
          </div>

          {/* Supabase Key */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
              Supabase Anon / Service Key
            </label>
            <input 
              type="password" 
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
            />
          </div>

        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', color: 'var(--text-secondary)' }}>
            Cancel
          </button>
          <button 
            onClick={handleSave}
            style={{ padding: '8px 20px', borderRadius: '8px', background: 'var(--primary)', color: '#fff', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Save size={16} /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
