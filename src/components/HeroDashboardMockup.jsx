import { useState } from 'react';

const MONTH_DATA = [
  { month: 'May', starter: 32, growth: 55, enterprise: 85, total: '$172K' },
  { month: 'Jun', starter: 40, growth: 68, enterprise: 110, total: '$218K' },
  { month: 'Jul', starter: 38, growth: 72, enterprise: 125, total: '$235K' },
  { month: 'Aug', starter: 48, growth: 85, enterprise: 148, total: '$281K' },
  { month: 'Sep', starter: 52, growth: 96, enterprise: 168, total: '$316K' },
  { month: 'Oct', starter: 60, growth: 112, enterprise: 195, total: '$367K' },
];

export default function HeroDashboardMockup({ onGetStarted }) {
  const [activeMonth, setActiveMonth] = useState('Oct');
  const activeData = MONTH_DATA.find((m) => m.month === activeMonth) || MONTH_DATA[5];

  return (
    <div className="relative group order-2 md:order-none px-2 md:px-0 w-full max-w-[620px] mx-auto">
      {/* Outer Clay Card Container with floating animation */}
      <div
        className="relative rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-5 animate-float transition-all duration-500"
        style={{
          background: '#ffffff',
          boxShadow: 'rgba(255,255,255,0.8) 0px 2px 4px inset, rgba(0,0,0,0.06) 0px 12px 28px, rgba(0,0,0,0.12) 0px 32px 64px -8px',
          border: '1px solid rgba(10,10,10,0.06)',
        }}
      >
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.06] px-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block" />
            <span className="text-[11px] font-semibold text-black/40 ml-2 tracking-tight hidden sm:inline">
              Prompt2Dash · Executive Analytics
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10b981] bg-[#e8f7f3] px-2 py-0.5 rounded-full border border-[#a4d4c5]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Live Postgres
            </span>
            <span className="text-[11px] text-black/50 font-medium hidden sm:inline">Q3 Review</span>
          </div>
        </div>

        {/* AI Prompt Command Bar */}
        <div className="bg-[#fffaf0] rounded-xl p-2.5 mb-3.5 border border-black/[0.06] flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-xs flex-shrink-0">
              <span className="material-symbols-outlined text-[15px] text-[#ff4d8b]">auto_awesome</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-[12px] font-semibold text-ink truncate leading-tight">
                "Show monthly revenue trend & breakdown by plan"
              </p>
              <p className="text-[9px] sm:text-[10px] text-muted leading-none mt-0.5">
                Generated 3 charts + SQL query in 0.28s
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-white bg-ink px-2 py-1 rounded-md flex-shrink-0">
            SQL
          </span>
        </div>

        {/* Top 3 KPI Cards */}
        <div className="grid grid-cols-3 gap-2 mb-3.5">
          {/* KPI 1 */}
          <div className="bg-[#fdfbf7] p-2.5 rounded-xl border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted font-medium">Total ARR</span>
              <span className="text-[9px] font-bold text-[#10b981] bg-[#e8f7f3] px-1 rounded">+28%</span>
            </div>
            <div className="text-[14px] sm:text-[16px] font-extrabold text-ink tracking-tight font-display">
              $1.24M
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-[#fdfbf7] p-2.5 rounded-xl border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted font-medium">Customers</span>
              <span className="text-[9px] font-bold text-[#10b981] bg-[#e8f7f3] px-1 rounded">+14%</span>
            </div>
            <div className="text-[14px] sm:text-[16px] font-extrabold text-ink tracking-tight font-display">
              14,820
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-[#fdfbf7] p-2.5 rounded-xl border border-black/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted font-medium">Avg Deal</span>
              <span className="text-[9px] font-bold text-[#10b981] bg-[#e8f7f3] px-1 rounded">+9%</span>
            </div>
            <div className="text-[14px] sm:text-[16px] font-extrabold text-ink tracking-tight font-display">
              $84.2K
            </div>
          </div>
        </div>

        {/* Main Interactive Chart Card */}
        <div className="bg-[#ffffff] p-3 rounded-2xl border border-black/[0.06] shadow-sm mb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-[12px] font-bold text-ink">Revenue Velocity by Plan</h4>
              <p className="text-[10px] text-muted">Hover month to inspect performance</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-ink" /> Enterprise
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ff4d8b]" /> Growth
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#a4d4c5]" /> Starter
              </span>
            </div>
          </div>

          {/* Chart Columns */}
          <div className="h-36 sm:h-40 flex items-end justify-between gap-1.5 sm:gap-2.5 pt-4 pb-1 border-b border-black/[0.05]">
            {MONTH_DATA.map((item) => {
              const isSelected = item.month === activeMonth;
              return (
                <div
                  key={item.month}
                  onClick={() => setActiveMonth(item.month)}
                  onMouseEnter={() => setActiveMonth(item.month)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group/bar relative"
                >
                  {/* Tooltip on active */}
                  {isSelected && (
                    <div className="absolute -top-7 bg-ink text-white text-[9px] font-bold py-0.5 px-1.5 rounded shadow-md whitespace-nowrap z-20 animate-fadeIn">
                      {item.month}: {item.total}
                    </div>
                  )}

                  {/* Stacked Bar */}
                  <div
                    className={`w-full max-w-[32px] flex flex-col justify-end rounded-t-md overflow-hidden transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-ink ring-offset-1 scale-[1.03]' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    {/* Enterprise segment */}
                    <div
                      style={{ height: `${item.enterprise * 0.42}px` }}
                      className="bg-ink w-full transition-all duration-500"
                    />
                    {/* Growth segment */}
                    <div
                      style={{ height: `${item.growth * 0.35}px` }}
                      className="bg-[#ff4d8b] w-full transition-all duration-500"
                    />
                    {/* Starter segment */}
                    <div
                      style={{ height: `${item.starter * 0.3}px` }}
                      className="bg-[#a4d4c5] w-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Month Labels */}
          <div className="flex justify-between mt-1.5 px-1">
            {MONTH_DATA.map((item) => (
              <span
                key={item.month}
                onClick={() => setActiveMonth(item.month)}
                className={`text-[10px] cursor-pointer font-medium transition-colors ${
                  item.month === activeMonth ? 'text-ink font-bold' : 'text-muted hover:text-ink'
                }`}
              >
                {item.month}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Regional Distribution Bar */}
        <div className="bg-[#fdfbf7] p-2.5 rounded-xl border border-black/[0.04]">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-ink">Regional Contribution</span>
            <span className="text-[10px] text-muted">
              {activeMonth} peak: <strong className="text-ink">{activeData.total}</strong>
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/[0.06] overflow-hidden flex">
            <div style={{ width: '48%' }} className="bg-ink h-full" title="North America: 48%" />
            <div style={{ width: '32%' }} className="bg-[#ff4d8b] h-full" title="Europe: 32%" />
            <div style={{ width: '20%' }} className="bg-[#a4d4c5] h-full" title="Asia-Pacific: 20%" />
          </div>

          <div className="flex justify-between items-center text-[9px] text-muted mt-1.5">
            <span>● North America (48%)</span>
            <span>● Europe (32%)</span>
            <span>● Asia-Pac (20%)</span>
          </div>
        </div>

        {/* Floating AI Analyst Card (Preserved from Stitch placement with functional link) */}
        <div
          onClick={onGetStarted}
          className="absolute -bottom-6 md:-bottom-8 -left-3 md:-left-8 p-3 md:p-4 rounded-2xl max-w-[260px] md:max-w-xs transition-all duration-300 cursor-pointer hover:scale-105 group/analyst z-30"
          style={{
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(10, 10, 10, 0.08)',
            boxShadow: '0 20px 40px -8px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#a4d4c5] flex items-center justify-center text-ink shadow-xs">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              </div>
              <span className="text-[11px] font-bold text-ink">AI Analyst</span>
            </div>
            <span className="text-[9px] font-bold text-[#ff4d8b] group-hover/analyst:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Try it →
            </span>
          </div>

          <p className="text-[10px] md:text-[11px] text-muted leading-relaxed">
            "Enterprise plan revenue surged 38% after Q3 pricing updates. Top driver: North America region."
          </p>
        </div>
      </div>
    </div>
  );
}
