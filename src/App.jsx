import KpiCard from './components/KpiCard';
import BarChartView from './components/BarChartView';
import LineChartView from './components/LineChartView';
import DataTable from './components/DataTable';
import PieChartView from './components/PieChartView';
import EmptyState from './components/EmptyState';

const barData = [
  { region: 'North', revenue: 5000 },
  { region: 'South', revenue: 3200 },
  { region: 'East', revenue: 4100 },
    { region: "West", revenue: 9400 },
  { region: "Central", revenue: 7430 },
];

const lineData = [
 { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 4700 },
  { month: "May", sales: 6200 },
  { month: "Jun", sales: 5900 },
  { month: "Jul", sales: 6800 },
];

const tableData = [
  { product: "Wireless Mouse", units: 320, revenue: "$6,400" },
  { product: "Bluetooth Speaker", units: 210, revenue: "$8,400" },
  { product: "USB-C Cable", units: 540, revenue: "$2,700" },
  { product: "Laptop Stand", units: 150, revenue: "$4,500" },
  { product: "Mechanical Keyboard", units: 95, revenue: "$7,125" },
];

const pieData = [
  { category: "Electronics", value: 15400 },
  { category: "Clothing", value: 9800 },
  { category: "Home & Kitchen", value: 7200 },
  { category: "Books", value: 4100 },
  { category: "Sports", value: 3600 },
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
        <PieChartView title="Revenue by Category" data={pieData} nameKey="category" valueKey="value" />
        <DataTable title="Top Products" data={tableData} />
        <EmptyState />
      </div>
    </div>
  );
}

export default App;