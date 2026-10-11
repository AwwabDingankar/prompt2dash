import { useState } from 'react';
import LandingPage from './components/LandingPage';
import EmptyState from './components/EmptyState';
import DashboardRenderer from './components/DashboardRenderer';
import LoadingState from './components/LoadingState';

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
function AppNav({ onLogoClick, onBackClick, backLabel = 'Back to site', backIcon = 'arrow_back' }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,250,240,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '68px', padding: '0 28px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <Logo onClick={onLogoClick} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Subtle status indicator */}
          <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6a6a6a', fontWeight: 500, backgroundColor: 'rgba(10,10,10,0.03)', padding: '5px 12px', borderRadius: '9999px', border: '1px solid rgba(10,10,10,0.04)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
            <span>Postgres analytics</span>
          </div>

          {/* Premium "Back to site" button */}
          <button
            onClick={onBackClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(10,10,10,0.1)',
              borderRadius: '9999px',
              padding: '8px 18px 8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0a0a0a',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(10,10,10,0.05)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f7f2e8';
              e.currentTarget.style.borderColor = 'rgba(10,10,10,0.18)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(10,10,10,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(10,10,10,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(10,10,10,0.05)';
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#0a0a0a' }}>
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
  { icon: 'bar_chart', title: 'Revenue by region', prompt: 'Show revenue by region' },
  { icon: 'trending_up', title: 'Monthly sales trend', prompt: 'Show monthly sales trend for the past year' },
  { icon: 'group', title: 'Top customers by LTV', prompt: 'Show top 10 customers by lifetime value' },
  { icon: 'pie_chart', title: 'Churn by plan', prompt: 'Show churn breakdown by subscription plan' },
];

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'app' | 'result'
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function runQuery(queryPrompt) {
    const p = queryPrompt ?? prompt;
    if (!p.trim()) return;

    setView('result');
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: p }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.reason || json.error || 'Something went wrong');
      } else {
        setResult(json);
      }
    } catch (err) {
      console.error('Fetch error:', err, 'API_URL:', API_URL);
      setError('Could not reach the server. Check the browser console for details.');
    } finally {
      setLoading(false);
    }
  }

  function handleExampleSelect(examplePrompt) {
    setPrompt(examplePrompt);
    runQuery(examplePrompt);
  }

  /* ── RESULT VIEW ─────────────────────────────────────────── */
  if (view === 'result') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fffaf0', fontFamily: 'Inter, sans-serif' }}>
        <AppNav
          onLogoClick={() => { setView('app'); setResult(null); setError(null); setLoading(false); }}
          onBackClick={() => { setView('app'); setResult(null); setError(null); setLoading(false); }}
          backLabel="New query"
          backIcon="edit_note"
        />

        {/* Prompt banner shown once results are ready */}
        {!loading && prompt && (
          <div style={{ borderBottom: '1px solid rgba(10,10,10,0.06)', padding: '14px 28px', backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
            <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ff4d8b' }}>auto_awesome</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  "{prompt}"
                </span>
              </div>
              <button
                onClick={() => { setView('app'); setResult(null); }}
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6a6a6a',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0,
                  transition: 'color 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0a0a0a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6a6a6a')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>edit</span>
                Edit prompt
              </button>
            </div>
          </div>
        )}

        {/* Dashboard content */}
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 32px' }}>
          {loading && <LoadingState prompt={prompt} />}
          {error && !loading && (
            <EmptyState
              message={error}
              onReset={() => {
                setView('app');
                setResult(null);
                setError(null);
              }}
            />
          )}
          {result && !loading && (
            <div>
              <DashboardRenderer result={result} />
              {result.summary && (
                <p style={{ fontSize: '14px', color: '#6a6a6a', marginTop: '16px', lineHeight: 1.6 }}>{result.summary}</p>
              )}
            </div>
          )}
        </div>
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
        />

        {/* Hero */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '72px 24px 48px', textAlign: 'center' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(10,10,10,0.1)', borderRadius: '9999px', padding: '5px 14px 5px 8px', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(10,10,10,0.06)', marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', backgroundColor: '#0a0a0a', borderRadius: '9999px', padding: '2px 8px', letterSpacing: '0.5px' }}>AI</span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#3a3a3a' }}>GPT-4 powered insights &amp; dashboards</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-2px', color: '#0a0a0a', marginBottom: '16px' }}>
            Ask your data anything
          </h1>
          <p style={{ fontSize: '18px', color: '#6a6a6a', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.6 }}>
            Type a question in plain English — Prompt2Dash generates charts, tables, and summaries instantly.
          </p>

          {/* Prompt input */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: '20px', padding: '8px 8px 8px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 32px -8px rgba(10,10,10,0.12), 0 2px 8px rgba(10,10,10,0.06)', maxWidth: '760px', margin: '0 auto 12px' }}>
            <span className="material-symbols-outlined" style={{ color: '#a4d4c5', fontSize: '22px', flexShrink: 0 }}>auto_awesome</span>
            <input
              autoFocus
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); runQuery(); } }}
              placeholder="e.g. Show total revenue by region for Q3"
              className="focus:outline-none focus:ring-0 focus:border-transparent"
              style={{
                flex: 1,
                fontSize: '16px',
                color: '#0a0a0a',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={() => runQuery()}
              disabled={!prompt.trim()}
              style={{ backgroundColor: !prompt.trim() ? '#c4c7c7' : '#0a0a0a', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: !prompt.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, fontFamily: 'Inter, sans-serif', transition: 'background-color 0.2s' }}
            >
              Generate →
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#9a9a9a', marginTop: '8px' }}>Connected: Postgres · prod_analytics</p>
        </div>

        {/* Example cards */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 80px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#6a6a6a', textTransform: 'uppercase', letterSpacing: '1.5px', textAlign: 'center', marginBottom: '20px' }}>Try an example</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.title}
                onClick={() => handleExampleSelect(ex.prompt)}
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 4px rgba(10,10,10,0.04)', transition: 'border-color 0.2s, transform 0.15s, box-shadow 0.2s', width: '100%' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#a4d4c5'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,10,10,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(10,10,10,0.04)'; }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#f5f0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#1a3a3a' }}>{ex.icon}</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#0a0a0a', margin: 0 }}>{ex.title}</p>
                  <p style={{ fontSize: '12px', color: '#6a6a6a', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ex.prompt}</p>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#c4c7c7', marginLeft: 'auto', flexShrink: 0 }}>arrow_outward</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── LANDING VIEW ────────────────────────────────────────── */
  return <LandingPage onGetStarted={() => setView('app')} />;
}