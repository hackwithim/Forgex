import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ChevronRight } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function Header({ onOpenEnlist }) {
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = sound.toggle();
    setSoundOn(newState);
  };

  const navItems = [
    { label: 'BRIEFING', href: '#hero' },
    { label: 'DOCTRINE', href: '#philosophy' },
    { label: 'FACULTY', href: '#faculty' },
    { label: '3-DAY MISSION', href: '#expedition' },
    { label: 'COHORT', href: '#cohort' },
    { label: 'OUTCOMES', href: '#outcomes' },
    { label: 'BASECAMP', href: '#basecamp' },
    { label: 'QUARTERS', href: '#pricing' },
    { label: 'INTEL', href: '#faqs' },
  ];

  return (
    <>
      {/* Tactical Telemetry Ribbon */}
      <div
        style={{
          background: '#040608',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '0.35rem 1.5rem',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--steel-400)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          letterSpacing: '0.08em',
          position: 'relative',
          zIndex: 101
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 6px #4ade80'
            }}
          />
          <span>MISSION STATUS: ACTIVE // DEHRADUN EXPEDITION</span>
        </div>
        <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="telemetry-mid">
          <span>COORDINATES: 30°18'54"N 78°01'55"E</span>
          <span>ELEVATION: 700M</span>
          <span>27–30 NOV 2026</span>
        </div>
        <div>
          <span>ENLISTMENT CLEARANCE: LEVEL-1</span>
        </div>
      </div>

      {/* Main Tactical Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(5, 7, 10, 0.95)' : 'rgba(5, 7, 10, 0.82)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}
        >
          {/* Brand Logo & Title */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              textDecoration: 'none',
              color: '#ffffff'
            }}
            onClick={() => sound.playBlip(900)}
          >
            <img
              src="assets/images/logo.png"
              alt="Operation Forge X Emblem"
              style={{
                height: '42px',
                width: 'auto',
                filter: 'drop-shadow(0 0 10px rgba(255, 94, 20, 0.6))'
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  lineHeight: 1.1,
                  color: '#ffffff'
                }}
              >
                OPERATION FORGE X
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  color: 'var(--forge-orange)',
                  textTransform: 'uppercase'
                }}
              >
                Military Leadership Expedition
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--steel-300)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={() => sound.playBlip(750)}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Controls (Sound Toggle & Enlist CTA) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Disable tactical audio telemetry' : 'Enable tactical audio telemetry'}
              style={{
                background: soundOn ? 'rgba(255, 94, 20, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: soundOn ? '1px solid var(--forge-orange)' : '1px solid var(--border-subtle)',
                color: soundOn ? 'var(--forge-orange)' : 'var(--steel-400)',
                width: '38px',
                height: '38px',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Enlist CTA */}
            <button
              onClick={() => {
                sound.playConfirm();
                onOpenEnlist();
              }}
              className="btn-primary"
              style={{
                padding: '0.6rem 1.4rem',
                fontSize: '0.9rem'
              }}
            >
              <span>ENLIST NOW</span>
              <ChevronRight size={16} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'none'
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            background: 'rgba(5, 7, 10, 0.98)',
            borderBottom: '1px solid var(--border-tactical)',
            padding: '1.5rem',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.05em'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 768px) {
          .telemetry-mid { display: flex !important; }
        }
        .nav-link:hover {
          color: var(--forge-orange) !important;
        }
      `}</style>
    </>
  );
}
