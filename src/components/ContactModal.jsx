import { useState, useEffect } from 'react';

/**
 * ContactModal — enhanced inquiry box rendered when a user clicks on any pricing card button.
 * Includes interactive plan switcher, direct email chip (awwabsaleem09@gmail.com) with copy support,
 * quick tech-stack tags, and a polished confirmation view.
 */
export default function ContactModal({
  isOpen,
  onClose,
  initialPlan = 'Professional',
}) {
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [form, setForm] = useState({
    name: '',
    email: '',
    dbType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync initial plan when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialPlan || 'Professional');
      setSubmitted(false);
    }
  }, [isOpen, initialPlan]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('awwabsaleem09@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleAddStackTag = (tag) => {
    if (!form.dbType.includes(tag)) {
      setForm((prev) => ({
        ...prev,
        dbType: prev.dbType ? `${prev.dbType}, ${tag}` : tag,
      }));
    }
  };

  const planDescriptions = {
    Starter: {
      badge: 'Lightweight & Personal',
      placeholder: 'Tell us about the dashboards you want to create and your data sources...',
    },
    Professional: {
      badge: 'Most Popular for Teams',
      placeholder: 'Tell us about your team size, database setup, and analytics goals...',
    },
    Enterprise: {
      badge: 'Custom VPC & Compliance',
      placeholder: 'Tell us about your infrastructure, custom SSO, SLA, or VPC requirements...',
    },
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-2.5 sm:p-5 bg-black/65 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xl md:max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-2xl overflow-hidden relative my-auto animate-scaleUp">
        {/* Top vibrant accent stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff4d8b] via-[#b8a4ed] to-[#a4d4c5]" />

        {/* Modal Header */}
        <div className="px-4 sm:px-7 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-black/[0.06] flex items-start justify-between gap-3 sm:gap-4">
          <div>
            <h3 className="text-lg sm:text-2xl font-bold text-ink tracking-tight">
              Get in Touch — {selectedPlan} Plan
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              Tell us what you're building. We'll tailor the right setup for your database.
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/5 hover:bg-black/10 text-muted hover:text-ink flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-7 max-h-[82vh] overflow-y-auto">
          {submitted ? (
            /* Submission Success View */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#a4d4c5]/25 border-2 border-[#a4d4c5] text-teal-800 flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-3xl font-bold">check</span>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-ink">Inquiry Received!</h4>
                <p className="text-sm text-muted mt-1 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-ink">{form.name}</strong>. We've logged your inquiry for the{' '}
                  <span className="inline-block px-2 py-0.5 rounded bg-black/5 font-semibold text-ink">
                    {selectedPlan} Plan
                  </span>
                  . Our team will get back to you at{' '}
                  <strong className="text-ink underline">{form.email}</strong> shortly.
                </p>
              </div>

              {/* Direct email backup chip */}
              <div className="bg-[#faf5e8] border border-black/10 rounded-xl p-3.5 max-w-md mx-auto text-left flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#ff4d8b]">mail</span>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-semibold">Direct Contact</p>
                    <p className="font-semibold text-ink">awwabsaleem09@gmail.com</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 bg-white border border-black/15 rounded-lg font-semibold text-ink hover:bg-black/5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? 'Copied!' : 'Copy Email'}
                </button>
              </div>

              <div className="pt-3 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', dbType: '', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-muted hover:text-ink border border-black/10 rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Send another inquiry
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold text-white bg-ink rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Interactive Plan Selector Pills */}
              <div>
                <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1.5">
                  Selected Plan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Starter', 'Professional', 'Enterprise'].map((plan) => {
                    const isSelected = selectedPlan === plan;
                    return (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-ink text-white border-ink shadow-md'
                            : 'bg-white text-ink border-black/10 hover:border-black/30 hover:bg-black/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-xs sm:text-sm">{plan}</span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-sm text-[#a4d4c5]">
                              check_circle
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[10px] leading-tight line-clamp-1 ${
                            isSelected ? 'text-white/75' : 'text-muted'
                          }`}
                        >
                          {planDescriptions[plan].badge}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted text-base pointer-events-none">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#fcfcfc] text-ink text-sm pl-9 pr-3 py-2 rounded-xl border border-black/15 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted text-base pointer-events-none">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#fcfcfc] text-ink text-sm pl-9 pr-3 py-2 rounded-xl border border-black/15 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Database & Quick Tech Stack tags */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
                    Database / Tech Stack (Optional)
                  </label>
                  <span className="text-[10px] text-muted">Click to add common stacks</span>
                </div>
                <div className="relative mb-1.5">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted text-base pointer-events-none">
                    database
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. PostgreSQL, Supabase, Snowflake, MySQL"
                    value={form.dbType}
                    onChange={(e) => setForm({ ...form, dbType: e.target.value })}
                    className="w-full bg-[#fcfcfc] text-ink text-sm pl-9 pr-3 py-2 rounded-xl border border-black/15 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs"
                  />
                </div>
                {/* Quick tags */}
                <div className="flex flex-wrap gap-1.5">
                  {['PostgreSQL', 'Supabase', 'Snowflake', 'BigQuery', 'MySQL'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddStackTag(tag)}
                      className="text-[10px] font-medium bg-black/5 hover:bg-black/10 text-ink/80 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirements / Message */}
              <div>
                <label className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">
                  Message / Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder={planDescriptions[selectedPlan]?.placeholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#fcfcfc] text-ink text-sm p-3 rounded-xl border border-black/15 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink transition-all shadow-xs resize-none"
                />
              </div>

              {/* Direct email banner */}
              <div className="bg-[#fffaf0] border border-black/10 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#ff4d8b] text-sm">alternate_email</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted block uppercase font-semibold">Direct Engineer Inquiries</span>
                    <a
                      href="mailto:awwabsaleem09@gmail.com"
                      className="font-bold text-ink hover:text-[#ff4d8b] transition-colors"
                    >
                      awwabsaleem09@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-black/15 rounded-lg hover:bg-black/5 transition-colors cursor-pointer flex-shrink-0 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {copiedEmail ? 'check' : 'content_copy'}
                  </span>
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Submit Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-muted flex items-center gap-1 order-2 sm:order-1">
                  <span className="material-symbols-outlined text-emerald-600 text-[14px]">lock</span>
                  <span>100% private. Zero spam.</span>
                </p>

                <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-black/15 text-xs font-semibold text-muted hover:text-ink hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none bg-ink text-white font-semibold text-xs px-6 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Submit Inquiry</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
