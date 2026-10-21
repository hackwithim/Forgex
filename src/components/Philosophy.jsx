import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Target } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';

export default function Philosophy() {
  const { doctrine } = EXPEDITION_DATA;

  return (
    <section
      id="philosophy"
      style={{
        padding: '6rem 0',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Single Authoritative Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <h2 className="section-title">Leadership Tested Under Pressure</h2>
          <p className="section-subtitle">
            Leadership is not only tested by what happens. It is tested by how you respond.
          </p>
        </motion.div>

        {/* 2-Column Philosophy & Tactical Imagery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Lead Quote & Operational Philosophy Card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="tactical-frame"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <ShieldAlert size={18} color="var(--forge-orange)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--forge-amber)', letterSpacing: '0.12em' }}>
                  // OPERATIONAL DOCTRINE
                </span>
              </div>

              <blockquote
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.45,
                  paddingLeft: '1.2rem',
                  borderLeft: '3px solid var(--forge-orange)',
                  marginBottom: '1.8rem',
                  fontStyle: 'normal'
                }}
              >
                “{doctrine.leadQuote}”
              </blockquote>

              <p style={{ color: 'var(--steel-300)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.2rem' }}>
                {doctrine.p1}
              </p>

              <p style={{ color: 'var(--steel-300)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                <strong style={{ color: '#ffffff' }}>Operation Forge X is designed to explore these qualities through experience.</strong> Across three days, participants enter a structured, military-inspired environment led by retired officers and experienced faculty. Physical activities, team missions and leadership sessions create opportunities to observe how individuals and groups respond to unfamiliar situations.
              </p>
            </div>

            {/* Mission Box */}
            <div
              style={{
                background: 'rgba(255, 94, 20, 0.08)',
                border: '1px solid var(--border-tactical)',
                borderRadius: '3px',
                padding: '1.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Target size={16} color="var(--forge-orange)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.08em', color: '#ffffff' }}>
                  THE MISSION
                </span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--steel-200)', lineHeight: 1.6, margin: 0 }}>
                {doctrine.mission}
              </p>
            </div>
          </motion.div>

          {/* Right Column: High-Res Tactical Field Imagery Card */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="tactical-frame"
            style={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: '440px',
              padding: 0
            }}
          >
            <img
              src="assets/images/crucible_action.jpg"
              alt="Military instructor briefing business executives on map coordinates"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.1) brightness(0.85)',
                display: 'block'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5, 7, 10, 0.95) 0%, rgba(5, 7, 10, 0.3) 50%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <span className="hud-tag military" style={{ marginBottom: '0.8rem' }}>
                    LIVE FIELD OPERATIONS
                  </span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                    REAL-TIME FIELD DECISION MAKING
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--steel-300)', marginTop: '0.3rem' }}>
                    MANDATORY TACTICAL PLATOON SCENARIOS · NO DESKS · NO POWERPOINTS
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
