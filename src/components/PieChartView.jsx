import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#ff4d8b', '#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    const isCurrency = data.dataKey && /revenue|price|spent|value|sales|amount/i.test(data.dataKey);
    const displayVal = isCurrency
      ? `$${Number(data.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : Number(data.value).toLocaleString('en-US');

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
        <p style={{ fontWeight: 600, margin: 0, opacity: 0.7 }}>{data.name}</p>
        <p style={{ fontWeight: 800, margin: '2px 0 0', fontSize: '14px', color: '#ff4d8b' }}>
          {displayVal}
        </p>
      </div>
    );
  }
  return null;
}

export default function PieChartView({ title, data, nameKey, valueKey, subtitle }) {
  if (!data || data.length === 0) return null;

  const resolvedNameKey = nameKey || Object.keys(data[0])[0];
  const resolvedValueKey = valueKey || Object.keys(data[0])[1];

  return (
    <div className="bg-white rounded-2xl sm:rounded-[20px] p-4 sm:p-6 md:p-7 border border-black/[0.07] shadow-sm flex flex-col h-full min-h-[320px] sm:min-h-[360px] min-w-0 w-full">
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-bold text-ink m-0 font-display truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-muted m-0 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold text-[#ff4d8b] bg-[#fff1f6] px-2 sm:px-2.5 py-0.5 rounded-full flex-shrink-0">
          Distribution
        </span>
      </div>

      <div className="flex-1 w-full h-[240px] sm:h-[260px] min-h-[220px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={resolvedValueKey}
              nameKey={resolvedNameKey}
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}