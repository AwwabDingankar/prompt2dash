/** ExampleDashboardCard — Preview card with mini bar chart */
import Icon from './Icon';

export default function ExampleDashboardCard({
  icon = 'trending-up',
  prompt = 'Monthly sales trend',
  title = 'Sales performance',
  stat = '+18.2%',
  statLabel = 'vs last quarter',
  bars = [38, 55, 44, 66, 58, 80, 72, 94],
  accent = false,
  onSelect,
}) {
  return (
    <div className="bg-background border border-border rounded-xl p-5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] hover:shadow-[0_4px_16px_-4px_rgba(37,99,235,0.15)] hover:border-primary/30 transition-all cursor-pointer group">
      {/* Prompt label */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <Icon i={icon} size={13} color="#2563eb" />
        <span className="truncate italic">"{prompt}"</span>
      </div>

      {/* Title + stat */}
      <div className="flex items-end justify-between mt-4">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <div className="text-right">
          <span className="text-sm font-semibold text-foreground">{stat}</span>
          <p className="text-[11px] text-muted-foreground">{statLabel}</p>
        </div>
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end gap-1.5 h-[96px] mt-3 rounded-lg bg-input border border-border p-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-all ${
              i === bars.length - 2 && accent
                ? 'bg-primary'
                : i > bars.length - 4
                ? 'bg-accent-soft'
                : 'bg-border'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect?.(prompt)}
        className="w-full mt-4 text-sm font-medium text-secondary-foreground bg-secondary rounded-md py-2 hover:bg-secondary/80 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
      >
        Try this prompt
      </button>
    </div>
  );
}
