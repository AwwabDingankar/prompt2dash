import { useEffect, useState } from 'react';
import HeroDashboardMockup from './HeroDashboardMockup';

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
  const [contactForm, setContactForm] = useState({ name: '', email: '', dbType: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleCTA = (e) => {
    e.preventDefault();
    if (onGetStarted) onGetStarted();
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const msgInput = document.getElementById('contact-message');
    if (msgInput) {
      msgInput.focus();
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
    setContactSubmitted(true);
  };

  return (
    <div className="bg-canvas text-ink font-body-md selection:bg-brand-lavender/30" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-multiply"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }}
      />

      {/* NAV */}
      <nav className="top-0 sticky z-50 bg-canvas/80 backdrop-blur-md border-b border-ink/5">
        <div className="flex justify-between items-center h-16 px-md md:px-lg max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-md lg:gap-xl">
            <a className="flex items-center" href="#">
              <svg height="40" style={{ height: '40px', width: 'auto', display: 'block' }} viewBox="0 0 460 120" xmlns="http://www.w3.org/2000/svg">
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
              <a className="font-nav-link text-nav-link text-muted hover:text-ink transition-colors" href="#">Case Studies</a>
            </div>
          </div>
          <div className="flex items-center gap-sm md:gap-md">
            <a onClick={handleCTA} href="#" className="bg-ink text-white font-button text-button px-md md:px-lg py-sm rounded-lg hover:opacity-90 transition-all duration-300">
              Try for free
            </a>
            <button className="md:hidden flex items-center p-2" id="menu-toggle">
              <span className="material-symbols-outlined text-ink">menu</span>
            </button>
          </div>
        </div>
        <div className="hidden absolute top-16 left-0 w-full bg-canvas border-b border-ink/5 flex-col p-lg gap-lg shadow-xl md:hidden" id="mobile-menu">
          <a className="font-nav-link text-nav-link text-muted hover:text-ink" href="#how-it-works">Solutions</a>
          <a className="font-nav-link text-nav-link text-muted hover:text-ink" href="#pricing">Plans</a>
          <a className="font-nav-link text-nav-link text-muted hover:text-ink" href="#">Case Studies</a>
          <a onClick={handleCTA} href="#" className="bg-ink text-white font-button text-button px-md py-sm rounded-lg text-center hover:opacity-90">
            Try for free
          </a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="pt-xl md:pt-xxl pb-xl md:pb-section px-lg max-w-container-max mx-auto overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }} />
          <div className="grid md:grid-cols-2 gap-xl md:gap-xxl items-center">
            <div className="space-y-lg md:space-y-xl text-center md:text-left order-1 md:order-none">
              <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-ink max-w-xl mx-auto md:mx-0 leading-[1.1] md:leading-[1] tracking-tight md:tracking-[-2.5px]">
                Make Data-Driven Decisions Faster with AI
              </h1>
              <p className="text-muted font-body-md text-body-md md:text-title-md max-w-lg mx-auto md:mx-0">
                Empower your business teams to generate insights and interactive dashboards in seconds—no technical skills required.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-md justify-center md:justify-start">
                <a onClick={handleCTA} href="#" className="bg-ink text-white font-button text-button px-xxl py-md hover:scale-105 transition-transform flex items-center justify-center rounded-2xl">
                  Get Started Free
                </a>
                <button className="bg-white border border-ink/10 text-ink font-button text-button px-xxl py-md hover:bg-white/50 flex items-center justify-center gap-xs transition-all shadow-sm rounded-2xl">
                  <span className="material-symbols-outlined">play_circle</span>
                  Watch Demo
                </button>
              </div>
            </div>
            <HeroDashboardMockup onGetStarted={handleCTA} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-xl md:py-section bg-surface-soft px-lg" id="how-it-works">
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

          {/* Permanently Rendered Premium Contact Us Form */}
          <div
            id="contact-form-section"
            className="mt-xl md:mt-xxl bg-white rounded-[2rem] border border-black/[0.08] p-lg md:p-xxl shadow-2xl relative overflow-hidden"
            style={{
              boxShadow: '0 24px 64px -12px rgba(10,10,10,0.12), 0 4px 16px rgba(10,10,10,0.04)',
            }}
          >
            {/* Subtle top ambient glow */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-40 blur-3xl"
              style={{ backgroundColor: '#a4d4c5' }}
            />
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none opacity-30 blur-3xl"
              style={{ backgroundColor: '#ffb084' }}
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-xl items-start">
              {/* Left Column: Heading & Value props */}
              <div className="lg:col-span-5 space-y-md">
                <div className="inline-flex items-center gap-1.5 bg-[#f5f5f5] border border-black/10 rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-[11px] font-bold text-ink uppercase tracking-wider">
                    Quick Response · &lt; 2 Hours
                  </span>
                </div>

                <h3 className="font-display-sm text-ink text-2xl md:text-3xl font-bold tracking-tight">
                  Get in touch with our team
                </h3>

                <p className="text-muted text-sm leading-relaxed">
                  Whether you're exploring the <strong className="text-ink">{selectedPlan} plan</strong>, connecting custom data sources, or evaluating on-premise deployment, we're here to help you get up and running.
                </p>

                <div className="pt-sm space-y-2.5">
                  {[
                    'Direct chat with dashboard engineers',
                    'Support for PostgreSQL, Snowflake & BigQuery',
                    'Custom database schema optimization',
                    'Zero spam. Your data stays 100% private',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-xs font-medium text-ink">
                      <span className="material-symbols-outlined text-[16px] text-brand-mint">check_circle</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-md border-t border-black/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-canvas flex items-center justify-center border border-black/10">
                    <span className="material-symbols-outlined text-lg text-brand-pink">mail</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted uppercase font-semibold">Direct Email</p>
                    <a href="mailto:awwabsaleem09@gmail.com" className="text-sm font-semibold text-ink hover:text-brand-pink transition-colors">
                      awwabsaleem09@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 bg-canvas/30 rounded-2xl border border-black/[0.06] p-md md:p-lg">
                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-brand-mint/20 border border-brand-mint/40 text-brand-mint flex items-center justify-center mx-auto">
                      <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h4 className="font-bold text-xl text-ink">Thank you, {contactForm.name}!</h4>
                    <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                      Your inquiry for the <strong className="text-ink">{selectedPlan} plan</strong> has been successfully received. We'll be in touch at <strong className="text-ink">{contactForm.email}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactForm({ name: '', email: '', dbType: '', message: '' });
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink bg-white border border-black/10 px-4 py-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {/* Plan selection pills */}
                    <div>
                      <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1.5">
                        Inquiry For Plan
                      </label>
                      <div className="flex gap-2">
                        {['Starter', 'Professional', 'Enterprise'].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setSelectedPlan(p)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${selectedPlan === p
                              ? 'bg-ink text-white border-ink shadow-sm'
                              : 'bg-white text-muted border-black/10 hover:border-black/30'
                              }`}
                          >
                            {selectedPlan === p && (
                              <span className="material-symbols-outlined text-xs text-brand-mint">check</span>
                            )}
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex Morgan"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-white text-ink text-sm px-3.5 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                          Work Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-white text-ink text-sm px-3.5 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                        Database / Tech Stack (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PostgreSQL, Supabase, Snowflake, MySQL"
                        value={contactForm.dbType}
                        onChange={(e) => setContactForm({ ...contactForm, dbType: e.target.value })}
                        className="w-full bg-white text-ink text-sm px-3.5 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                        Message / Requirements <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows="3"
                        placeholder={`Tell us about what you want to achieve with the ${selectedPlan} plan...`}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-white text-ink text-sm px-3.5 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-[11px] text-muted flex items-center gap-1.5 order-2 sm:order-1">
                        <span className="material-symbols-outlined text-[14px] text-[#10b981]">lock</span>
                        <span>Encrypted &amp; private communication</span>
                      </p>
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-ink text-white font-button text-sm px-7 py-3 rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 order-1 sm:order-2"
                      >
                        <span>Send Message</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
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
    </div>
  );
}
