function formatCell(val, colName) {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'number') {
    if (/revenue|price|spent|total_revenue|amount/i.test(colName)) {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return val.toLocaleString('en-US');
  }
  return String(val);
}

export default function DataTable({ title, data, subtitle }) {
  if (!data || data.length === 0) return null;
  const columns = Object.keys(data[0]);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px 28px',
        border: '1px solid rgba(10,10,10,0.07)',
        boxShadow: '0 4px 20px -4px rgba(10,10,10,0.04)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0a0a0a',
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontSize: '12px', color: '#8a8a8a', margin: '4px 0 0' }}>{subtitle}</p>
          )}
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#6366f1',
            backgroundColor: '#eef2ff',
            padding: '3px 10px',
            borderRadius: '9999px',
          }}
        >
          {data.length} records
        </span>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(10,10,10,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#faf9f5', borderBottom: '1px solid rgba(10,10,10,0.08)' }}>
              {columns.map((col) => {
                const isNumeric = typeof data[0][col] === 'number';
                return (
                  <th
                    key={col}
                    style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#6a6a6a',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      textAlign: isNumeric ? 'right' : 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.replace(/_/g, ' ')}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: i < data.length - 1 ? '1px solid rgba(10,10,10,0.05)' : 'none',
                  backgroundColor: i % 2 === 0 ? '#ffffff' : '#fdfbf7',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f0e4')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#fdfbf7')
                }
              >
                {columns.map((col) => {
                  const val = row[col];
                  const isNumeric = typeof val === 'number';
                  const isCategory = col.toLowerCase() === 'category' || col.toLowerCase() === 'region';

                  return (
                    <td
                      key={col}
                      style={{
                        padding: '12px 16px',
                        color: '#1a1a1a',
                        fontWeight: isNumeric ? 600 : 500,
                        textAlign: isNumeric ? 'right' : 'left',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isCategory ? (
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: 'rgba(10,10,10,0.04)',
                            color: '#2a2a2a',
                          }}
                        >
                          {val}
                        </span>
                      ) : (
                        formatCell(val, col)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}