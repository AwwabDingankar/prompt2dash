import { useState, useRef } from 'react';
import LandingPage from './components/LandingPage';
import EmptyState from './components/EmptyState';
import DashboardRenderer from './components/DashboardRenderer';
import LoadingState from './components/LoadingState';
import ApiKeyModal from './components/ApiKeyModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/query';

/** Prompt2Dash SVG Logo — used in app nav */
function Logo({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <svg height="40" style={{ height: '40px', width: 'auto', display: 'block' }} viewBox="0 0 460 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`.p2d-t{font-family:'Plus Jakarta Sans',Inter,sans-serif;font-weight:800;font-size:46px;fill:#0a0a0a;letter-spacing:-1.5px}.p2d-o{fill:#0a0a0a}.p2d-i{fill:#ff4d8b}`}</style>
        </defs>
        <g transform="translate(20,26)">
          <path className="p2d-o" d="M0 5 C0 2.2 2.2 0 5 0 H30 C46.5 0 60 13.5 60 30 C60 46.5 46.5 60 30 60 H5 C2.2 60 0 57.8 0 55 V5 Z" />
          <circle className="p2d-i" cx="30" cy="30" r="18" />
          <path d="M30 12 A 18 18 0 0 1 48 30" fill="none" opacity=".6" stroke="white" strokeLinecap="round" strokeWidth="4" />
          <circle cx="24" cy="24" fill="white" opacity=".9" r="5" />
        </g>
        <text className="p2d-t" x="96" y="75">Prompt2Dash</text>
      </svg>
    </button>
  );
}

/** Shared sticky nav bar used in app + result views */
function AppNav({ onLogoClick, onBackClick, backLabel = 'Back', backIcon = 'arrow_back', onOpenKeyModal, hasApiKey }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,250,240,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>
      <div className="flex justify-between items-center h-16 sm:h-[68px] px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        <Logo onClick={onLogoClick} />

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Gemini API Key button */}
          <button
            onClick={onOpenKeyModal}
            className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[12.5px] font-semibold rounded-full px-2.5 sm:px-3.5 py-1.5 transition-all shadow-xs cursor-pointer"
            style={{
              color: '#0a0a0a',
              backgroundColor: hasApiKey ? '#ffffff' : '#fff0f5',
              border: hasApiKey ? '1px solid rgba(10,10,10,0.1)' : '1px solid rgba(255,77,139,0.3)',
              fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            }}
            title="Configure Gemini API Key"
          >
            <span className="material-symbols-outlined text-[14px] sm:text-[15px]" style={{ color: '#ff4d8b' }}>
              vpn_key
            </span>
            <span className="hidden sm:inline">
              {hasApiKey ? 'Gemini Key Configured' : 'Set Gemini Key'}
            </span>
            <span className="sm:hidden">
              {hasApiKey ? 'Key Configured' : 'Set Key'}
            </span>
          </button>

          {/* Back button */}
          <button
            onClick={onBackClick}
            className="inline-flex items-center gap-1 sm:gap-2 bg-white text-ink text-xs sm:text-[13px] font-semibold rounded-full px-3 sm:px-4 py-1.5 border border-black/10 shadow-xs hover:bg-[#f7f2e8] transition-all cursor-pointer"
            style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
              {backIcon}
            </span>
            <span>{backLabel}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const EXAMPLES = [
  { icon: 'bar_chart', title: 'Revenue by region', prompt: 'Executive sales overview by region and product category' },
  { icon: 'trending_up', title: 'Monthly sales trend', prompt: 'Monthly revenue trend and category breakdown for 2025' },
  { icon: 'inventory_2', title: 'Top performing products', prompt: 'Top performing products and regional distribution' },
];

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'app' | 'result'
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApiKeyError, setIsApiKeyError] = useState(false);

  // User-provided Gemini API key (persisted in LocalStorage)
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('p2d_gemini_api_key') || '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyModalError, setKeyModalError] = useState('');

  const handleValidateApiKey = async (keyToValidate) => {
    const validateUrl = API_URL.replace(/\/query\/?$/, '/validate-key');
    const res = await fetch(validateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-gemini-api-key': keyToValidate.trim(),
      },
      body: JSON.stringify({ apiKey: keyToValidate.trim() }),
    });
    const json = await res.json();
    if (!res.ok || json.valid === false) {
      throw new Error(json.error || 'Invalid Gemini API key. Please check your key from Google AI Studio.');
    }
    return true;
  };

  const handleSaveApiKey = (newKey) => {
    const trimmed = (newKey || '').trim();
    setApiKey(trimmed);
    localStorage.setItem('p2d_gemini_api_key', trimmed);
    setShowKeyModal(false);
    setKeyModalError('');
    setIsApiKeyError(false);
    if (view === 'landing') {
      setView('app');
    }
  };

  const handleOpenKeyModal = () => {
    setKeyModalError('');
    setShowKeyModal(true);
  };

  async function runQuery(queryPrompt) {
    const p = queryPrompt ?? prompt;
    if (!p.trim()) return;

    // Check if Gemini API key is configured
    if (!apiKey || !apiKey.trim()) {
      setIsApiKeyError(true);
      setKeyModalError('Please enter your Gemini API key to run queries.');
      setShowKeyModal(true);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    setView('result');
    setLoading(true);
    setError(null);
    setIsApiKeyError(false);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': apiKey.trim(),
        },
        body: JSON.stringify({ prompt: p, apiKey: apiKey.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.isApiKeyError) {
          setIsApiKeyError(true);
          setKeyModalError(json.error || 'Your Gemini API key was rejected. Please verify it below.');
        } else {
          setIsApiKeyError(false);
        }
        setError(json.reason || json.error || 'Something went wrong');
      } else {
        setResult(json);
        setIsApiKeyError(false);
      }
    } catch (err) {
      console.error('Fetch error:', err, 'API_URL:', API_URL);
      setIsApiKeyError(false);
      setError('Could not reach the server. Check the browser console for details.');
    } finally {
      setLoading(false);
    }
  }

  const inputRef = useRef(null);

  function handleExampleSelect(examplePrompt) {
    setPrompt(examplePrompt);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ── RESULT VIEW (default width fit) ──────────────────────── */
  if (view === 'result') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fffaf0', fontFamily: 'Inter, sans-serif' }}>
        <AppNav
          onLogoClick={() => { setView('app'); setResult(null); setError(null); setLoading(false); }}
          onBackClick={() => { setView('app'); setResult(null); setError(null); setLoading(false); }}
          backLabel="Back"
          backIcon="arrow_back"
          onOpenKeyModal={handleOpenKeyModal}
          hasApiKey={Boolean(apiKey && apiKey.trim())}
        />

        {/* Prompt banner shown once results are ready */}
        {!loading && prompt && (
          <div className="border-b border-black/[0.06] bg-white/70 backdrop-blur-md w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 w-full box-border">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="material-symbols-outlined text-base sm:text-lg text-[#ff4d8b] flex-shrink-0">auto_awesome</span>
                <span className="text-xs sm:text-sm font-semibold text-ink truncate">
                  "{prompt}"
                </span>
              </div>
              <button
                onClick={() => { setView('app'); setResult(null); }}
                className="text-xs font-semibold text-muted hover:text-ink flex items-center gap-1 flex-shrink-0 cursor-pointer transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span className="hidden sm:inline">Edit prompt</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </div>
          </div>
        )}

        {/* Dashboard content — Aligned with navbar logo and prompt bar (max-w-7xl container) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 pb-16 sm:pb-20 w-full box-border">
          {loading && <LoadingState prompt={prompt} />}
          {error && !loading && (
            <EmptyState
              message={error}
              isApiKeyError={isApiKeyError}
              onUpdateApiKey={() => {
                setShowKeyModal(true);
              }}
              onReset={() => {
                setView('app');
                setResult(null);
                setError(null);
                setIsApiKeyError(false);
              }}
            />
          )}
          {result && !loading && (
            <DashboardRenderer result={result} />
          )}
        </div>

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={showKeyModal}
          onClose={() => setShowKeyModal(false)}
          onSave={handleSaveApiKey}
          onValidate={handleValidateApiKey}
          currentKey={apiKey}
          errorMessage={keyModalError}
        />
      </div>
    );
  }

  /* ── APP VIEW (prompt input) ─────────────────────────────── */
  if (view === 'app') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fffaf0', fontFamily: 'Inter, sans-serif' }}>
        <AppNav
          onLogoClick={() => setView('landing')}
          onBackClick={() => setView('landing')}
          backLabel="Back to site"
          backIcon="arrow_back"
          onOpenKeyModal={handleOpenKeyModal}
          hasApiKey={Boolean(apiKey && apiKey.trim())}
        />

        {/* Hero */}
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-black/10 rounded-full py-1 px-3 sm:px-3.5 bg-white shadow-xs mb-5 sm:mb-7">
            <span className="text-[10px] sm:text-[11px] font-bold text-white bg-ink rounded-full px-2 py-0.5 tracking-wider">AI</span>
            <span className="text-xs sm:text-[13px] font-medium text-body">GPT-4 powered insights &amp; dashboards</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink mb-3 sm:mb-4 leading-tight">
            Ask your data anything
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted max-w-[520px] mx-auto mb-7 sm:mb-10 leading-relaxed">
            Type a question in plain English — Prompt2Dash generates charts, tables, and summaries instantly.
          </p>

          {/* Prompt input */}
          <div className="bg-white border border-black/[0.08] rounded-2xl sm:rounded-[20px] p-2 sm:p-2.5 pl-3.5 sm:pl-5 flex items-center gap-2 sm:gap-3 shadow-lg max-w-[760px] mx-auto mb-3 w-full box-border">
            <span className="material-symbols-outlined text-[#a4d4c5] text-xl sm:text-[22px] flex-shrink-0">auto_awesome</span>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); runQuery(); } }}
              placeholder="e.g. Show total revenue by region for Q3"
              className="flex-1 text-sm sm:text-base text-ink bg-transparent border-none outline-none focus:outline-none min-w-0"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <button
              onClick={() => runQuery()}
              disabled={!prompt.trim()}
              className="text-xs sm:text-sm font-semibold text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border-none cursor-pointer flex items-center gap-1.5 flex-shrink-0 transition-colors"
              style={{
                backgroundColor: !prompt.trim() ? '#c4c7c7' : '#0a0a0a',
                cursor: !prompt.trim() ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span>Generate</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <p className="text-[11px] sm:text-xs text-muted mt-2">Connected: Postgres · prod_analytics</p>
        </div>

        {/* Example cards */}
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <p className="text-[11px] sm:text-xs font-semibold text-muted uppercase tracking-widest text-center mb-4 sm:mb-5">Try an example</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.title}
                onClick={() => handleExampleSelect(ex.prompt)}
                className="bg-white border border-black/[0.08] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 cursor-pointer text-left shadow-xs hover:border-[#a4d4c5] hover:-translate-y-0.5 hover:shadow-md transition-all w-full"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f5f0e0] flex items-center justify-center flex-shrink-0 text-brand-teal">
                  <span className="material-symbols-outlined text-lg">{ex.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-ink m-0 leading-snug">{ex.title}</p>
                  <p className="text-[11px] text-muted m-0 mt-0.5 truncate">{ex.prompt}</p>
                </div>
                <span className="material-symbols-outlined text-base text-black/30 ml-auto flex-shrink-0">arrow_outward</span>
              </button>
            ))}
          </div>
        </div>

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={showKeyModal}
          onClose={() => setShowKeyModal(false)}
          onSave={handleSaveApiKey}
          onValidate={handleValidateApiKey}
          currentKey={apiKey}
          errorMessage={keyModalError}
        />
      </div>
    );
  }

  /* ── LANDING VIEW ────────────────────────────────────────── */
  return (
    <>
      <LandingPage
        onGetStarted={() => {
          setKeyModalError('');
          setShowKeyModal(true);
        }}
      />
      <ApiKeyModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSave={handleSaveApiKey}
        onValidate={handleValidateApiKey}
        currentKey={apiKey}
        errorMessage={keyModalError}
      />
    </>
  );
}