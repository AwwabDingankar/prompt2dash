import { TrendingUp, ShoppingCart, DollarSign, Users, Award, BarChart3 } from 'lucide-react';

function formatVal(value, format, title = '') {
  if (value === null || value === undefined) return '—';
  const num = typeof value === 'number' ? value : Number(value);
  const isCurrency = format === 'currency' || /revenue|price|spent|value|sales|amount/i.test(title);
  const isPercent = format === 'percentage' || /percent|rate|share|margin/i.test(title);

  if (!isNaN(num)) {
    if (isCurrency) {
      return `$${num.toLocaleString('en-US', { minimumFractionDigits: num % 1 !== 0 ? 2 : 0, maximumFractionDigits: 2 })}`;
    }
    if (isPercent) {
      return `${num}%`;
    }
    return num.toLocaleString('en-US');
  }
  return String(value);
}

function getIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('revenue') || t.includes('sales') || t.includes('amount') || t.includes('price')) return DollarSign;
  if (t.includes('order') || t.includes('unit') || t.includes('cart') || t.includes('volume')) return ShoppingCart;
  if (t.includes('customer') || t.includes('user') || t.includes('client')) return Users;
  if (t.includes('avg') || t.includes('growth') || t.includes('trend')) return TrendingUp;
  if (t.includes('top') || t.includes('best')) return Award;
  return BarChart3;
}

export default function KpiCard({ title, value, subtitle, format, icon }) {
  const Icon = icon ? getIcon(icon) : getIcon(title);
  const formattedValue = formatVal(value, format, title);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '22px 24px',
        border: '1px solid rgba(10,10,10,0.07)',
        boxShadow: '0 4px 20px -4px rgba(10,10,10,0.04), 0 1px 3px rgba(10,10,10,0.02)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(10,10,10,0.08), 0 2px 6px rgba(10,10,10,0.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(10,10,10,0.04), 0 1px 3px rgba(10,10,10,0.02)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6a6a6a',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
          }}
        >
          {title}
        </span>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#fff1f6',
            color: '#ff4d8b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#0a0a0a',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
          }}
        >
          {formattedValue}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: '12px',
              color: '#9a9a9a',
              marginTop: '6px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}