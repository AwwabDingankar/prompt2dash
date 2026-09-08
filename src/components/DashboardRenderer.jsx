import KpiCard from './KpiCard';
import BarChartView from './BarChartView';
import LineChartView from './LineChartView';
import PieChartView from './PieChartView';
import DataTable from './DataTable';
import EmptyState from './EmptyState';

export default function DashboardRenderer({ result }) {
  if (!result) return null;

  const { chart_type, title, x_axis, y_axis, data } = result;

  if (!data || data.length === 0) {
    return <EmptyState message="No data found for this query." />;
  }

  switch (chart_type) {
    case 'BarChart':
      return <BarChartView title={title} data={data} xKey={x_axis} yKey={y_axis} />;

    case 'LineChart':
      return <LineChartView title={title} data={data} xKey={x_axis} yKey={y_axis} />;

    case 'PieChart':
      return <PieChartView title={title} data={data} nameKey={x_axis} valueKey={y_axis} />;

    case 'KpiCard': {
      const value = Object.values(data[0])[0]; // single aggregated value
      return <KpiCard title={title} value={value} />;
    }

    case 'DataTable':
      return <DataTable title={title} data={data} />;

    default:
      return <EmptyState message={`Unsupported chart type: ${chart_type}`} />;
  }
}