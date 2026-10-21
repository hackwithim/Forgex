import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  X, 
  ChevronRight, 
  Compass, 
  Radio, 
  Phone, 
  Shield, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { sound } from '../utils/soundEngine';

export default function Header({ onOpenEnlist }) {
  const [soundOn, setSoundOn] = useState(false);
  const [hudOpen, setHudOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState('BRIEFING');

  const chapters = [
    { id: 'hero', num: '01', label: 'BRIEFING', sub: 'Classified Mission Overview' },
    { id: 'philosophy', num: '02', label: 'DOCTRINE', sub: 'Leadership Under Pressure' },
    { id: 'faculty', num: '03', label: 'FACULTY', sub: 'Decorated Senior Commanders' },
    { id: 'expedition', num: '04', label: 'EXPEDITION', sub: '3-Day Tactical Timeline' },
    { id: 'cohort', num: '05', label: 'COHORT', sub: '20 Operatives Strict Quota' },
    { id: 'outcomes', num: '06', label: 'OUTCOMES', sub: 'Battlefield Instincts' },
    { id: 'basecamp', num: '07', label: 'BASECAMP', sub: 'Hyatt Regency Dehradun' },
    { id: 'pricing', num: '08', label: 'QUARTERS', sub: 'Single & Twin Tariffs' },
    { id: 'faqs', num: '09', label: 'INTEL', sub: 'Essential Mission FAQs' },
    { id: 'dispatch', num: '10', label: 'MUSTER', sub: 'Final Enlistment Protocol' },
  ];

  const desktopNavItems = [
    { label: 'DOCTRINE', href: '#philosophy' },
    { label: 'FACULTY', href: '#faculty' },
    { label: 'EXPEDITION', href: '#expedition' },
    { label: 'QUARTERS', href: '#pricing' },
    { label: 'FAQS', href: '#faqs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Track active chapter for the mobile HUD radar
      const scrollPos = window.scrollY + 220;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(chapters[i].label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = sound.toggle();
    setSoundOn(newState);
  };

  const handleChapterClick = (id) => {
    sound.playSonar();
    setHudOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. TOP EXECUTIVE HEADER (Desktop & Mobile)
         ───────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(5, 7, 10, 0.94)' : 'rgba(5, 7, 10, 0.75)',
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
            height: '70px',
            gap: '1rem'
          }}
        >
          {/* Brand Logo & Name (Guaranteed No Awkward Wrap) */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: '#ffffff',
              flexShrink: 0
            }}
            onClick={() => sound.playBlip(900)}
          >
            <img
              src="assets/images/logo.png"
              alt="Operation Forge X Emblem"
              style={{
                height: '38px',
                width: 'auto',
                filter: 'drop-shadow(0 0 10px rgba(255, 94, 20, 0.5))'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}
            >
              OPERATION FORGE X
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem'
            }}
            className="desktop-nav"
          >
            {desktopNavItems.map((item) => (
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

          {/* Desktop Right Actions (Sound + Primary CTA) */}
          <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

            {/* Desktop Enlist CTA */}
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
          </div>

          {/* Mobile Top Controls: Live Telemetry Indicator & HUD Pill Trigger */}
          <div className="mobile-top-controls" style={{ display: 'none', alignItems: 'center', gap: '0.6rem' }}>
            {/* Subtle Sound Icon on mobile top */}
            <button
              onClick={handleSoundToggle}
              aria-label="Toggle audio"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: soundOn ? 'var(--forge-orange)' : 'var(--steel-400)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Tactical HUD Pill Trigger */}
            <button
              onClick={() => {
                sound.playBlip(1000);
                setHudOpen(true);
              }}
              aria-label="Open tactical mission HUD"
              style={{
                background: 'rgba(255, 94, 20, 0.1)',
                border: '1px solid rgba(255, 94, 20, 0.35)',
                color: '#ffffff',
                padding: '0.45rem 0.85rem',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--forge-orange)',
                  boxShadow: '0 0 8px var(--forge-orange)'
                }}
              />
              <span>HUD</span>
              <Compass size={14} style={{ color: 'var(--forge-orange)' }} />
            </button>
          </div>
        </div>
      </header>


      {/* ─────────────────────────────────────────────────────────────
          2. UNIQUE MOBILE FLOATING TACTICAL COMMAND DOCK (Dynamic Island)
             Thumb-reachable, glassmorphic HUD pill at bottom of viewport
         ───────────────────────────────────────────────────────────── */}
      <div className="mobile-tactical-dock">
        {/* Left: Active Chapter Radar (Tapping opens full mission HUD) */}
        <button
          onClick={() => {
            sound.playSonar();
            setHudOpen(true);
          }}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '0.35rem 0.6rem',
            textAlign: 'left'
          }}
          aria-label="Current chapter waypoint"
        >
          <div
            style={{
              position: 'relative',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'rgba(255, 94, 20, 0.15)',
              border: '1px solid rgba(255, 94, 20, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Compass size={14} style={{ color: 'var(--forge-orange)' }} />
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--forge-orange)',
                boxShadow: '0 0 6px var(--forge-orange)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                color: '#ffffff',
                lineHeight: 1.1
              }}
            >
              {activeChapter}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--steel-400)',
                letterSpacing: '0.06em'
              }}
            >
              TAP FOR HUD
            </span>
          </div>
        </button>

        {/* Center: Thin Laser Divider */}
        <div style={{ width: '1px', height: '26px', background: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Right: Instant Enlist Action Right Under Thumb */}
        <button
          onClick={() => {
            sound.playConfirm();
            onOpenEnlist();
          }}
          className="btn-primary"
          style={{
            padding: '0.55rem 1.1rem',
            fontSize: '0.82rem',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 16px rgba(255, 94, 20, 0.4)'
          }}
        >
          <span>ENLIST</span>
          <ChevronRight size={14} />
        </button>
      </div>


      {/* ─────────────────────────────────────────────────────────────
          3. FULL TACTICAL MISSION HUD DRAWER / HALF-SHEET (Mobile)
             Immersive military overlay with chapter radar & hotlines
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {hudOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                sound.playBlip(600);
                setHudOpen(false);
              }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 7, 10, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 998
              }}
            />

            {/* Tactical Drawer Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '88vh',
                background: 'linear-gradient(180deg, #0e121a 0%, #05070a 100%)',
                borderTop: '1px solid rgba(255, 94, 20, 0.4)',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 -15px 40px rgba(0, 0, 0, 0.9)'
              }}
            >
              {/* Drawer Top Handle & Header */}
              <div
                style={{
                  padding: '1.2rem 1.5rem 1rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative'
                }}
              >
                {/* Pull Indicator Pill */}
                <div
                  style={{
                    width: '40px',
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: '0 auto 1rem'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--forge-orange)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      <Radio size={12} />
                      <span>MISSION CLEARANCE // LEVEL-1</span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '0.05em',
                        marginTop: '0.15rem'
                      }}
                    >
                      TACTICAL COMMAND HUD
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      sound.playBlip(700);
                      setHudOpen(false);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    aria-label="Close HUD"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mission Coordinates Stamp */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--steel-400)',
                    letterSpacing: '0.06em',
                    marginTop: '0.5rem'
                  }}
                >
                  DEHRADUN // 30°18'54"N 78°01'55"E · 27–30 NOV 2026
                </div>
              </div>

              {/* Scrollable Chapter Grid */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                {chapters.map((ch) => {
                  const isActive = activeChapter === ch.label;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleChapterClick(ch.id)}
                      style={{
                        background: isActive ? 'rgba(255, 94, 20, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: isActive ? '1px solid rgba(255, 94, 20, 0.45)' : '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '6px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isActive ? 'var(--forge-orange)' : 'var(--steel-500)',
                            letterSpacing: '0.1em'
                          }}
                        >
                          {ch.num}
                        </span>
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.95rem',
                              fontWeight: 800,
                              color: isActive ? '#ffffff' : 'var(--steel-200)',
                              letterSpacing: '0.06em'
                            }}
                          >
                            {ch.label}
                          </div>
                          <div
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--steel-400)',
                              marginTop: '0.1rem'
                            }}
                          >
                            {ch.sub}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        size={16}
                        style={{
                          color: isActive ? 'var(--forge-orange)' : 'var(--steel-500)',
                          transform: isActive ? 'translateX(2px)' : 'none',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Drawer Bottom Actions: Direct Dispatch & Enlist */}
              <div
                style={{
                  padding: '1rem 1.5rem 1.8rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(5, 7, 10, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {/* Emergency Dispatch Hotline Links */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--steel-300)'
                  }}
                >
                  <span style={{ color: 'var(--steel-500)' }}>DIRECT DISPATCH:</span>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <a
                      href="tel:+919979869175"
                      style={{ color: 'var(--forge-orange)', textDecoration: 'none' }}
                    >
                      +91 9979869175
                    </a>
                    <span style={{ color: 'var(--steel-600)' }}>/</span>
                    <a
                      href="tel:+919408758746"
                      style={{ color: 'var(--forge-orange)', textDecoration: 'none' }}
                    >
                      +91 9408758746
                    </a>
                  </div>
                </div>

                {/* Master Action Button */}
                <button
                  onClick={() => {
                    sound.playConfirm();
                    setHudOpen(false);
                    onOpenEnlist();
                  }}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>ENLIST FOR EXPEDITION</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ─────────────────────────────────────────────────────────────
          4. RESPONSIVE CSS
         ───────────────────────────────────────────────────────────── */}
      <style>{`
        /* Desktop styles */
        .mobile-tactical-dock {
          display: none;
        }

        .nav-link:hover {
          color: var(--forge-orange) !important;
        }

        /* Mobile Responsive Breakpoint (<= 880px) */
        @media (max-width: 880px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;
          }
          .mobile-top-controls {
            display: flex !important;
          }

          /* Floating Tactical Dock at Bottom */
          .mobile-tactical-dock {
            display: flex !important;
            position: fixed;
            bottom: 1.25rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 990;
            width: calc(100% - 2rem);
            max-width: 420px;
            background: rgba(10, 14, 20, 0.92);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 94, 20, 0.45);
            box-shadow: 0 10px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 94, 20, 0.2);
            border-radius: 40px;
            padding: 6px 8px 6px 12px;
            align-items: center;
            justifyContent: space-between;
            animation: dockFloatIn 0.5s ease-out;
          }

          @keyframes dockFloatIn {
            from {
              opacity: 0;
              transform: translate(-50%, 20px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
        }
      `}</style>
    </>
  );
}
