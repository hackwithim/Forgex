import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Dispatch({ onOpenEnlist }) {
  return (
    <section
      id="dispatch"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 94, 20, 0.1) 0%, #05070a 80%)',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75 }}
          className="tactical-frame"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '4rem 2.5rem',
            textAlign: 'center',
            border: '1px solid var(--border-tactical)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 94, 20, 0.25)'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <span className="hud-tag gold">
              FINAL DISPATCH // 27–30 NOVEMBER 2026
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '1.2rem'
            }}
          >
            ARE YOU READY FOR THE CRUCIBLE?
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--steel-200)',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7
            }}
          >
            Operation Forge X is strictly limited to 20 operatives per platoon. Apply now to secure your clearance for the November 2026 muster at Hyatt Regency Dehradun.
          </p>

          {/* Action Button */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
            <button
              onClick={() => {
                sound.playConfirm();
                onOpenEnlist();
              }}
              className="btn-primary"
              style={{ fontSize: '1.1rem', padding: '1.1rem 2.8rem' }}
            >
              <span>SUBMIT ENLISTMENT APPLICATION</span>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Direct Line Dispatch Box */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.8rem',
              padding: '1rem 2rem',
              background: 'rgba(5, 7, 10, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '3px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              <Phone size={15} color="var(--forge-orange)" />
              <span>DIRECT DISPATCH:</span>
            </div>
            {EXPEDITION_DATA.phones.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                style={{
                  color: 'var(--forge-amber)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {phone.number}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
