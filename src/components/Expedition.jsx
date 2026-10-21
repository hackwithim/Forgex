import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Expedition() {
  const [activeDay, setActiveDay] = useState('day-1');
  const currentDayData = EXPEDITION_DATA.days.find((d) => d.id === activeDay) || EXPEDITION_DATA.days[0];

  return (
    <section
      id="expedition"
      style={{
        padding: '7rem 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="container">
        {/* Single Authoritative Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <h2 className="section-title">The 3-Day Expedition</h2>
          <p className="section-subtitle">
            Three days of military-led leadership, team challenges and shared experiences. From forming your platoon to putting your leadership to the test.
          </p>
        </motion.div>

        {/* Minimal 3-Episode Tab Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.2rem',
            marginBottom: '3.5rem'
          }}
        >
          {EXPEDITION_DATA.days.map((day) => {
            const isActive = activeDay === day.id;
            return (
              <button
                key={day.id}
                onClick={() => {
                  sound.playSonar();
                  setActiveDay(day.id);
                }}
                className="tactical-frame"
                style={{
                  padding: '1.2rem 1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: isActive ? 'rgba(255, 94, 20, 0.1)' : 'rgba(14, 20, 29, 0.6)',
                  border: isActive ? '1px solid var(--forge-orange)' : '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: isActive ? 'var(--forge-orange)' : 'var(--steel-500)',
                    lineHeight: 1
                  }}
                >
                  {day.number}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      color: isActive ? '#ffffff' : 'var(--steel-300)'
                    }}
                  >
                    {day.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--steel-400)', marginTop: '0.2rem' }}>
                    {day.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Episode Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDayData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3rem',
              alignItems: 'stretch'
            }}
          >
            {/* Left: Timeline Phases */}
            <div className="tactical-frame" style={{ padding: '2.8rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                  {currentDayData.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--forge-orange)', letterSpacing: '0.08em' }}>
                  {currentDayData.motto}
                </div>
              </div>

              {/* Timeline Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    bottom: '10px',
                    left: '6px',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--forge-orange), rgba(255, 94, 20, 0.1))'
                  }}
                />

                {currentDayData.phases.map((phase, pIdx) => (
                  <div key={pIdx} style={{ position: 'relative', paddingLeft: '2.2rem' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '4px',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: '#0a0e14',
                        border: '2px solid var(--forge-orange)'
                      }}
                    />

                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--forge-amber)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                      {phase.tag}
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
                      {phase.title}
                    </h4>

                    {phase.speaker && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--forge-orange)', fontStyle: 'italic', marginBottom: '0.45rem' }}>
                        {phase.speaker}
                      </div>
                    )}

                    <p style={{ fontSize: '0.92rem', color: 'var(--steel-300)', lineHeight: 1.65, margin: 0 }}>
                      {phase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Clean Visual Card */}
            <div className="tactical-frame" style={{ position: 'relative', overflow: 'hidden', minHeight: '460px', padding: 0 }}>
              <img
                src={currentDayData.image}
                alt={currentDayData.name}
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
                  padding: '2.5rem'
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                  {currentDayData.captionTitle}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--steel-300)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  {currentDayData.caption}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
