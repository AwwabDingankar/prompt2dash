import KpiCard from './components/KpiCard';
import BarChartView from './components/BarChartView';
import LineChartView from './components/LineChartView';
import PieChartView from './components/PieChartView';
import DataTable from './components/DataTable';
import EmptyState from './components/EmptyState';

const kpiData = [
  { title: "Total Revenue", value: "$48,230", subtitle: "This quarter", icon: "revenue" },
  { title: "Total Orders", value: "1,284", subtitle: "Last 30 days", icon: "orders" },
  { title: "Avg Order Value", value: "$37.55", subtitle: "This month", icon: "average" },
  { title: "Active Customers", value: "892", subtitle: "This quarter", icon: "customers" },
];

const barData = [
  { region: "North", revenue: 12500 },
  { region: "South", revenue: 8700 },
  { region: "East", revenue: 10200 },
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

const pieData = [
  { category: "Electronics", value: 15400 },
  { category: "Clothing", value: 9800 },
  { category: "Home & Kitchen", value: 7200 },
  { category: "Books", value: 4100 },
  { category: "Sports", value: 3600 },
];

const tableData = [
  { product: "Wireless Mouse", units: 320, revenue: "$6,400" },
  { product: "Bluetooth Speaker", units: 210, revenue: "$8,400" },
  { product: "USB-C Cable", units: 540, revenue: "$2,700" },
  { product: "Laptop Stand", units: 150, revenue: "$4,500" },
  { product: "Mechanical Keyboard", units: 95, revenue: "$7,125" },
];

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Prompt2Dash</h1>
          <p className="text-sm text-slate-500">Ask a question, get an instant dashboard</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, i) => (
          <KpiCard key={i} title={kpi.title} value={kpi.value} subtitle={kpi.subtitle} icon={kpi.icon} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <BarChartView title="Revenue by Region" data={barData} xKey="region" yKey="revenue" />
        <LineChartView title="Sales Trend" data={lineData} xKey="month" yKey="sales" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <PieChartView title="Revenue by Category" data={pieData} nameKey="category" valueKey="value" />
        <DataTable title="Top Products" data={tableData} />
      </div>

      <EmptyState message="Try asking: 'Show me sales trend for last 6 months'" />
    </div>
  );
}

export default App;