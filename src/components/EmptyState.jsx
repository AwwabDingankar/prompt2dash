export default function EmptyState({ message = "No data found for this query." }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-10 text-center">
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}