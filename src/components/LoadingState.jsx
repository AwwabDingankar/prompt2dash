import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'Analyzing intent', detail: 'Parsing prompt semantics & identifying target data fields' },
  { label: 'Querying database', detail: 'Executing analytical SQL aggregation in PostgreSQL' },
  { label: 'Synthesizing dashboard', detail: 'Rendering interactive visualization and key takeaways' },
];

export default function LoadingState({ prompt }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* ── TOP HERO STATUS CARD ──────────────────────────── */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(10, 10, 10, 0.08)',
          boxShadow: '0 8px 32px -8px rgba(10, 10, 10, 0.06)',
          padding: '36px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft decorative background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '140px',
            background: 'radial-gradient(circle, rgba(255, 77, 139, 0.12) 0%, rgba(164, 212, 197, 0.15) 50%, transparent 80%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        {/* Central pulsing AI emblem */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
          <div
            className="pulse-glow"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #fff2f6 0%, #e8f7f3 100%)',
              border: '1px solid rgba(255, 77, 139, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px -2px rgba(255, 77, 139, 0.2)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '28px',
                color: '#ff4d8b',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              auto_awesome
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#0a0a0a',
            margin: '0 0 8px',
            letterSpacing: '-0.5px',
          }}
        >
          Building your dashboard...
        </h2>

        {/* Prompt badge quote */}
        {prompt && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fffaf0',
              border: '1px solid rgba(10, 10, 10, 0.08)',
              borderRadius: '9999px',
              padding: '6px 18px',
              fontSize: '13px',
              color: '#3a3a3a',
              fontWeight: 500,
              maxWidth: '640px',
              margin: '0 auto 24px',
            }}
          >
            <span style={{ color: '#8a8a8a', fontStyle: 'italic' }}>Query:</span>
            <span style={{ fontWeight: 600, color: '#0a0a0a' }}>"{prompt}"</span>
          </div>
        )}

        {/* Current status detail */}
        <p style={{ fontSize: '14px', color: '#6a6a6a', margin: '0 0 28px', minHeight: '20px' }}>
          {STEPS[activeStep].detail}
        </p>

        {/* Multi-step progress capsules */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          {STEPS.map((step, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={step.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  backgroundColor: isCurrent ? '#0a0a0a' : isDone ? '#e8f7f3' : '#f5f5f5',
                  color: isCurrent ? '#ffffff' : isDone ? '#1b7a60' : '#8a8a8a',
                  border: isCurrent
                    ? '1px solid #0a0a0a'
                    : isDone
                    ? '1px solid #a4d4c5'
                    : '1px solid rgba(10, 10, 10, 0.06)',
                }}
              >
                {isDone ? (
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                    check_circle
                  </span>
                ) : isCurrent ? (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '15px', animation: 'spin 1.5s linear infinite' }}
                  >
                    progress_activity
                  </span>
                ) : (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c4c4c4' }} />
                )}
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SKELETON PREVIEW OF DASHBOARD ──────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Top 3 KPI skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid rgba(10, 10, 10, 0.06)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div className="skeleton-shimmer" style={{ width: '40%', height: '14px' }} />
              <div className="skeleton-shimmer" style={{ width: '65%', height: '32px' }} />
              <div className="skeleton-shimmer" style={{ width: '30%', height: '12px' }} />
            </div>
          ))}
        </div>

        {/* Main Chart skeleton */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid rgba(10, 10, 10, 0.06)',
            padding: '28px',
            boxShadow: '0 4px 20px -2px rgba(10, 10, 10, 0.04)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div className="skeleton-shimmer" style={{ width: '220px', height: '20px' }} />
            <div className="skeleton-shimmer" style={{ width: '90px', height: '28px', borderRadius: '8px' }} />
          </div>

          {/* Simulated chart bars waving */}
          <div
            style={{
              height: '220px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '0 12px 16px',
              borderBottom: '1px solid rgba(10, 10, 10, 0.06)',
            }}
          >
            {[45, 75, 55, 90, 65, 80, 50, 85].map((heightPct, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  className="skeleton-shimmer"
                  style={{
                    width: '100%',
                    maxWidth: '48px',
                    height: `${heightPct}%`,
                    borderRadius: '8px 8px 0 0',
                    animation: `p2dBarWave 2.4s infinite ease-in-out ${idx * 0.15}s, p2dShimmer 1.8s infinite ease-in-out`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Bottom axis placeholder */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', padding: '0 12px' }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="skeleton-shimmer" style={{ width: '32px', height: '10px' }} />
            ))}
          </div>
        </div>

        {/* AI Insight Summary skeleton */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid rgba(10, 10, 10, 0.06)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ff4d8b' }}>
              auto_awesome
            </span>
            <div className="skeleton-shimmer" style={{ width: '160px', height: '14px' }} />
          </div>
          <div className="skeleton-shimmer" style={{ width: '100%', height: '14px' }} />
          <div className="skeleton-shimmer" style={{ width: '85%', height: '14px' }} />
          <div className="skeleton-shimmer" style={{ width: '60%', height: '14px' }} />
        </div>
      </div>
    </div>
  );
}