import React from 'react';
import { motion } from 'framer-motion';
import { Trees, Waves, BedDouble, UtensilsCrossed } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';

export default function Basecamp() {
  const { basecamp } = EXPEDITION_DATA;
  const pillarIcons = [Trees, Waves, BedDouble, UtensilsCrossed];

  return (
    <section
      id="basecamp"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(5,7,10,0.7) 0%, rgba(10,14,20,0.95) 100%)'
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
          <h2 className="section-title">Basecamp: Hyatt Regency Dehradun</h2>
          <p className="section-subtitle">
            {basecamp.tagline}
          </p>
        </motion.div>

        {/* Master Basecamp Hero Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8 }}
          className="tactical-frame"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '400px',
            marginBottom: '3rem',
            padding: 0
          }}
        >
          <img
            src="assets/images/hyatt_dehradun.jpg"
            alt="Hyatt Regency Dehradun Resort and Spa foothills basecamp"
            style={{
              width: '100%',
              height: '420px',
              objectFit: 'cover',
              filter: 'contrast(1.08) brightness(0.88)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(5, 7, 10, 0.95) 0%, rgba(5, 7, 10, 0.4) 60%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2.5rem'
            }}
          >
            <span className="hud-tag gold" style={{ marginBottom: '0.8rem', width: 'fit-content' }}>
              HIMALAYAN BASECAMP // MALSI FOREST
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
              {basecamp.name}
            </h3>
            <p style={{ maxWidth: '800px', color: 'var(--steel-200)', fontSize: '1rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
              {basecamp.desc}
            </p>
          </div>
        </motion.div>

        {/* 4 Pillars Grid with Stagger */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.8rem'
          }}
        >
          {basecamp.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, borderColor: 'var(--forge-orange)' }}
                className="tactical-frame"
                style={{ padding: '2rem' }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    background: 'rgba(255, 94, 20, 0.1)',
                    border: '1px solid var(--border-tactical)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.2rem'
                  }}
                >
                  <Icon size={20} color="var(--forge-orange)" />
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>
                  {pillar.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--steel-300)', lineHeight: 1.65, margin: 0 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
