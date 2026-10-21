import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileText, ChevronRight } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Faculty({ onSelectOfficer }) {
  const [filter, setFilter] = useState('all');

  const filterButtons = [
    { id: 'all', label: 'ALL FACULTY (7)' },
    { id: 'army', label: 'INDIAN ARMY' },
    { id: 'airforce', label: 'AIR FORCE' },
    { id: 'navy', label: 'NAVY & DEFTECH' },
  ];

  const filteredFaculty = EXPEDITION_DATA.faculty.filter((officer) => {
    if (filter === 'all') return true;
    return officer.branch === filter;
  });

  return (
    <section
      id="faculty"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(5,7,10,0.5) 0%, rgba(10,14,20,0.95) 100%)'
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
          <h2 className="section-title">Faculty Commanders</h2>
          <p className="section-subtitle">
            Led by retired officers of the Indian Army, Air Force and Navy, Forge X draws on experience across command, operational decision-making, discipline and leadership development.
          </p>
        </motion.div>

        {/* Tactical Branch Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}
        >
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                sound.playBlip(800);
                setFilter(btn.id);
              }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '0.65rem 1.4rem',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'all 0.25s var(--ease-tactical)',
                border: filter === btn.id ? '1px solid var(--forge-orange)' : '1px solid var(--border-subtle)',
                background: filter === btn.id ? 'rgba(255, 94, 20, 0.15)' : 'rgba(14, 20, 29, 0.7)',
                color: filter === btn.id ? '#ffffff' : 'var(--steel-400)',
                boxShadow: filter === btn.id ? '0 0 16px rgba(255, 94, 20, 0.3)' : 'none'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* 7 Faculty Cards Grid with AnimatePresence */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence>
            {filteredFaculty.map((officer) => (
              <motion.div
                key={officer.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.45 }}
                className="tactical-frame"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  sound.playModalOpen();
                  onSelectOfficer(officer);
                }}
              >
                {/* Officer Portrait */}
                <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
                  <img
                    src={officer.image}
                    alt={officer.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.08) brightness(0.92)',
                      transition: 'transform 0.5s ease'
                    }}
                    className="faculty-img"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14,20,29,0.95) 0%, transparent 60%)'
                    }}
                  />
                  {/* Branch Pill Tag */}
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <span className="hud-tag military">{officer.branchName}</span>
                  </div>
                  {/* Rank/Role Tag */}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <span className="hud-tag gold">{officer.tag}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.25,
                        marginBottom: '0.35rem'
                      }}
                    >
                      {officer.name}
                    </h3>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--forge-amber)',
                        letterSpacing: '0.06em',
                        marginBottom: '0.9rem'
                      }}
                    >
                      {officer.role}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--steel-300)', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                      {officer.bio}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'var(--forge-orange)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FileText size={15} />
                      VIEW CLASSIFIED DOSSIER
                    </span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .tactical-frame:hover .faculty-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
