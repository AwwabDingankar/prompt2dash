export default function KpiCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-1">
      <span className="text-sm text-slate-500">{title}</span>
      <span className="text-3xl font-semibold text-blue-600">{value}</span>
      {subtitle && <span className="text-xs text-slate-400">{subtitle}</span>}
    </div>
  );
}