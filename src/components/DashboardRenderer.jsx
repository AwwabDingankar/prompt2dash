import { useState } from 'react';
import KpiCard from './KpiCard';
import BarChartView from './BarChartView';
import LineChartView from './LineChartView';
import PieChartView from './PieChartView';
import DataTable from './DataTable';
import EmptyState from './EmptyState';

function renderWidget(chart) {
  const { chart_type, title, x_axis, y_axis, data, error } = chart;

  if (error) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          boxShadow: '0 4px 20px -4px rgba(10,10,10,0.04)',
        }}
      >
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ef4444', margin: '0 0 8px' }}>{title}</h4>
        <p style={{ fontSize: '12px', color: '#6a6a6a', margin: 0 }}>Query could not be rendered: {error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(10,10,10,0.07)',
          boxShadow: '0 4px 20px -4px rgba(10,10,10,0.04)',
          textAlign: 'center',
        }}
      >
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#0a0a0a', margin: '0 0 8px' }}>{title}</h4>
        <p style={{ fontSize: '12px', color: '#8a8a8a', margin: 0 }}>No records returned for this visualization.</p>
      </div>
    );
  }

  switch (chart_type) {
    case 'BarChart':
      return <BarChartView title={title} data={data} xKey={x_axis} yKey={y_axis} />;

    case 'LineChart':
      return <LineChartView title={title} data={data} xKey={x_axis} yKey={y_axis} />;

    case 'PieChart':
      return <PieChartView title={title} data={data} nameKey={x_axis} valueKey={y_axis} />;

    case 'DataTable':
      return <DataTable title={title} data={data} />;

    case 'KpiCard': {
      const raw = data && data[0] ? (data[0].value ?? Object.values(data[0])[0]) : 0;
      return <KpiCard title={title} value={raw} />;
    }

    default:
      return <DataTable title={title} data={data} />;
  }
}

export default function DashboardRenderer({ result }) {
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!result) return null;

  // Multi-chart dashboard layout
  if (result.isMultiChart || (result.charts && result.charts.length > 0)) {
    const { dashboard_title, summary, kpis = [], charts = [] } = result;

    const copySql = (sqlText, idx) => {
      navigator.clipboard.writeText(sqlText);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
        {/* Dashboard Header Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '28px 32px',
            border: '1px solid rgba(10,10,10,0.07)',
            boxShadow: '0 4px 20px -4px rgba(10,10,10,0.04)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: '#0a0a0a',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  letterSpacing: '0.5px',
                }}
              >
                LIVE DASHBOARD
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#10b981',
                  backgroundColor: '#ecfdf5',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {charts.length} Visualizations
              </span>
            </div>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 800,
                color: '#0a0a0a',
                margin: 0,
                letterSpacing: '-0.8px',
                fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
              }}
            >
              {dashboard_title || 'Executive Analytics Overview'}
            </h1>
            {summary && (
              <p
                style={{
                  fontSize: '14px',
                  color: '#5a5a5a',
                  margin: '8px 0 0',
                  lineHeight: 1.6,
                  maxWidth: '820px',
                }}
              >
                {summary}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowSqlModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(10,10,10,0.12)',
                borderRadius: '12px',
                padding: '9px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#0a0a0a',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(10,10,10,0.05)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f2e8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ff4d8b' }}>
                terminal
              </span>
              View SQL ({kpis.length + charts.length})
            </button>
          </div>
        </div>

        {/* Top KPI Cards Row */}
        {kpis.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              width: '100%',
            }}
          >
            {kpis.map((kpi, index) => (
              <KpiCard
                key={kpi.id || `kpi-${index}`}
                title={kpi.title}
                value={kpi.value}
                subtitle={kpi.subtitle}
                format={kpi.format}
              />
            ))}
          </div>
        )}

        {/* Multi-Chart Grid */}
        {charts.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
              gap: '24px',
              width: '100%',
            }}
          >
            {charts.map((chart, index) => {
              const isLineChart = chart.chart_type === 'LineChart';
              const isDataTable = chart.chart_type === 'DataTable';
              const isFull =
                chart.grid_span === 'full' ||
                isLineChart ||
                isDataTable ||
                (charts.length % 2 === 1 && index === charts.length - 1);

              return (
                <div
                  key={chart.id || `chart-${index}`}
                  style={{
                    gridColumn: isFull ? '1 / -1' : 'auto',
                    minWidth: 0,
                    width: '100%',
                  }}
                >
                  {renderWidget(chart)}
                </div>
              );
            })}
          </div>
        )}

        {/* SQL Queries Inspection Modal */}
        {showSqlModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(10,10,10,0.6)',
              backdropFilter: 'blur(6px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setShowSqlModal(false)}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '85vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  padding: '20px 28px',
                  borderBottom: '1px solid rgba(10,10,10,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0a0a0a' }}>
                    Generated PostgreSQL Queries
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6a6a6a', margin: '4px 0 0' }}>
                    Inspect the validated SQL queries executed across PostgreSQL to build this dashboard.
                  </p>
                </div>
                <button
                  onClick={() => setShowSqlModal(false)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(10,10,10,0.05)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(10,10,10,0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(10,10,10,0.05)')}
                >
                  ✕
                </button>
              </div>

              <div style={{ overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* KPIs Queries */}
                {kpis.map((kpi, idx) => (
                  <div key={`kpi-sql-${idx}`} style={{ backgroundColor: '#faf9f5', borderRadius: '14px', padding: '16px', border: '1px solid rgba(10,10,10,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#ff4d8b' }}>KPI: {kpi.title}</span>
                      <button
                        onClick={() => copySql(kpi.sql, `kpi-${idx}`)}
                        style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(10,10,10,0.1)', background: '#fff', cursor: 'pointer' }}
                      >
                        {copiedIndex === `kpi-${idx}` ? 'Copied!' : 'Copy SQL'}
                      </button>
                    </div>
                    <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', color: '#1e293b', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                      {kpi.sql}
                    </pre>
                  </div>
                ))}

                {/* Charts Queries */}
                {charts.map((chart, idx) => (
                  <div key={`chart-sql-${idx}`} style={{ backgroundColor: '#faf9f5', borderRadius: '14px', padding: '16px', border: '1px solid rgba(10,10,10,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>CHART: {chart.title} ({chart.chart_type})</span>
                      <button
                        onClick={() => copySql(chart.sql, `chart-${idx}`)}
                        style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', border: '1px solid rgba(10,10,10,0.1)', background: '#fff', cursor: 'pointer' }}
                      >
                        {copiedIndex === `chart-${idx}` ? 'Copied!' : 'Copy SQL'}
                      </button>
                    </div>
                    <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', color: '#1e293b', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                      {chart.sql}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback: Legacy single chart format
  const { chart_type, title, x_axis, y_axis, data } = result;

  if (!data || data.length === 0) {
    return <EmptyState message="No data found for this query." />;
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      {renderWidget(result)}
    </div>
  );
}