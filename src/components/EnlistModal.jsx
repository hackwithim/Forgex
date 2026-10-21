import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Send, CheckCircle2 } from 'lucide-react';
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
          padding: '1.5rem',
          background: 'rgba(3, 5, 8, 0.88)',
          backdropFilter: 'blur(16px)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            sound.playBlip(500);
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className="tactical-frame"
          style={{
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#0a0e14',
            border: '1px solid var(--border-tactical)',
            borderRadius: '4px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 94, 20, 0.25)'
          }}
        >
          {/* Top Banner Header */}
          <div
            style={{
              padding: '1.2rem 1.8rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 94, 20, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Shield size={18} color="var(--forge-orange)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--forge-amber)', letterSpacing: '0.12em' }}>
                EXPEDITION ENLISTMENT APPLICATION // 2026 MUSTER
              </span>
            </div>
            <button
              onClick={() => {
                sound.playBlip(500);
                onClose();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ padding: '2rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={54} color="var(--forge-orange)" style={{ margin: '0 auto 1.2rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.8rem' }}>
                  APPLICATION DISPATCH TRANSMITTED
                </h3>
                <p style={{ color: 'var(--steel-300)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 1.8rem' }}>
                  Your enlistment dossier has been prepared and routed to mission dispatch. WhatsApp will launch to connect with expedition coordinators.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="btn-primary"
                  style={{ padding: '0.7rem 2rem' }}
                >
                  DISMISS
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-300)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Rathore"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'rgba(5, 7, 10, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '3px',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-300)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      DESIGNATION / ROLE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Founder & CEO / VP"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: 'rgba(5, 7, 10, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: '#ffffff',
                        outline: 'none',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-300)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      ORGANIZATION / VENTURE *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Defense / Horizon"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: 'rgba(5, 7, 10, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: '#ffffff',
                        outline: 'none',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-300)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      MOBILE PHONE *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: 'rgba(5, 7, 10, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: '#ffffff',
                        outline: 'none',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-300)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      QUARTERS TIER *
                    </label>
                    <select
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: '#05070a',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '3px',
                        color: '#ffffff',
                        outline: 'none',
                        fontSize: '0.95rem'
                      }}
                    >
                      <option value="single">Single Occupancy (₹1,95,000 + GST)</option>
                      <option value="twin">Twin-Sharing (₹1,65,000 + GST)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-300)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    OPERATIONAL OBJECTIVES (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Briefly state what leadership challenges or goals you aim to test during Forge X..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: 'rgba(5, 7, 10, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '3px',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.95rem',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', fontSize: '1.05rem' }}
                >
                  <Send size={18} />
                  <span>TRANSMIT APPLICATION VIA WHATSAPP</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
