import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const isCurrency = payload[0].dataKey && /revenue|price|spent|value|sales|amount/i.test(payload[0].dataKey);
    const displayVal = isCurrency
      ? `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : Number(val).toLocaleString('en-US');

    return (
      <div
        style={{
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          borderRadius: '10px',
          padding: '8px 14px',
          fontSize: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <p style={{ fontWeight: 600, margin: 0, opacity: 0.7 }}>{label}</p>
        <p style={{ fontWeight: 800, margin: '2px 0 0', fontSize: '14px', color: '#10b981' }}>
          {displayVal}
        </p>
      </div>
    );
  }
  return null;
}

export default function LineChartView({ title, data, xKey, yKey, subtitle }) {
  if (!data || data.length === 0) return null;

  const resolvedXKey = xKey || Object.keys(data[0])[0];
  const resolvedYKey = yKey || Object.keys(data[0])[1];

  return (
    <div className="bg-white rounded-2xl sm:rounded-[20px] p-4 sm:p-6 md:p-7 border border-black/[0.07] shadow-sm flex flex-col h-full min-h-[320px] sm:min-h-[380px] min-w-0 w-full">
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-5 flex-wrap">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-bold text-ink m-0 font-display truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-muted m-0 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full flex-shrink-0">
          Trend Line
        </span>
      </div>

      <div className="w-full h-[240px] sm:h-[300px] min-w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="lineColorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey={resolvedXKey}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tick={{ fill: '#64748b' }}
              padding={{ left: 24, right: 24 }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              width={65}
              tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={resolvedYKey}
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#lineColorGrad)"
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}