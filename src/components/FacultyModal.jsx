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
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            maxWidth: '780px',
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
          {/* Top Banner Header (Pinned) */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Shield size={18} color="var(--forge-orange)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.68rem, 2vw, 0.76rem)',
                  color: 'var(--forge-amber)',
                  letterSpacing: '0.12em'
                }}
              >
                CLASSIFIED PERSONNEL DOSSIER // EXPEDITION FACULTY
              </span>
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
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              aria-label="Close dossier"
            >
              <X size={17} />
            </button>
          </div>

          {/* Dossier Body with Custom Scrollbar */}
          <div
            className="dossier-body-scroll"
            style={{
              padding: 'clamp(1.2rem, 3.5vw, 2rem)',
              overflowY: 'auto',
              overflowX: 'hidden',
              flexGrow: 1
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.8rem',
                marginBottom: '2rem'
              }}
            >
              {/* Left Column: Portrait */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  aspectRatio: '1 / 1',
                  maxHeight: '340px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: '#05070a'
                }}
              >
                <img
                  src={officer.image}
                  alt={officer.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05) brightness(1.02)'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '0.9rem', left: '0.9rem', right: '0.9rem' }}>
                  <span className="hud-tag gold" style={{ backdropFilter: 'blur(8px)' }}>
                    {officer.branchName}
                  </span>
                </div>
              </div>

              {/* Right Column: Key Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--forge-orange)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  {officer.tag}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    margin: '0.35rem 0 0.5rem'
                  }}
                >
                  {officer.name}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem',
                    color: 'var(--forge-amber)',
                    marginBottom: '1rem',
                    lineHeight: 1.4
                  }}
                >
                  {officer.role}
                </div>
                <p style={{ color: 'var(--steel-300)', fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
                  {officer.bio}
                </p>
              </div>
            </div>

            {/* Strategic Operational Highlights */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.6rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontWeight: 700
                }}
              >
                <Award size={18} color="var(--forge-orange)" />
                <span>COMMAND EXPERTISE & EXPEDITION CURRICULUM</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {officer.dossier.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <CheckCircle2
                      size={16}
                      color="var(--forge-orange)"
                      style={{ flexShrink: 0, marginTop: '0.25rem' }}
                    />
                    <span style={{ fontSize: '0.92rem', color: 'var(--steel-200)', lineHeight: 1.6 }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div style={{ marginTop: '2.2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => {
                  sound.playBlip(500);
                  onClose();
                }}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.88rem' }}
              >
                RETURN TO BRIEFING
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .dossier-body-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .dossier-body-scroll::-webkit-scrollbar-track {
          background: rgba(5, 7, 10, 0.4);
        }
        .dossier-body-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 94, 20, 0.35);
          border-radius: 3px;
        }
        .dossier-body-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--forge-orange);
        }
      `}</style>
    </AnimatePresence>
  );
}
