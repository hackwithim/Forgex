import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function FacultyModal({ officer, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playBlip(500);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!officer) return null;

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
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="tactical-frame"
          style={{
            maxWidth: '780px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#0a0e14',
            border: '1px solid var(--border-tactical)',
            borderRadius: '4px',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 94, 20, 0.2)'
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
                CLASSIFIED PERSONNEL DOSSIER // DECLASSIFIED FOR EXPEDITION
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
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              aria-label="Close dossier"
            >
              <X size={18} />
            </button>
          </div>

          {/* Dossier Body */}
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              {/* Left Column: Portrait */}
              <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', height: '320px' }}>
                <img
                  src={officer.image}
                  alt={officer.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.1)'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                  <span className="hud-tag gold">{officer.branchName}</span>
                </div>
              </div>

              {/* Right Column: Key Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--forge-orange)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {officer.tag}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, margin: '0.35rem 0 0.5rem' }}>
                  {officer.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--forge-amber)', marginBottom: '1.2rem' }}>
                  {officer.role}
                </div>
                <p style={{ color: 'var(--steel-300)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {officer.bio}
                </p>
              </div>
            </div>

            {/* Strategic Operational Highlights */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ffffff', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700 }}>
                <Award size={18} color="var(--forge-orange)" />
                <span>COMMAND EXPERTISE & EXPEDITION CURRICULUM</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {officer.dossier.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                    <CheckCircle2 size={16} color="var(--forge-orange)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <span style={{ fontSize: '0.92rem', color: 'var(--steel-200)', lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => {
                  sound.playBlip(500);
                  onClose();
                }}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
              >
                RETURN TO BRIEFING
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
