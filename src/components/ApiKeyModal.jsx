import { useState, useEffect } from 'react';

/**
 * ApiKeyModal — prompts users to input their Google Gemini API key.
 * Explains budget constraints on public deployment and links to Google AI Studio.
 */
export default function ApiKeyModal({
  isOpen,
  onClose,
  onSave,
  onValidate,
  currentKey = '',
  errorMessage = '',
}) {
  const [keyInput, setKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyInput(currentKey || '');
      setValidationError(errorMessage || '');
      setIsValidating(false);
    }
  }, [isOpen, currentKey, errorMessage]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e?.preventDefault();
    if (isValidating) return;
    const trimmed = keyInput.trim();
    if (!trimmed) {
      setValidationError('Please enter a valid Gemini API key.');
      return;
    }
    if (trimmed.length < 20) {
      setValidationError('The API key seems too short. Please check your Google AI Studio key.');
      return;
    }

    setValidationError('');
    setIsValidating(true);

    try {
      if (onValidate) {
        await onValidate(trimmed);
      }
      onSave(trimmed);
    } catch (err) {
      setValidationError(err.message || 'Invalid Gemini API key. Please check your key from Google AI Studio.');
    } finally {
      setIsValidating(false);
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator?.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setKeyInput(text.trim());
          setValidationError('');
        }
      }
    } catch {
      // Clipboard access denied or unsupported; ignore silently
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(10, 10, 10, 0.65)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 24px 60px -12px rgba(10,10,10,0.35), 0 8px 24px rgba(10,10,10,0.1)',
          border: '1px solid rgba(10,10,10,0.08)',
          overflowY: 'auto',
          fontFamily: "'Inter', sans-serif",
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header bar */}
        <div
          className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-black/[0.06] flex items-start justify-between gap-3 sm:gap-4"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: '#fff0f5',
                border: '1px solid rgba(255,77,139,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#ff4d8b' }}>
                vpn_key
              </span>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  margin: 0,
                  letterSpacing: '-0.5px',
                }}
              >
                Gemini API Key Required
              </h2>
              <p style={{ fontSize: '13px', color: '#6a6a6a', margin: '3px 0 0' }}>
                Connect your free Google AI Studio key to begin
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
                color: '#8a8a8a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(10,10,10,0.05)';
                e.currentTarget.style.color = '#0a0a0a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#8a8a8a';
              }}
              aria-label="Close"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7">
          {/* Budget Notice Banner */}
          <div
            style={{
              backgroundColor: '#fffaf0',
              border: '1px solid #fed7aa',
              borderRadius: '14px',
              padding: '14px 16px',
              marginBottom: '20px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px', color: '#ea580c', flexShrink: 0, marginTop: '2px' }}
            >
              info
            </span>
            <div style={{ fontSize: '13px', lineHeight: 1.5, color: '#7c2d12' }}>
              <strong>Why your own key?</strong> Due to budget constraints on this free public deployment, Prompt2Dash uses your own Google Gemini API key. This keeps the service 100% free and ensures you never run into shared rate limits.
            </div>
          </div>

          {/* Reference: How to create a key */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                How to get a key (Free & Fast)
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ff4d8b',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <span>Google AI Studio</span>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
              </a>
            </div>
            <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#475569', lineHeight: 1.6 }}>
              <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#0a0a0a', fontWeight: 600 }}>Google AI Studio API Keys</a>.</li>
              <li>Sign in and click <strong>"Create API key"</strong>.</li>
              <li>Copy and paste your key in the box below.</li>
            </ol>
          </div>

          {/* Input form */}
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label
                  htmlFor="gemini-key-input"
                  style={{ fontSize: '13px', fontWeight: 600, color: '#0a0a0a', display: 'block' }}
                >
                  Your Gemini API Key
                </label>
                <button
                  type="button"
                  onClick={handlePaste}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#ff4d8b',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>content_paste</span>
                  Paste from clipboard
                </button>
              </div>

              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  border: validationError ? '1.5px solid #ef4444' : '1px solid rgba(10,10,10,0.18)',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(10,10,10,0.04)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                <input
                  id="gemini-key-input"
                  type={showKey ? 'text' : 'password'}
                  value={keyInput}
                  onChange={(e) => {
                    setKeyInput(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="AIzaSy..."
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    fontSize: '14px',
                    fontFamily: "'Courier New', Courier, monospace",
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: '#0a0a0a',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: '#6a6a6a',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {showKey ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {validationError && (
                <div
                  style={{
                    margin: '10px 0 0',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#dc2626',
                    fontWeight: 500,
                    lineHeight: 1.45,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#dc2626', flexShrink: 0, marginTop: '1px' }}>
                    error
                  </span>
                  <span>{validationError}</span>
                </div>
              )}
            </div>

            {/* Privacy notice */}
            <p
              style={{
                fontSize: '11.5px',
                color: '#8a8a8a',
                lineHeight: 1.5,
                margin: '0 0 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#10b981' }}>
                lock
              </span>
              Saved securely in your browser's local storage. Never stored on our servers.
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              {onClose && (
                <button
                  type="button"
                  disabled={isValidating}
                  onClick={onClose}
                  style={{
                    padding: '11px 20px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    color: '#4a4a4a',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(10,10,10,0.06)',
                    borderRadius: '12px',
                    cursor: isValidating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s',
                    opacity: isValidating ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isValidating) e.currentTarget.style.backgroundColor = '#e9e9e9';
                  }}
                  onMouseLeave={(e) => {
                    if (!isValidating) e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isValidating}
                style={{
                  padding: '11px 24px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#ffffff',
                  backgroundColor: isValidating ? '#3a3a3a' : '#0a0a0a',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: isValidating ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s',
                  opacity: isValidating ? 0.85 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isValidating) {
                    e.currentTarget.style.backgroundColor = '#222222';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isValidating) {
                    e.currentTarget.style.backgroundColor = '#0a0a0a';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isValidating ? (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: '16px',
                        animation: 'spin 1s linear infinite',
                        display: 'inline-block',
                      }}
                    >
                      progress_activity
                    </span>
                    <span>Verifying key...</span>
                  </>
                ) : (
                  <>
                    <span>Save &amp; continue</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
