import KpiCard from './components/KpiCard';
import BarChartView from './components/BarChartView';
import LineChartView from './components/LineChartView';

const barData = [
  { region: 'North', revenue: 5000 },
  { region: 'South', revenue: 3200 },
  { region: 'East', revenue: 4100 },
];

const lineData = [
  { month: 'Jan', sales: 200 },
  { month: 'Feb', sales: 350 },
  { month: 'Mar', sales: 280 },
];

function App() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Prompt2Dash</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard title="Total Revenue" value="$12,300" subtitle="This quarter" />
        <KpiCard title="Orders" value="342" />
        <KpiCard title="Avg Order Value" value="$36" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarChartView title="Revenue by Region" data={barData} xKey="region" yKey="revenue" />
        <LineChartView title="Sales Trend" data={lineData} xKey="month" yKey="sales" />
      </div>
    </div>
  );
}

export default App;