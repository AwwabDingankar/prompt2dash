/** EmptyState — Error / No Data state matching Stitch design */
export default function EmptyState({ message, onReset }) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(10, 10, 10, 0.08)',
        borderRadius: '24px',
        padding: '56px 32px',
        textAlign: 'center',
        boxShadow: '0 8px 32px -8px rgba(10, 10, 10, 0.06)',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '18px',
          backgroundColor: '#fff2f6',
          border: '1px solid rgba(255, 77, 139, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#ff4d8b' }}>
          help_outline
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          color: '#0a0a0a',
          margin: '0 0 10px',
        }}
      >
        Could not generate dashboard
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: '#6a6a6a',
          lineHeight: 1.6,
          maxWidth: '440px',
          margin: '0 auto 24px',
        }}
      >
        {message || 'No data was returned for this query. Try rephrasing or asking for a specific metric.'}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            refresh
          </span>
          Try another question
        </button>
      )}
    </div>
  );
}