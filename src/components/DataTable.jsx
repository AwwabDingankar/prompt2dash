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
    <div className="bg-white rounded-2xl sm:rounded-[20px] p-4 sm:p-6 md:p-7 border border-black/[0.07] shadow-sm flex flex-col h-full min-w-0 w-full">
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-bold text-ink m-0 font-display truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-muted m-0 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {columns.length > 3 && (
            <span className="sm:hidden text-[10px] text-muted font-medium flex items-center gap-0.5">
              <span>Scroll</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </span>
          )}
          <span className="text-[10px] sm:text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 sm:px-2.5 py-0.5 rounded-full flex-shrink-0">
            {data.length} records
          </span>
        </div>
      </div>

      <div
        className="overflow-x-auto rounded-xl border border-black/[0.06] w-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <table className="w-full border-collapse text-xs sm:text-[13px] text-left">
          <thead>
            <tr style={{ backgroundColor: '#faf9f5', borderBottom: '1px solid rgba(10,10,10,0.08)' }}>
              {columns.map((col) => {
                const isNumeric = typeof data[0][col] === 'number';
                return (
                  <th
                    key={col}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-muted text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap"
                    style={{
                      textAlign: isNumeric ? 'right' : 'left',
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