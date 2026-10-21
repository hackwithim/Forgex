import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEngine';

export default function EnlistModal({ isOpen, defaultPlan = 'single', onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    phone: '',
    plan: defaultPlan,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, plan: defaultPlan }));
  }, [defaultPlan]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        sound.playBlip(500);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playConfirm();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5e14', '#ff9d00', '#ffffff']
      });
    } catch (err) {}

    setSubmitted(true);

    // Format WhatsApp message to mission coordinators
    const message = `*OPERATION FORGE X — ENLISTMENT DISPATCH*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Designation:* ${encodeURIComponent(formData.role)}%0A*Company/Org:* ${encodeURIComponent(formData.company)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Quarters:* ${encodeURIComponent(formData.plan === 'single' ? 'Single Occupancy (₹1,95,000 + GST)' : 'Twin-Sharing (₹1,65,000 + GST)')}%0A*Notes:* ${encodeURIComponent(formData.notes || 'Ready for muster.')}`;

    setTimeout(() => {
      window.open(`https://wa.me/919979869175?text=${message}`, '_blank');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.6rem, 2.5vw, 1.5rem)',
          background: 'rgba(3, 5, 8, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            sound.playBlip(500);
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="enlist-modal-card"
          style={{
            maxWidth: '560px',
            width: '100%',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#090d14',
            border: '1px solid rgba(255, 94, 20, 0.35)',
            borderRadius: '6px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 94, 20, 0.2)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Top Fixed Header */}
          <div
            style={{
              padding: 'clamp(0.85rem, 2.2vw, 1.2rem) clamp(1rem, 3vw, 1.6rem)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(90deg, rgba(255, 94, 20, 0.08) 0%, rgba(5, 7, 10, 0.4) 100%)',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  background: 'rgba(255, 94, 20, 0.15)',
                  border: '1px solid rgba(255, 94, 20, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Shield size={16} color="var(--forge-orange)" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.68rem, 2vw, 0.75rem)',
                    color: 'var(--forge-amber)',
                    letterSpacing: '0.1em',
                    lineHeight: 1.2
                  }}
                >
                  EXPEDITION ENLISTMENT
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.04em'
                  }}
                >
                  2026 MUSTER APPLICATION
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playBlip(500);
                onClose();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s ease'
              }}
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>

          {/* Scrollable Form Body with Slim Custom Scrollbar */}
          <div
            className="enlist-modal-body"
            style={{
              padding: 'clamp(1rem, 3.2vw, 1.8rem)',
              overflowY: 'auto',
              flexGrow: 1
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
                <CheckCircle2 size={50} color="var(--forge-orange)" style={{ margin: '0 auto 1.2rem' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.3rem, 3.5vw, 1.7rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.8rem'
                  }}
                >
                  APPLICATION TRANSMITTED
                </h3>
                <p
                  style={{
                    color: 'var(--steel-300)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    maxWidth: '420px',
                    margin: '0 auto 1.8rem'
                  }}
                >
                  Your enlistment dossier has been generated. Connecting to WhatsApp dispatch to finalize your candidate profile with expedition leadership.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="btn-primary"
                  style={{ padding: '0.7rem 2rem', fontSize: '0.9rem' }}
                >
                  DISMISS
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Full Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--steel-300)',
                      letterSpacing: '0.08em',
                      marginBottom: '0.4rem'
                    }}
                  >
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="enlist-input"
                  />
                </div>

                {/* Adaptive Row 1: Designation & Organization */}
                <div className="enlist-grid-adaptive">
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--steel-300)',
                        letterSpacing: '0.08em',
                        marginBottom: '0.4rem'
                      }}
                    >
                      DESIGNATION / ROLE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Founder & CEO / VP"
                      className="enlist-input"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--steel-300)',
                        letterSpacing: '0.08em',
                        marginBottom: '0.4rem'
                      }}
                    >
                      ORGANIZATION / VENTURE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Defense Systems"
                      className="enlist-input"
                    />
                  </div>
                </div>

                {/* Adaptive Row 2: Phone & Quarters Selection */}
                <div className="enlist-grid-adaptive">
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--steel-300)',
                        letterSpacing: '0.08em',
                        marginBottom: '0.4rem'
                      }}
                    >
                      MOBILE PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="enlist-input"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: 'var(--steel-300)',
                        letterSpacing: '0.08em',
                        marginBottom: '0.4rem'
                      }}
                    >
                      QUARTERS TIER *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={formData.plan}
                        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        className="enlist-input enlist-select"
                      >
                        <option value="single">Single Occupancy (₹1,95,000 + GST)</option>
                        <option value="twin">Twin-Sharing (₹1,65,000 + GST)</option>
                      </select>
                      <ChevronDown
                        size={16}
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--steel-400)',
                          pointerEvents: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Operational Objectives (Optional) */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--steel-300)',
                      letterSpacing: '0.08em',
                      marginBottom: '0.4rem'
                    }}
                  >
                    OPERATIONAL OBJECTIVES (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Briefly state leadership challenges or goals you aim to test during Forge X..."
                    className="enlist-input"
                    style={{ resize: 'vertical', minHeight: '75px' }}
                  />
                </div>

                {/* High-Impact Transmit Button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.2rem',
                    marginTop: '0.4rem',
                    fontSize: 'clamp(0.85rem, 2.5vw, 0.98rem)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    borderRadius: '4px'
                  }}
                >
                  <Send size={16} />
                  <span>TRANSMIT APPLICATION VIA WHATSAPP</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Adaptive Form Grid */
        .enlist-grid-adaptive {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 580px) {
          .enlist-grid-adaptive {
            grid-template-columns: 1fr !important;
            gap: 1.1rem !important;
          }
        }

        /* Input Styling */
        .enlist-input {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(5, 7, 10, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          color: #ffffff;
          outline: none;
          font-size: 15px; /* Comfortable & Prevents mobile auto-zoom */
          font-family: inherit;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .enlist-input:focus {
          border-color: var(--forge-orange);
          box-shadow: 0 0 12px rgba(255, 94, 20, 0.25);
          background: rgba(8, 12, 18, 0.95);
        }

        .enlist-input::placeholder {
          color: var(--steel-500);
          font-size: 0.88rem;
        }

        .enlist-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          padding-right: 2.2rem;
        }

        .enlist-select option {
          background: #090d14;
          color: #ffffff;
          padding: 0.5rem;
        }

        /* Slim Scrollbar for Modal Body */
        .enlist-modal-body::-webkit-scrollbar {
          width: 5px;
        }
        .enlist-modal-body::-webkit-scrollbar-track {
          background: rgba(5, 7, 10, 0.4);
        }
        .enlist-modal-body::-webkit-scrollbar-thumb {
          background: rgba(255, 94, 20, 0.35);
          border-radius: 3px;
        }
        .enlist-modal-body::-webkit-scrollbar-thumb:hover {
          background: var(--forge-orange);
        }
      `}</style>
    </AnimatePresence>
  );
}
