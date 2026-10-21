import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Dispatch({ onOpenEnlist }) {
  return (
    <section
      id="dispatch"
      style={{
        padding: '7rem 0',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 94, 20, 0.08) 0%, #05070a 80%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75 }}
          className="tactical-frame"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '4rem 2.5rem',
            textAlign: 'center',
            border: '1px solid var(--border-tactical)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
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
              fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
              color: 'var(--steel-200)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7
            }}
          >
            Operation Forge X is strictly limited to 20 operatives per platoon. Apply now to secure your candidate clearance for the November 2026 muster at Hyatt Regency Dehradun.
          </p>

          {/* Action Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <button
              onClick={() => {
                sound.playConfirm();
                onOpenEnlist();
              }}
              className="btn-primary"
              style={{ fontSize: '1.05rem', padding: '1rem 2.8rem', borderRadius: '2px' }}
            >
              <span>SUBMIT ENLISTMENT APPLICATION</span>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Direct Line Dispatch */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.8rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              color: 'var(--steel-400)'
            }}
          >
            <span>DIRECT DISPATCH:</span>
            {EXPEDITION_DATA.phones.map((phone) => (
              <a
                key={phone.raw}
                href={`tel:${phone.raw}`}
                style={{
                  color: 'var(--forge-orange)',
                  textDecoration: 'none',
                  fontWeight: 700
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
