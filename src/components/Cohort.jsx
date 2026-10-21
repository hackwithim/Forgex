import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, ShieldCheck } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';

export default function Cohort() {
  const { cohort } = EXPEDITION_DATA;

  return (
    <section
      id="cohort"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(10,14,20,0.95) 0%, rgba(5,7,10,0.7) 100%)'
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
          <h2 className="section-title">Cohort Structure</h2>
          <p className="section-subtitle">
            A curated group of accomplished peers with meaningful decision-making responsibility.
          </p>
        </motion.div>

        {/* Master Cohort Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75 }}
          className="tactical-frame"
          style={{ padding: '3rem' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            {/* Left: Narrative & Philosophy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <Users size={18} color="var(--forge-orange)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--forge-amber)', letterSpacing: '0.12em' }}>
                  // PLATOON RECRUITMENT SPECIFICATIONS
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.25,
                  marginBottom: '1.4rem'
                }}
              >
                {cohort.lead}
              </h3>

              <p style={{ color: 'var(--steel-300)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.2rem' }}>
                {cohort.desc1}
              </p>

              <p style={{ color: 'var(--steel-300)', fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>
                {cohort.desc2}
              </p>
            </div>

            {/* Right: Animated Demographics Progress Bars */}
            <div
              style={{
                background: 'rgba(5, 7, 10, 0.65)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '2rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.6rem', letterSpacing: '0.06em' }}>
                COHORT PROFILE DISTRIBUTION
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {cohort.breakdown.map((item, idx) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '0.45rem' }}>
                      <span style={{ color: 'var(--steel-200)' }}>{item.label}</span>
                      <span style={{ color: 'var(--forge-orange)', fontWeight: 700 }}>{item.pct}%</span>
                    </div>
                    {/* Track */}
                    <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--forge-orange), var(--forge-amber))',
                          boxShadow: '0 0 10px rgba(255, 94, 20, 0.6)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Platoon Doctrine Rules */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              marginTop: '3rem',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '2.5rem'
            }}
          >
            {cohort.rules.map((rule) => (
              <div key={rule.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: 'var(--forge-orange)',
                    background: 'rgba(255, 94, 20, 0.1)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '3px',
                    border: '1px solid var(--border-tactical)'
                  }}
                >
                  {rule.num}
                </span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.3rem' }}>
                    {rule.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--steel-400)', lineHeight: 1.6, margin: 0 }}>
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
