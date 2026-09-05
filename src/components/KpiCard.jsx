import { TrendingUp, ShoppingCart, DollarSign, Users } from 'lucide-react';

const icons = {
  revenue: DollarSign,
  orders: ShoppingCart,
  average: TrendingUp,
  customers: Users,
};

export default function KpiCard({ title, value, subtitle, icon = "revenue" }) {
  const Icon = icons[icon] || DollarSign;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-slate-500">{title}</span>
        <span className="text-3xl font-semibold text-slate-900">{value}</span>
        {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
      </div>
      <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg">
        <Icon size={20} />
      </div>
    </div>
  );
}