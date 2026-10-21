import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Shield, Sparkles, Flame, Award } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Expedition() {
  const [activeDay, setActiveDay] = useState('day-1');
  const currentDayData = EXPEDITION_DATA.days.find((d) => d.id === activeDay) || EXPEDITION_DATA.days[0];

  return (
    <section
      id="expedition"
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
          <h2 className="section-title">The 3-Day Expedition</h2>
          <p className="section-subtitle">
            Three days of military-led leadership, team challenges and shared experiences. From forming your platoon to putting your leadership to the test, each day builds towards a shared achievement.
          </p>
        </motion.div>

        {/* 3-Episode Tab Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.2rem',
            marginBottom: '3rem'
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
                  background: isActive ? 'rgba(255, 94, 20, 0.12)' : 'rgba(14, 20, 29, 0.7)',
                  border: isActive ? '1px solid var(--forge-orange)' : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? '0 0 20px rgba(255, 94, 20, 0.25)' : 'none',
                  transition: 'all 0.3s var(--ease-tactical)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
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
                      letterSpacing: '0.06em',
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

        {/* Active Episode Layout with Smooth Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDayData.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
              alignItems: 'stretch'
            }}
          >
            {/* Left: Detailed Timeline Phases */}
            <div className="tactical-frame" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {currentDayData.name}
                </h3>
                <span className="hud-tag gold">EPISODE {currentDayData.number}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--forge-orange)', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                {currentDayData.motto}
              </div>

              {/* Timeline Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                {/* Vertical Timeline Guide Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    bottom: '10px',
                    left: '7px',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--forge-orange), rgba(255, 94, 20, 0.1))'
                  }}
                />

                {currentDayData.phases.map((phase, pIdx) => (
                  <div key={pIdx} style={{ position: 'relative', paddingLeft: '2.2rem' }}>
                    {/* Glowing Bullet Node */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '4px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#0a0e14',
                        border: '2px solid var(--forge-orange)',
                        boxShadow: '0 0 8px var(--forge-orange)'
                      }}
                    />

                    {/* Phase Tag */}
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--forge-amber)', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                      {phase.tag}
                    </div>

                    {/* Title */}
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
                      {phase.title}
                    </h4>

                    {/* Speaker (if keynote or hosted) */}
                    {phase.speaker && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--forge-orange)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                        {phase.speaker}
                      </div>
                    )}

                    {/* Description */}
                    <p style={{ fontSize: '0.92rem', color: 'var(--steel-300)', lineHeight: 1.65, margin: 0 }}>
                      {phase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: High-Res Episode Card */}
            <div className="tactical-frame" style={{ position: 'relative', overflow: 'hidden', minHeight: '440px', padding: 0 }}>
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
                <span className="hud-tag military" style={{ marginBottom: '0.9rem', width: 'fit-content' }}>
                  EPISODE {currentDayData.number} DEBRIEF
                </span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                  {currentDayData.captionTitle}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--steel-300)', marginTop: '0.5rem', lineHeight: 1.6 }}>
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
