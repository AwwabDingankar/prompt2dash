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
    <div className="relative group order-2 md:order-none px-0 w-full max-w-full md:max-w-[620px] mx-auto overflow-hidden">
      {/* Outer Clay Card Container */}
      <div
        className="relative rounded-[1.25rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-2.5 sm:p-4 md:p-5 animate-float transition-all duration-500 w-full max-w-full box-border scale-95 xs:scale-100 md:scale-100 origin-top"
        style={{
          background: '#ffffff',
          boxShadow: 'rgba(255,255,255,0.9) 0px 2px 4px inset, rgba(0,0,0,0.05) 0px 10px 24px, rgba(0,0,0,0.1) 0px 24px 48px -6px',
          border: '1px solid rgba(10,10,10,0.06)',
        }}
      >
        {/* Window Chrome Header - hidden on mobile, visible on desktop */}
        <div className="hidden md:flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-black/[0.06] px-1 sm:px-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block" />
            <span className="text-[11px] font-semibold text-black/50 ml-2 tracking-tight">
              Prompt2Dash · Executive Analytics
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10b981] bg-[#e8f7f3] px-2 py-0.5 rounded-full border border-[#a4d4c5]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Live Connected
            </span>
          </div>
        </div>

        {/* AI Prompt Command Bar - hidden on mobile, visible on desktop */}
        <div className="hidden md:flex bg-[#fffaf0] rounded-xl p-2 sm:p-2.5 mb-2 sm:mb-3 border border-black/[0.06] items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-2xs flex-shrink-0">
              <span className="material-symbols-outlined text-[15px] text-[#ff4d8b]">auto_awesome</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-[12px] font-semibold text-ink truncate leading-tight">
                "Show monthly revenue trend & breakdown by plan"
              </p>
              <p className="text-[9px] sm:text-[10px] text-muted leading-none mt-0.5">
                Generated in 0.28s
              </p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold text-white bg-ink px-2 py-0.5 sm:py-1 rounded-md flex-shrink-0">
            SQL
          </span>
        </div>

        {/* KPI Cards: Primary stat on mobile, all 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          {/* KPI 1 - Primary stat visible on mobile and desktop */}
          <div className="bg-[#fdfbf7] p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-black/[0.04]">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1 gap-1">
              <span className="text-[9px] sm:text-[10px] text-muted font-medium truncate">Total ARR</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#10b981] bg-[#e8f7f3] px-1 rounded flex-shrink-0">+28%</span>
            </div>
            <div className="text-[14px] sm:text-[16px] font-extrabold text-ink tracking-tight font-display">
              $1.24M
            </div>
          </div>

          {/* KPI 2 - Secondary stat hidden on mobile, visible on desktop */}
          <div className="hidden md:block bg-[#fdfbf7] p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-black/[0.04]">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1 gap-1">
              <span className="text-[9px] sm:text-[10px] text-muted font-medium truncate">Customers</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#10b981] bg-[#e8f7f3] px-1 rounded flex-shrink-0">+14%</span>
            </div>
            <div className="text-[13px] sm:text-[16px] font-extrabold text-ink tracking-tight font-display">
              14,820
            </div>
          </div>

          {/* KPI 3 - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block bg-[#fdfbf7] p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-black/[0.04]">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1 gap-1">
              <span className="text-[9px] sm:text-[10px] text-muted font-medium truncate">Avg Deal</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#10b981] bg-[#e8f7f3] px-1 rounded flex-shrink-0">+9%</span>
            </div>
            <div className="text-[13px] sm:text-[16px] font-extrabold text-ink tracking-tight font-display">
              $84.2K
            </div>
          </div>
        </div>

        {/* Main Interactive Chart Card */}
        <div className="bg-[#ffffff] p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-black/[0.06] shadow-2xs">
          <div className="flex items-center justify-between mb-1 sm:mb-2 flex-wrap gap-1">
            <div>
              <h4 className="text-[11px] sm:text-[12px] font-bold text-ink">Revenue Velocity by Plan</h4>
              <p className="text-[9px] sm:text-[10px] text-muted">Tap month to inspect</p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-muted">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ink" /> Enterprise
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d8b]" /> Growth
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a4d4c5]" /> Starter
              </span>
            </div>
          </div>

          {/* Chart Columns: Only 4 bars on mobile (Jul-Oct), all 6 on desktop */}
          <div className="h-24 sm:h-36 md:h-40 flex items-end justify-between gap-1.5 sm:gap-2.5 pt-3 pb-1 border-b border-black/[0.05]">
            {MONTH_DATA.map((item, idx) => {
              const isSelected = item.month === activeMonth;
              return (
                <div
                  key={item.month}
                  onClick={() => setActiveMonth(item.month)}
                  onMouseEnter={() => setActiveMonth(item.month)}
                  className={`${idx < 2 ? 'hidden sm:flex' : 'flex'} flex-1 flex-col items-center h-full justify-end cursor-pointer group/bar relative`}
                >
                  {/* Tooltip on active */}
                  {isSelected && (
                    <div className={`absolute -top-6 ${item.month === 'Oct' ? 'right-0' : 'left-1/2 -translate-x-1/2'} bg-ink text-white text-[8px] sm:text-[9px] font-bold py-0.5 px-1.5 rounded shadow-md whitespace-nowrap z-20 animate-fadeIn pointer-events-none`}>
                      {item.month}: {item.total}
                    </div>
                  )}

                  {/* Stacked Bar */}
                  <div
                    className={`w-full max-w-[28px] sm:max-w-[32px] flex flex-col justify-end rounded-t-md overflow-hidden transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-ink ring-offset-1 scale-[1.03]' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    {/* Enterprise segment */}
                    <div
                      style={{ height: `${item.enterprise * 0.28}px` }}
                      className="bg-ink w-full transition-all duration-500"
                    />
                    {/* Growth segment */}
                    <div
                      style={{ height: `${item.growth * 0.24}px` }}
                      className="bg-[#ff4d8b] w-full transition-all duration-500"
                    />
                    {/* Starter segment */}
                    <div
                      style={{ height: `${item.starter * 0.20}px` }}
                      className="bg-[#a4d4c5] w-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Month Labels: 4 on mobile, 6 on desktop */}
          <div className="flex justify-between mt-1 px-1">
            {MONTH_DATA.map((item, idx) => (
              <span
                key={item.month}
                onClick={() => setActiveMonth(item.month)}
                className={`${idx < 2 ? 'hidden sm:inline' : 'inline'} text-[9px] sm:text-[10px] cursor-pointer font-medium transition-colors ${
                  item.month === activeMonth ? 'text-ink font-bold' : 'text-muted hover:text-ink'
                }`}
              >
                {item.month}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Regional Distribution Bar - hidden on mobile to fit easily without scrolling */}
        <div className="hidden sm:block mt-2.5 bg-[#fdfbf7] p-2.5 rounded-xl border border-black/[0.04]">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1">
            <span className="font-semibold text-ink">Regional Contribution</span>
            <span className="text-[9px] sm:text-[10px] text-muted">
              {activeMonth} peak: <strong className="text-ink">{activeData.total}</strong>
            </span>
          </div>

          <div className="w-full h-1.5 sm:h-2 rounded-full bg-black/[0.06] overflow-hidden flex">
            <div style={{ width: '48%' }} className="bg-ink h-full" title="North America: 48%" />
            <div style={{ width: '32%' }} className="bg-[#ff4d8b] h-full" title="Europe: 32%" />
            <div style={{ width: '20%' }} className="bg-[#a4d4c5] h-full" title="Asia-Pacific: 20%" />
          </div>

          <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-muted mt-1">
            <span>● North America (48%)</span>
            <span>● Europe (32%)</span>
            <span>● Asia-Pac (20%)</span>
          </div>
        </div>

        {/* Desktop Floating AI Analyst Card (Preserved original floating glass card) */}
        <div
          onClick={onGetStarted}
          className="hidden md:block absolute -bottom-8 -left-8 p-4 rounded-2xl max-w-xs transition-all duration-300 cursor-pointer hover:scale-105 group/analyst z-30"
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

          <p className="text-[11px] text-muted leading-relaxed">
            "Enterprise plan revenue surged 38% after Q3 pricing updates. Top driver: North America region."
          </p>
        </div>
      </div>
    </div>
  );
}
