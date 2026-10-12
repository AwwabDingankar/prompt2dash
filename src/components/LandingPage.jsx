import { useEffect, useState } from 'react';
import HeroDashboardMockup from './HeroDashboardMockup';
import ContactModal from './ContactModal';

/**
 * LandingPage — rendered from the Stitch "Intelligent AI Dashboard Builder" design.
 * Supports both Desktop and Mobile layouts (fully responsive).
 * Login screen excluded as requested.
 */
export default function LandingPage({ onGetStarted }) {
  // Inject Tailwind CDN + Google Fonts + Material Symbols into <head> once
  useEffect(() => {
    const ids = ['stitch-tailwind', 'stitch-fonts', 'stitch-icons'];

    const scripts = [
      { id: ids[0], tag: 'script', src: 'https://cdn.tailwindcss.com?plugins=container-queries' },
    ];
    const links = [
      {
        id: ids[1],
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap',
        rel: 'stylesheet',
      },
      {
        id: ids[2],
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
        rel: 'stylesheet',
      },
    ];

    scripts.forEach(({ id, src }) => {
      if (!document.getElementById(id)) {
        const el = document.createElement('script');
        el.id = id;
        el.src = src;
        document.head.appendChild(el);
      }
    });

    links.forEach(({ id, href, rel }) => {
      if (!document.getElementById(id)) {
        const el = document.createElement('link');
        el.id = id;
        el.href = href;
        el.rel = rel;
        document.head.appendChild(el);
      }
    });

    if (!document.getElementById('stitch-tw-config')) {
      const style = document.createElement('style');
      style.id = 'stitch-tw-config';
      style.textContent = `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .clay-card {
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        #mobile-menu.hidden { display: none; }
        #mobile-menu:not(.hidden) { display: flex; }

        /* Stitch scroll animations */
        .stitch-scroll-section {
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .stitch-scroll-hidden {
          opacity: 0 !important;
          transform: translateY(36px) !important;
        }
        .stitch-scroll-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    }

    const configureTailwind = () => {
      if (window.tailwind) {
        window.tailwind.config = {
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                primary: '#000000',
                'on-error': '#ffffff',
                'brand-peach': '#ffb084',
                'on-secondary': '#ffffff',
                'brand-pink': '#ff4d8b',
                'brand-coral': '#ff6b5a',
                'brand-mint': '#a4d4c5',
                tertiary: '#000000',
                error: '#ba1a1a',
                'surface-bright': '#fdf8f8',
                'on-surface': '#1c1b1b',
                canvas: '#fffaf0',
                'surface-soft': '#faf5e8',
                'surface-strong': '#ebe6d6',
                'on-surface-variant': '#444748',
                'surface-card': '#f5f0e0',
                background: '#fdf8f8',
                'on-primary': '#ffffff',
                'surface-container': '#f1edec',
                secondary: '#615e57',
                outline: '#747878',
                'surface-dim': '#ddd9d8',
                muted: '#6a6a6a',
                'outline-variant': '#c4c7c7',
                'inverse-surface': '#313030',
                body: '#3a3a3a',
                'brand-ochre': '#e8b94a',
                ink: '#0a0a0a',
                'brand-lavender': '#b8a4ed',
                'surface-dark': '#0a1a1a',
                hairline: '#e5e5e5',
                surface: '#fdf8f8',
                'brand-teal': '#1a3a3a',
                'surface-container-lowest': '#ffffff',
              },
              borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                xxl: '1.5rem',
                full: '9999px',
              },
              spacing: {
                md: '16px',
                'container-max': '1280px',
                xl: '32px',
                section: '96px',
                xxs: '4px',
                lg: '24px',
                sm: '12px',
                xs: '8px',
                xxl: '48px',
              },
              fontFamily: {
                'display-xl': ['Plus Jakarta Sans'],
                'display-xl-mobile': ['Plus Jakarta Sans'],
                'caption-caps': ['Inter'],
                'display-lg': ['Plus Jakarta Sans'],
                'display-sm': ['Plus Jakarta Sans'],
                'display-md': ['Plus Jakarta Sans'],
                'nav-link': ['Inter'],
                button: ['Inter'],
                'title-md': ['Inter'],
                'title-lg': ['Inter'],
                'body-md': ['Inter'],
                'body-sm': ['Inter'],
              },
              fontSize: {
                'display-xl': ['72px', { lineHeight: '72px', letterSpacing: '-2.5px', fontWeight: '500' }],
                'display-xl-mobile': ['36px', { lineHeight: '36px', letterSpacing: '-1px', fontWeight: '500' }],
                'caption-caps': ['12px', { lineHeight: '16.8px', letterSpacing: '1.5px', fontWeight: '600' }],
                'display-lg': ['56px', { lineHeight: '58.8px', letterSpacing: '-2px', fontWeight: '500' }],
                'display-sm': ['32px', { lineHeight: '36.8px', letterSpacing: '-0.5px', fontWeight: '500' }],
                'display-md': ['40px', { lineHeight: '44px', letterSpacing: '-1px', fontWeight: '500' }],
                'nav-link': ['14px', { lineHeight: '19.6px', fontWeight: '500' }],
                button: ['14px', { lineHeight: '14px', fontWeight: '600' }],
                'title-md': ['18px', { lineHeight: '25.2px', fontWeight: '600' }],
                'title-lg': ['24px', { lineHeight: '31.2px', letterSpacing: '-0.3px', fontWeight: '600' }],
                'body-md': ['16px', { lineHeight: '24.8px', fontWeight: '400' }],
                'body-sm': ['14px', { lineHeight: '21.7px', fontWeight: '400' }],
              },
            },
          },
        };
      }
    };

    const tw = document.getElementById('stitch-tailwind');
    if (tw) {
      tw.addEventListener('load', configureTailwind);
      configureTailwind();
    }

    let observer;

    const onDOMReady = () => {
      const menuToggle = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      if (menuToggle && mobileMenu) {
        const handler = () => mobileMenu.classList.toggle('hidden');
        menuToggle.addEventListener('click', handler);
        mobileMenu.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
      }

      // Intersection Observer for scroll animations (from Stitch design)
      const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'stitch-scroll-visible');
            entry.target.classList.remove('opacity-0', 'translate-y-10', 'stitch-scroll-hidden');
          }
        });
      }, observerOptions);

      const sections = document.querySelectorAll('section');
      sections.forEach((section, idx) => {
        section.classList.add('stitch-scroll-section', 'transition-all', 'duration-1000', 'ease-out');
        if (idx === 0) {
          section.classList.add('opacity-100', 'translate-y-0', 'stitch-scroll-visible');
        } else {
          section.classList.add('opacity-0', 'translate-y-10', 'stitch-scroll-hidden');
        }
        observer.observe(section);
      });
    };

    const timer = setTimeout(onDOMReady, 80);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  const [selectedPlan, setSelectedPlan] = useState('Professional');
  const [showContactModal, setShowContactModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCTA = (e) => {
    e.preventDefault();
    if (onGetStarted) onGetStarted();
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowContactModal(true);
  };

  return (
    <div className="bg-canvas text-ink font-body-md selection:bg-brand-lavender/30 overflow-x-hidden w-full max-w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-multiply"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }}
      />

      {/* NAV */}
      <nav className="top-0 sticky z-50 bg-[#fffaf0] border-b border-black/[0.06] shadow-xs">
        <div className="flex justify-between items-center h-16 px-4 md:px-lg max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-md lg:gap-xl">
            <a className="flex items-center" href="#">
              <svg height="36" className="sm:h-10 w-auto block max-w-[150px] sm:max-w-none" viewBox="0 0 460 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`.dl-text { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 46px; fill: #0a0a0a; letter-spacing: -1.5px; } .dl-outer { fill: #0a0a0a; } .dl-inner { fill: #ff4d8b; }`}</style>
                </defs>
                <g transform="translate(20, 26)">
                  <path className="dl-outer" d="M0 5 C0 2.2 2.2 0 5 0 H30 C46.5 0 60 13.5 60 30 C60 46.5 46.5 60 30 60 H5 C2.2 60 0 57.8 0 55 V5 Z" />
                  <circle className="dl-inner" cx="30" cy="30" r="18" />
                  <path d="M30 12 A 18 18 0 0 1 48 30" fill="none" opacity="0.6" stroke="white" strokeLinecap="round" strokeWidth="4" />
                  <circle cx="24" cy="24" fill="white" opacity="0.9" r="5" />
                </g>
                <text className="dl-text" x="96" y="75">Prompt2Dash</text>
              </svg>
            </a>
            <div className="hidden md:flex gap-md lg:gap-lg">
              <a className="font-nav-link text-nav-link text-muted hover:text-ink transition-colors" href="#how-it-works">Solutions</a>
              <a className="font-nav-link text-nav-link text-muted hover:text-ink transition-colors" href="#pricing">Plans</a>
              <a className="font-nav-link text-nav-link text-muted hover:text-ink transition-colors" href="#case-studies">Case Studies</a>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-md">
            <a onClick={handleCTA} href="#" className="bg-ink text-white font-button text-xs sm:text-button px-3 sm:px-lg py-2 sm:py-sm rounded-lg hover:opacity-90 transition-all duration-300">
              Try for free
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center p-2 text-ink rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu with solid background, z-50, and clean padding/spacing */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-16 left-0 w-full flex flex-col p-6 gap-4 border-b border-black/10 shadow-2xl z-50 animate-fadeIn"
            style={{ backgroundColor: '#fffaf0' }}
          >
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-nav-link text-base font-semibold text-muted hover:text-ink py-2 px-1 border-b border-black/5 transition-colors"
              href="#how-it-works"
            >
              Solutions
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-nav-link text-base font-semibold text-muted hover:text-ink py-2 px-1 border-b border-black/5 transition-colors"
              href="#pricing"
            >
              Plans
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="font-nav-link text-base font-semibold text-muted hover:text-ink py-2 px-1 border-b border-black/5 transition-colors"
              href="#case-studies"
            >
              Case Studies
            </a>
            <a
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleCTA(e);
              }}
              href="#"
              className="bg-ink text-white font-button text-sm py-3 px-6 rounded-xl text-center hover:opacity-90 mt-2 shadow-md flex items-center justify-center font-semibold cursor-pointer"
            >
              Try for free →
            </a>
          </div>
        )}
      </nav>

      <main>
        {/* HERO */}
        <section className="flex flex-col pt-24 pb-16 sm:pt-28 sm:pb-20 md:min-h-screen md:py-0 md:pt-xxl md:pb-section px-4 sm:px-lg max-w-container-max mx-auto overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }} />

          {/* Mobile subtle dot grid pattern for visual depth */}
          <div
            className="md:hidden absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(rgba(10, 10, 10, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, #000 50%, transparent 100%)',
            }}
          />

          {/* Mobile soft ambient radial gradient behind hero content */}
          <div
            className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-tr from-[#ff4d8b]/10 via-[#b8a4ed]/15 to-[#a4d4c5]/10 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8 sm:gap-10 md:gap-xxl md:grid md:grid-cols-2 items-center w-full relative z-10">
            <div className="contents md:block md:space-y-xl text-center md:text-left">
              <div className="space-y-2.5 sm:space-y-lg md:space-y-xl text-center md:text-left order-1 md:order-none">
                {/* Mobile Value-Driven Feature Pill */}
                <div className="md:hidden inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/10 shadow-2xs backdrop-blur-xs mx-auto mb-1">
                  <span className="text-xs">💬</span>
                  <span className="text-xs sm:text-sm font-medium text-ink tracking-tight">
                    Chat directly with your database
                  </span>
                </div>

                <h1
                  className="font-display text-[22px] xs:text-2xl sm:text-4xl md:text-5xl lg:text-display-xl text-ink w-full max-w-full md:max-w-xl mx-auto md:mx-0 leading-tight md:leading-[1] tracking-tight md:tracking-[-2.5px] font-bold break-words"
                  style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                >
                  <span className="md:hidden">Make Decisions Faster with AI</span>
                  <span className="hidden md:inline">Make Data-Driven Decisions Faster with AI</span>
                </h1>
                <p className="text-muted text-xs sm:text-sm md:text-title-md max-w-lg mx-auto md:mx-0 leading-relaxed">
                  <span className="md:hidden">Generate insights and interactive dashboards in seconds—no technical skills required.</span>
                  <span className="hidden md:inline">Empower your business teams to generate insights and interactive dashboards in seconds—no technical skills required.</span>
                </p>
              </div>

              <div className="flex flex-col items-center justify-center md:items-start md:justify-start pt-0 w-full order-3 md:order-none">
                <a
                  onClick={handleCTA}
                  href="#"
                  className="w-full max-w-[220px] md:w-auto bg-ink text-white font-button text-xs sm:text-button md:text-lg font-semibold px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-xl sm:rounded-2xl hover:scale-105 transition-transform flex items-center justify-center shadow-md cursor-pointer whitespace-nowrap text-center mx-auto md:mx-0"
                >
                  Demo
                </a>
                {/* Mobile Action-Oriented Microcopy */}
                <p className="md:hidden text-xs text-muted text-center mt-2.5 font-medium tracking-tight">
                  See it in action — no sign-up required
                </p>
              </div>
            </div>
            <HeroDashboardMockup onGetStarted={handleCTA} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="pt-12 pb-xl md:py-section bg-surface-soft px-4 sm:px-lg" id="how-it-works">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-xl md:mb-xxl">
              <h2 className="font-display-lg text-display-sm md:text-display-lg text-ink mb-md tracking-tight md:tracking-[-2px]">How it Works</h2>
              <p className="text-muted text-body-md md:text-title-md max-w-2xl mx-auto">Turn raw data into executive insights in three simple steps.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-xl relative">
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-ink/5 flex items-center justify-center mb-md md:mb-lg shadow-md">
                  <span className="material-symbols-outlined text-2xl md:text-display-sm text-brand-teal">sync</span>
                </div>
                <h4 className="font-title-lg text-ink mb-sm">Connect Your Data</h4>
                <p className="text-muted text-sm md:text-body-md">Import from Excel, Google Sheets, Salesforce, or your favorite CRM in seconds.</p>
              </div>
              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-ink/5 flex items-center justify-center mb-md md:mb-lg shadow-md">
                  <span className="material-symbols-outlined text-2xl md:text-display-sm text-brand-lavender">chat_bubble</span>
                </div>
                <h4 className="font-title-lg text-ink mb-sm">Ask Business Questions</h4>
                <p className="text-muted text-sm md:text-body-md">Type naturally: "What was our growth in Q3?" or "Show me top selling products."</p>
              </div>
              <div className="relative z-10 text-center flex flex-col items-center sm:col-span-2 md:col-span-1">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-ink flex items-center justify-center mb-md md:mb-lg shadow-xl mx-auto">
                  <span className="material-symbols-outlined text-2xl md:text-display-sm text-white">groups</span>
                </div>
                <h4 className="font-title-lg text-ink mb-sm">Share with Your Team</h4>
                <p className="text-muted text-sm md:text-body-md max-w-sm mx-auto">Generate instant dashboards and reports that your entire team can access.</p>
              </div>
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[1px] bg-ink/10" />
            </div>
          </div>
        </section>

        {/* TALK TO YOUR DATA */}
        <section className="py-xl md:py-section px-lg max-w-container-max mx-auto">
          <div className="grid md:grid-cols-2 gap-xl md:gap-xxl items-center">
            <div className="relative clay-card rounded-xxl p-sm md:p-md border-ink/5 bg-[#2a2a2a] ring-4 md:ring-8 ring-[#333333] shadow-[inset_0_4px_12px_rgba(0,0,0,0.8),0_20px_40px_rgba(0,0,0,0.4)] order-2 md:order-none">
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
              <div className="bg-[#111111] rounded-xl overflow-hidden shadow-2xl">
                <div className="p-md md:p-lg space-y-md">
                  <div className="flex items-center gap-xs mb-md">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-mint flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] md:text-[12px] text-ink">auto_awesome</span>
                    </div>
                    <span className="text-[10px] md:text-[12px] font-bold text-white tracking-wide uppercase">AI Business Analyst</span>
                  </div>
                  <div className="flex items-start gap-sm">
                    <div className="bg-[#222222] rounded-xl px-md py-sm border border-white/5">
                      <p className="text-[12px] md:text-[13px] text-white/90">Show me revenue growth by region for the last quarter.</p>
                    </div>
                  </div>
                  <div className="space-y-sm">
                    <div className="flex items-start gap-sm">
                      <div className="bg-[#1a1a1a] rounded-xl px-md py-sm border border-brand-mint/20 w-full">
                        <p className="text-[12px] md:text-[13px] text-white mb-md">Based on your sales data, the North region outperformed others by 22% last quarter.</p>
                        <div className="bg-[#222222] rounded-lg p-md md:p-lg border border-white/5">
                          <div className="flex items-end justify-between h-24 md:h-32 gap-sm">
                            <div className="flex-1 bg-brand-coral rounded-t-sm h-[45%]" />
                            <div className="flex-1 bg-brand-mint rounded-t-sm h-[75%]" />
                            <div className="flex-1 bg-brand-lavender rounded-t-sm h-[60%]" />
                            <div className="flex-1 bg-brand-peach rounded-t-sm h-[95%]" />
                          </div>
                          <div className="flex justify-between mt-sm">
                            <div className="h-1 w-6 md:h-1.5 md:w-8 bg-white/5 rounded-full" />
                            <div className="h-1 w-6 md:h-1.5 md:w-8 bg-white/5 rounded-full" />
                            <div className="h-1 w-6 md:h-1.5 md:w-8 bg-white/5 rounded-full" />
                            <div className="h-1 w-6 md:h-1.5 md:w-8 bg-white/5 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] px-md md:px-lg py-sm border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-xs items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
                    <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest font-semibold">Synced with Salesforce</span>
                  </div>
                  <span className="material-symbols-outlined text-white/20 text-sm">share</span>
                </div>
              </div>
              <div className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-white px-md py-sm rounded-lg shadow-xl border border-ink/5 hidden lg:flex items-center gap-sm">
                <span className="material-symbols-outlined text-brand-teal text-md">trending_up</span>
                <span className="text-xs font-bold text-ink">ROI Tracking Enabled</span>
              </div>
            </div>
            <div className="space-y-lg md:space-y-xl text-center md:text-left order-1 md:order-none">
              <div className="space-y-md">
                <h2 className="font-display-md text-display-sm md:text-display-md text-ink tracking-tight">Talk to Your Data</h2>
                <p className="text-muted font-body-md text-body-md md:text-title-md">
                  Stop wrestling with complex tools or waiting for IT. Just describe the business insight you need, and our AI fetches the data and renders the perfect chart instantly.
                </p>
              </div>
              <ul className="space-y-sm inline-block md:block text-left">
                {['Natural Language to Insights', 'Instant Executive Reports', 'Data-Driven Strategy'].map((item) => (
                  <li key={item} className="flex items-center gap-sm text-ink">
                    <span className="material-symbols-outlined text-brand-mint font-bold text-md">check_circle</span>
                    <span className="font-title-md text-sm md:text-body-md">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="py-xl md:py-section px-lg max-w-container-max mx-auto">
          <div className="text-center">
            <h3 className="font-caption-caps text-[10px] md:text-caption-caps text-muted uppercase tracking-[0.2em] mb-xl md:mb-xxl">
              TRUSTED BY LEADING DATA TEAMS
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-lg md:gap-x-xxl gap-y-lg opacity-50 grayscale contrast-125">
              {[
                { icon: 'change_history', name: 'Vertex' },
                { icon: 'blur_on', name: 'Quantum' },
                { icon: 'polyline', name: 'Nexus' },
                { icon: 'waves', name: 'Flux' },
                { icon: 'diamond', name: 'Prism' },
              ].map(({ icon, name }) => (
                <div key={name} className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-2xl md:text-display-sm">{icon}</span>
                  <span className="font-display-sm text-[18px] md:text-[24px] font-bold tracking-tight">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLANS / PRICING CARDS (Pricing numbers removed, clicking button selects plan & scrolls to contact form) */}
        <section className="py-xl md:py-section px-lg max-w-container-max mx-auto" id="pricing">
          <div className="text-center mb-xl md:mb-xxl">
            <h2 className="font-display-lg text-display-sm md:text-display-lg text-ink mb-md tracking-tight md:tracking-[-2px]">
              Plans &amp; Solutions
            </h2>
            <p className="text-muted text-body-md md:text-title-md">
              Designed to scale with your business growth. Select a plan to connect with our team.
            </p>
          </div>

          {/* 3 Plan Cards (Styles, layout, badges and borders 100% preserved) */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-lg md:gap-xl">
            {/* Starter Card */}
            <div className="bg-white p-lg md:p-xl rounded-xl border-t border-white border-b-2 border-black/10 flex flex-col shadow-sm">
              <h4 className="text-ink font-title-lg mb-xs">Starter</h4>
              <p className="text-muted text-sm mb-lg">
                For individuals and lightweight analytical needs.
              </p>
              <ul className="space-y-sm mb-lg md:mb-xxl flex-grow">
                {['3 Dashboards', 'Excel & Sheets Support', 'Automated Reporting'].map((f) => (
                  <li key={f} className="flex items-center gap-sm text-muted text-sm">
                    <span className="material-symbols-outlined text-ink text-md">check</span> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleSelectPlan('Starter')}
                className="w-full bg-white border border-ink/10 text-ink py-sm rounded-lg hover:bg-ink/5 transition-colors text-center text-sm font-semibold cursor-pointer"
              >
                Inquire Starter →
              </button>
            </div>

            {/* Professional Card */}
            <div className="bg-brand-teal p-lg md:p-xl rounded-xl border-t border-white/20 border-b-4 border-black/40 flex flex-col shadow-xl relative md:transform md:scale-105 z-20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-mint text-ink font-caption-caps text-[10px] md:text-caption-caps px-md py-1 rounded-full shadow-md whitespace-nowrap">
                MOST POPULAR
              </div>
              <h4 className="text-white font-title-lg mb-xs">Professional</h4>
              <p className="text-white/80 text-sm mb-lg">
                For growing businesses and collaborative analytics teams.
              </p>
              <ul className="space-y-sm mb-lg md:mb-xxl flex-grow">
                {['Unlimited Dashboards', 'Full CRM Integration', 'Advanced AI Insights', 'Team Permissions'].map((f) => (
                  <li key={f} className="flex items-center gap-sm text-white text-sm">
                    <span className="material-symbols-outlined text-brand-mint text-md">check</span> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleSelectPlan('Professional')}
                className="w-full bg-white text-ink font-bold py-sm rounded-lg hover:bg-brand-mint transition-colors text-center text-sm shadow-md cursor-pointer"
              >
                Inquire Professional →
              </button>
            </div>

            {/* Enterprise Card */}
            <div className="bg-white p-lg md:p-xl rounded-xl border-t border-white border-b-2 border-black/10 flex flex-col shadow-sm sm:col-span-2 md:col-span-1">
              <h4 className="text-ink font-title-lg mb-xs">Enterprise</h4>
              <p className="text-muted text-sm mb-lg">
                For custom data warehouses, VPCs, and dedicated compliance.
              </p>
              <ul className="space-y-sm mb-lg md:mb-xxl flex-grow">
                {['Unlimited Everything', 'Custom Security & SSO', 'Dedicated Account Manager', 'White-label Dashboards'].map((f) => (
                  <li key={f} className="flex items-center gap-sm text-muted text-sm">
                    <span className="material-symbols-outlined text-ink text-md">check</span> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleSelectPlan('Enterprise')}
                className="w-full bg-white border border-ink/10 text-ink py-sm rounded-lg hover:bg-ink/5 transition-colors text-center text-sm font-semibold cursor-pointer"
              >
                Contact Sales →
              </button>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="py-xl md:py-section px-lg">
          <div className="max-w-container-max mx-auto text-center bg-brand-lavender p-lg md:p-xxl rounded-2xl md:rounded-xxl relative overflow-hidden shadow-xl text-ink">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="font-display-lg text-display-sm md:text-display-lg mb-md tracking-tight md:tracking-[-2px]">Ready to automate your reporting?</h2>
              <p className="text-ink/70 text-body-md md:text-title-md mb-lg max-w-2xl mx-auto">
                Join 5,000+ business teams already using Prompt2Dash to drive growth through insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-md justify-center">
                <a onClick={handleCTA} href="#" className="bg-ink text-white font-button text-button px-lg py-sm h-11 flex items-center justify-center rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg">
                  Get Started Free
                </a>
                <button className="bg-white/30 border border-ink/10 text-ink font-button text-button px-lg py-sm h-11 flex items-center justify-center rounded-lg hover:bg-white/50 transition-all backdrop-blur-sm">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-surface-soft border-t border-ink/5 pt-xl md:pt-section pb-xl px-lg">
        <div className="max-w-container-max mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-xl md:gap-xxl">
          <div className="space-y-lg max-w-xs w-full">
            <a className="flex items-center" href="#">
              <svg height="40" style={{ height: '40px', width: 'auto', display: 'block' }} viewBox="0 0 460 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`.dl-text2 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 46px; fill: #0a0a0a; letter-spacing: -1.5px; } .dl-outer2 { fill: #0a0a0a; } .dl-inner2 { fill: #ff4d8b; }`}</style>
                </defs>
                <g transform="translate(20, 26)">
                  <path className="dl-outer2" d="M0 5 C0 2.2 2.2 0 5 0 H30 C46.5 0 60 13.5 60 30 C60 46.5 46.5 60 30 60 H5 C2.2 60 0 57.8 0 55 V5 Z" />
                  <circle className="dl-inner2" cx="30" cy="30" r="18" />
                  <path d="M30 12 A 18 18 0 0 1 48 30" fill="none" opacity="0.6" stroke="white" strokeLinecap="round" strokeWidth="4" />
                  <circle cx="24" cy="24" fill="white" opacity="0.9" r="5" />
                </g>
                <text className="dl-text2" x="96" y="75">Prompt2Dash</text>
              </svg>
            </a>
            <p className="text-muted font-body-sm">Empowering business leaders with world-class AI analytics. Built for modern, high-growth teams.</p>
            <div className="flex gap-md">
              <a className="text-muted hover:text-ink transition-colors" href="#"><span className="material-symbols-outlined text-xl">alternate_email</span></a>
              <a className="text-muted hover:text-ink transition-colors" href="#"><span className="material-symbols-outlined text-xl">public</span></a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-xl md:gap-xxl w-full md:w-auto">
            {[
              { title: 'Product', links: ['Solutions', 'Integrations', 'Pricing'] },
              { title: 'Resources', links: ['Case Studies', 'ROI Calculator', 'Blog'] },
              { title: 'Company', links: ['Privacy', 'Terms', 'Contact'] },
            ].map(({ title, links }) => (
              <div key={title} className="space-y-md">
                <h6 className="text-ink font-bold uppercase text-[10px] md:text-xs tracking-widest">{title}</h6>
                <ul className="space-y-sm">
                  {links.map((l) => (
                    <li key={l}><a className="text-muted hover:text-ink text-sm transition-colors" href="#">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-xl md:mt-xxl pt-lg border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-md text-muted text-[10px] md:text-xs">
          <p>© 2026 Prompt2Dash. Intelligent Business Solutions.</p>
          <div className="flex gap-lg">
            <span>System Status: All Systems Operational</span>
          </div>
        </div>
      </footer>

      {/* Enhanced Contact / Plan Inquiry Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        initialPlan={selectedPlan}
      />
    </div>
  );
}
