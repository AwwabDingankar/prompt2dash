/**
 * AppPage — The main prompt input view after CTA click.
 * Styled to match the Stitch "Intelligent AI Dashboard Builder" landing design.
 * Shows the Prompt2Dash nav + hero prompt input + example cards.
 */
export default function AppPage({
  prompt,
  setPrompt,
  onSubmit,
  onExampleSelect,
  onBack,
  loading,
}) {
  const examples = [
    { icon: 'bar_chart', title: 'Show revenue by region', prompt: 'Show revenue by region' },
    { icon: 'trending_up', title: 'Monthly sales trend', prompt: 'Show monthly sales trend for the past year' },
    { icon: 'group', title: 'Top customers by LTV', prompt: 'Show top 10 customers by lifetime value' },
  ];

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        backgroundColor: '#fffaf0',
        color: '#0a0a0a',
      }}
    >
      {/* NAV */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255,250,240,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(10,10,10,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
            padding: '0 24px',
            maxWidth: '1280px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button
              onClick={onBack}
              style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <svg height="40" style={{ height: '40px', width: 'auto', display: 'block' }} viewBox="0 0 460 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`.ap-text { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-weight: 800; font-size: 46px; fill: #0a0a0a; letter-spacing: -1.5px; } .ap-outer { fill: #0a0a0a; } .ap-inner { fill: #ff4d8b; }`}</style>
                </defs>
                <g transform="translate(20, 26)">
                  <path className="ap-outer" d="M0 5 C0 2.2 2.2 0 5 0 H30 C46.5 0 60 13.5 60 30 C60 46.5 46.5 60 30 60 H5 C2.2 60 0 57.8 0 55 V5 Z" />
                  <circle className="ap-inner" cx="30" cy="30" r="18" />
                  <path d="M30 12 A 18 18 0 0 1 48 30" fill="none" opacity="0.6" stroke="white" strokeLinecap="round" strokeWidth="4" />
                  <circle cx="24" cy="24" fill="white" opacity="0.9" r="5" />
                </g>
                <text className="ap-text" x="96" y="75">Prompt2Dash</text>
              </svg>
            </button>
          </div>
          {/* Back to site */}
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6a6a6a',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0a0a0a')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6a6a6a')}
          >
            ← Back to site
          </button>
        </div>
      </nav>

      {/* HERO AREA */}
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '72px 24px 48px',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(10,10,10,0.1)',
            borderRadius: '9999px',
            padding: '6px 14px 6px 8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(10,10,10,0.06)',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: '#0a0a0a',
              borderRadius: '9999px',
              padding: '2px 8px',
              letterSpacing: '0.5px',
            }}
          >
            AI
          </span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#3a3a3a' }}>
            GPT-4 powered insights &amp; dashboards
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: '#0a0a0a',
            marginBottom: '16px',
          }}
        >
          Ask your data anything
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#6a6a6a',
            maxWidth: '520px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Type a question in plain English — Prompt2Dash generates charts, tables, and summaries instantly.
        </p>

        {/* PROMPT INPUT */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(10,10,10,0.08)',
            borderRadius: '20px',
            padding: '8px 8px 8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 32px -8px rgba(10,10,10,0.12), 0 2px 8px rgba(10,10,10,0.06)',
            maxWidth: '760px',
            margin: '0 auto 12px',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#a4d4c5', fontSize: '22px', flexShrink: 0 }}
          >
            auto_awesome
          </span>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt?.(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Show total revenue by region for Q3"
            disabled={loading}
            style={{
              flex: 1,
              fontSize: '16px',
              color: '#0a0a0a',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <button
            onClick={onSubmit}
            disabled={loading || !prompt?.trim()}
            style={{
              backgroundColor: loading || !prompt?.trim() ? '#c4c7c7' : '#0a0a0a',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: loading || !prompt?.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s, transform 0.1s',
              flexShrink: 0,
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              if (!loading && prompt?.trim()) e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', animation: 'spin 1s linear infinite' }}>autorenew</span>
                Generating…
              </>
            ) : (
              <>
                Generate
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </>
            )}
          </button>
        </div>

        {/* Sub-label */}
        <p style={{ fontSize: '12px', color: '#9a9a9a', marginTop: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '13px', verticalAlign: 'middle', marginRight: '4px' }}>database</span>
          Connected: Postgres · prod_analytics
        </p>
      </div>

      {/* EXAMPLE CARDS */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 80px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6a6a6a',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Try an example
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          {examples.map((ex) => (
            <button
              key={ex.title}
              onClick={() => onExampleSelect?.(ex.prompt)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(10,10,10,0.08)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s, transform 0.15s, box-shadow 0.2s',
                boxShadow: '0 1px 4px rgba(10,10,10,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#a4d4c5';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,10,10,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(10,10,10,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(10,10,10,0.04)';
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#f5f0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#1a3a3a' }}>
                  {ex.icon}
                </span>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#0a0a0a', margin: 0 }}>{ex.title}</p>
                <p style={{ fontSize: '12px', color: '#6a6a6a', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ex.prompt}
                </p>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#c4c7c7', marginLeft: 'auto', flexShrink: 0 }}>
                arrow_outward
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
