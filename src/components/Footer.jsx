import React from 'react';
import { ArrowUp, Phone, MapPin } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Footer({ onOpenEnlist }) {
  const scrollToTop = () => {
    sound.playSonar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'DOCTRINE', href: '#philosophy' },
    { label: 'FACULTY', href: '#faculty' },
    { label: 'EXPEDITION', href: '#expedition' },
    { label: 'COHORT', href: '#cohort' },
    { label: 'OUTCOMES', href: '#outcomes' },
    { label: 'QUARTERS', href: '#pricing' },
    { label: 'FAQS', href: '#faqs' },
  ];

  return (
    <footer
      style={{
        background: '#040608',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4.5rem 0 2.5rem',
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
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <img
                src="assets/images/logo.png"
                alt="Forge X"
                style={{ height: '40px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255, 94, 20, 0.5))' }}
              />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                OPERATION FORGE X
              </span>
            </div>
            <p style={{ color: 'var(--steel-400)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              India’s First Military-Led Leadership Expedition for decision-makers.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--forge-orange)' }}>
              27–30 November 2026 · Hyatt Regency Dehradun
            </div>
          </div>

          {/* Chapters */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.2rem' }}>
              CHAPTERS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => sound.playBlip(750)}
                  style={{
                    color: 'var(--steel-400)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    transition: 'color 0.2s ease'
                  }}
                  className="footer-nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Communications */}
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.2rem' }}>
              COMMUNICATIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: 'var(--steel-300)' }}>
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

        {/* Bottom Minimal Row */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
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
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--steel-300)',
              width: '36px',
              height: '36px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Scroll to top"
            className="footer-top-btn"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-nav-link:hover {
          color: var(--forge-orange) !important;
        }
        .footer-top-btn:hover {
          border-color: var(--forge-orange) !important;
          color: var(--forge-orange) !important;
        }
      `}</style>
    </footer>
  );
}
