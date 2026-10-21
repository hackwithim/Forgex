import React from 'react';
import { Shield, ArrowUp, Phone, MapPin, Mail } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Footer() {
  const scrollToTop = () => {
    sound.playSonar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#040608',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4rem 0 2.5rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <img
                src="assets/images/logo.png"
                alt="Forge X"
                style={{ height: '36px', width: 'auto', filter: 'drop-shadow(0 0 8px rgba(255, 94, 20, 0.5))' }}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                OPERATION FORGE X
              </span>
            </div>
            <p style={{ color: 'var(--steel-400)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              India’s First Military-Led Leadership Expedition. A leadership crucible for decision-makers, founders and C-suite executives.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--steel-500)' }}>
              27–30 November 2026 · Hyatt Regency Dehradun
            </div>
          </div>

          {/* Expedition Chapters */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              MISSION CHAPTERS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <a href="#philosophy" style={{ color: 'var(--steel-400)', textDecoration: 'none' }}>02 // The Doctrine</a>
              <a href="#faculty" style={{ color: 'var(--steel-400)', textDecoration: 'none' }}>03 // Faculty Commanders</a>
              <a href="#expedition" style={{ color: 'var(--steel-400)', textDecoration: 'none' }}>04 // 3-Day Expedition</a>
              <a href="#cohort" style={{ color: 'var(--steel-400)', textDecoration: 'none' }}>05 // Cohort Structure</a>
              <a href="#basecamp" style={{ color: 'var(--steel-400)', textDecoration: 'none' }}>07 // Hyatt Regency Basecamp</a>
              <a href="#pricing" style={{ color: 'var(--steel-400)', textDecoration: 'none' }}>08 // Quarters & Tariff</a>
            </div>
          </div>

          {/* Expedition Basecamp Coordinates */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              BASECAMP DISPATCH
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--steel-300)' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--forge-orange)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <span>Hyatt Regency Dehradun Resort and Spa, Malsi Forest, Dehradun, Uttarakhand, India</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--forge-orange)" style={{ flexShrink: 0 }} />
                <span>+91 9979869175 / +91 9408758746</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Radar Back-to-Top */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.2rem',
            fontSize: '0.8rem',
            color: 'var(--steel-500)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div>
            © 2026 OPERATION FORGE X. ALL RIGHTS RESERVED.
          </div>
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 94, 20, 0.1)',
              border: '1px solid var(--border-tactical)',
              color: 'var(--forge-orange)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
