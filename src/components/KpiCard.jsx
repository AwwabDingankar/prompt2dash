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
      className="bg-white rounded-2xl sm:rounded-[20px] p-3.5 sm:p-5 md:p-6 border border-black/[0.07] shadow-sm flex flex-col justify-between transition-all relative overflow-hidden min-w-0"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(10,10,10,0.08), 0 2px 6px rgba(10,10,10,0.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(10,10,10,0.04), 0 1px 3px rgba(10,10,10,0.02)';
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-wider font-display truncate">
          {title}
        </span>
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#fff1f6] text-[#ff4d8b] flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-ink tracking-tight font-display leading-tight truncate">
          {formattedValue}
        </div>
        {subtitle && (
          <div className="text-[10px] sm:text-xs text-muted mt-1 font-medium flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="truncate">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}