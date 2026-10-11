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
        minHeight: '360px',
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
            color: '#ff4d8b',
            backgroundColor: '#fff1f6',
            padding: '3px 10px',
            borderRadius: '9999px',
          }}
        >
          Distribution
        </span>
      </div>

      <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height={260}>
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