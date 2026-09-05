export default function DataTable({ title, data }) {
  if (!data || data.length === 0) return null;
  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-x-auto">
      <h3 className="text-sm font-medium text-slate-600 mb-4">{title}</h3>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500">
            {columns.map(col => (
              <th key={col} className="py-2 px-3 font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 text-slate-700">
              {columns.map(col => (
                <td key={col} className="py-2 px-3">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}