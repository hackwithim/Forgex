import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ChevronRight } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function Header({ onOpenEnlist }) {
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = sound.toggle();
    setSoundOn(newState);
  };

  const navItems = [
    { label: 'DOCTRINE', href: '#philosophy' },
    { label: 'FACULTY', href: '#faculty' },
    { label: 'EXPEDITION', href: '#expedition' },
    { label: 'QUARTERS', href: '#pricing' },
    { label: 'FAQS', href: '#faqs' },
  ];

  return (
    <>
      {/* Sleek Minimalist Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(5, 7, 10, 0.92)' : 'rgba(5, 7, 10, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.35s ease'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px'
          }}
        >
          {/* Minimal Brand Logo */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
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
                filter: 'drop-shadow(0 0 10px rgba(255, 94, 20, 0.5))'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff'
              }}
            >
              OPERATION FORGE X
            </span>
          </a>

          {/* Desktop Navigation Links (Clean & Spacious) */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem'
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
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

          {/* Actions: Sound Toggle & Enlist CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Mute telemetry audio' : 'Enable telemetry audio'}
              style={{
                background: 'transparent',
                border: 'none',
                color: soundOn ? 'var(--forge-orange)' : 'var(--steel-500)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>

            {/* Enlist CTA */}
            <button
              onClick={() => {
                sound.playConfirm();
                onOpenEnlist();
              }}
              className="btn-primary"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.88rem',
                borderRadius: '2px'
              }}
            >
              <span>ENLIST</span>
              <ChevronRight size={15} />
            </button>

            {/* Mobile Toggle */}
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
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            left: 0,
            right: 0,
            background: 'rgba(5, 7, 10, 0.98)',
            borderBottom: '1px solid var(--border-tactical)',
            padding: '2rem 1.5rem',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
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
                fontSize: '1.2rem',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.06em'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-link:hover {
          color: var(--forge-orange) !important;
        }
      `}</style>
    </>
  );
}
