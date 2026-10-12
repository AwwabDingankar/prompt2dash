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

  // Normalize chart_type (support case-insensitive and aliases)
  const norm = (chart_type || '').toLowerCase().replace(/[^a-z]/g, '');
  let resolvedType = null;

  if (norm === 'barchart' || norm === 'bar' || norm === 'columnchart') {
    resolvedType = 'BarChart';
  } else if (norm === 'linechart' || norm === 'line' || norm === 'areachart') {
    resolvedType = 'LineChart';
  } else if (norm === 'piechart' || norm === 'pie' || norm === 'donut' || norm === 'donutchart') {
    resolvedType = 'PieChart';
  } else if (norm === 'kpicard' || norm === 'kpi') {
    resolvedType = 'KpiCard';
  } else if (norm === 'datatable' || norm === 'table') {
    resolvedType = 'DataTable';
  }

  // If chart_type is unspecified or defaulted to table, but x_axis & y_axis exist with data, infer the best visual chart
  if (!resolvedType || (resolvedType === 'DataTable' && !chart_type)) {
    if (x_axis && y_axis && data.length > 0) {
      const firstRowX = String(data[0][x_axis] || '');
      const isDate =
        /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}-\d{2}|\d{2}\/\d{2})/i.test(firstRowX) ||
        /date|month|year|day|time|period|quarter/i.test(x_axis);
      if (isDate) {
        resolvedType = 'LineChart';
      } else if (data.length <= 6) {
        resolvedType = 'PieChart';
      } else {
        resolvedType = 'BarChart';
      }
    } else {
      resolvedType = 'DataTable';
    }
  }

  switch (resolvedType) {
    case 'BarChart':
      return <BarChartView title={title} data={data} xKey={x_axis} yKey={y_axis} />;

    case 'LineChart':
      return <LineChartView title={title} data={data} xKey={x_axis} yKey={y_axis} />;

    case 'PieChart':
      return <PieChartView title={title} data={data} nameKey={x_axis} valueKey={y_axis} />;

    case 'KpiCard': {
      const raw = data && data[0] ? (data[0].value ?? Object.values(data[0])[0]) : 0;
      return <KpiCard title={title} value={raw} />;
    }

    case 'DataTable':
    default:
      return <DataTable title={title} data={data} />;
  }
}

export default function DashboardRenderer({ result }) {
  if (!result) return null;

  // Multi-chart dashboard layout
  if (result.isMultiChart || (result.charts && result.charts.length > 0)) {
    const { dashboard_title, summary, kpis = [], charts = [] } = result;

    return (
      <div className="flex flex-col gap-4 sm:gap-8 w-full">
        {/* Dashboard Header Bar */}
        <div className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-7 md:p-8 border border-black/[0.07] shadow-sm flex flex-col md:flex-row justify-between items-start gap-3 sm:gap-6 flex-wrap">
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-bold text-white bg-ink px-2 sm:px-2.5 py-0.5 rounded-full tracking-wider">
                LIVE DASHBOARD
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {charts.length} Visualizations
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-ink m-0 tracking-tight font-display leading-tight">
              {dashboard_title || 'Executive Analytics Overview'}
            </h1>
            {summary && (
              <p className="text-xs sm:text-sm text-[#5a5a5a] mt-2 leading-relaxed max-w-[820px]">
                {summary}
              </p>
            )}
          </div>
        </div>

        {/* Top KPI Cards Row */}
        {kpis.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full">
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

        {/* Multi-Chart Grid (1 column on mobile, 2 columns on large screens) */}
        {charts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
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
                  className={`${isFull ? 'col-span-1 lg:col-span-2' : 'col-span-1'} min-w-0 w-full`}
                >
                  {renderWidget(chart)}
                </div>
              );
            })}
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