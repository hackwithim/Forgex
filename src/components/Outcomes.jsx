import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Users2, Brain, Lightbulb } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';

export default function Outcomes() {
  const icons = [ShieldCheck, Compass, Users2, Brain, Lightbulb];

  return (
    <section
      id="outcomes"
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
          <h2 className="section-title">Programme Outcomes</h2>
          <p className="section-subtitle">
            Operation Forge X translates the lessons of military leadership into practical capabilities for the world of business. Through mission-based challenges, team exercises and high-pressure decision-making, participants build the mindset and skills to lead with greater clarity, resilience and conviction.
          </p>
        </motion.div>

        {/* 5 Outcomes Cards Grid with Staggered Entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {EXPEDITION_DATA.outcomes.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, borderColor: 'var(--forge-orange)' }}
                className="tactical-frame"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Number Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {item.num}
                </span>

                {/* Icon Box */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '4px',
                    background: 'rgba(255, 94, 20, 0.12)',
                    border: '1px solid var(--border-tactical)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <Icon size={22} color="var(--forge-orange)" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: '0.8rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--steel-300)', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
