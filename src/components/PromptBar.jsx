/** PromptBar — Centerpiece natural language input */
import Icon from './Icon';

export default function PromptBar({ value = '', onChange, onSubmit, loading = false }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
  }

  return (
    <div className="w-full max-w-[760px] mx-auto">
      <div className="bg-background border border-border rounded-xl p-2 pl-5 flex items-center gap-3 shadow-[0_8px_30px_-12px_rgba(37,99,235,0.25),0_1px_3px_rgba(15,23,42,0.08)]">
        <Icon i="sparkles" size={20} color="#2563eb" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base text-foreground font-normal bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder:text-muted-foreground"
          style={{ outline: 'none', boxShadow: 'none' }}
          disabled={loading}
        />
        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="bg-primary text-primary-foreground text-sm font-medium px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating…' : 'Generate'}
          {!loading && <Icon i="arrow-right" size={16} color="#ffffff" />}
        </button>
      </div>

      {/* Sub-labels */}
      <div className="flex items-center justify-center gap-5 mt-3.5 text-xs text-muted-foreground font-medium">
        <div className="flex items-center gap-1.5">
          <Icon i="database" size={13} />
          <span>Connected: Postgres · prod_analytics</span>
        </div>
      </div>
    </div>
  );
}
