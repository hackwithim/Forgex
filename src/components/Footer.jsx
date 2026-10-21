import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ArrowUp, 
  Phone, 
  MapPin, 
  Compass, 
  Clock, 
  Radio, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Footer({ onOpenEnlist }) {
  const [time, setTime] = useState({ ist: '', utc: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        ist: now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }),
        utc: now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false })
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playSonar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: '01 // MISSION BRIEFING', href: '#hero' },
    { label: '02 // OPERATIONAL DOCTRINE', href: '#philosophy' },
    { label: '03 // FACULTY COMMANDERS', href: '#faculty' },
    { label: '04 // 3-DAY EXPEDITION', href: '#expedition' },
    { label: '05 // PLATOON COHORT', href: '#cohort' },
    { label: '06 // PROGRAMME OUTCOMES', href: '#outcomes' },
    { label: '07 // BASECAMP RETREAT', href: '#basecamp' },
    { label: '08 // QUARTERS & TARIFF', href: '#pricing' },
    { label: '09 // CLASSIFIED INTEL (FAQS)', href: '#faqs' },
  ];

  return (
    <footer
      style={{
        background: '#040608',
        borderTop: '1px solid var(--border-tactical)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Radar Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(255, 94, 20, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Tactical Command Strip */}
      <div
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(7, 10, 15, 0.95)',
          padding: '0.8rem 1.5rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--steel-400)',
          letterSpacing: '0.08em'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {/* Active Radar Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 10px #22c55e',
                animation: 'pulse-dot 1.8s infinite'
              }}
            />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>
              COMMAND TELEMETRY // RADAR GRID SYNCHRONIZED
            </span>
          </div>

          {/* Running Digital Clocks */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={13} color="var(--forge-orange)" />
              <span>IST: <strong style={{ color: 'var(--forge-amber)' }}>{time.ist || '11:00:00'}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>UTC: <strong style={{ color: '#ffffff' }}>{time.utc || '05:30:00'}</strong></span>
            </div>
            <div style={{ display: 'none', alignItems: 'center', gap: '0.4rem' }} className="footer-coords">
              <Compass size={13} color="var(--forge-orange)" />
              <span>30°18'54"N 78°01'55"E · 700M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Command Center Grid */}
      <div className="container" style={{ padding: '4.5rem 1.5rem 3.5rem', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Column 1: Brand & Strategic Brief */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.2rem' }}>
                <img
                  src="assets/images/logo.png"
                  alt="Operation Forge X Emblem"
                  style={{
                    height: '46px',
                    width: 'auto',
                    filter: 'drop-shadow(0 0 12px rgba(255, 94, 20, 0.6))'
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: '#ffffff',
                      lineHeight: 1.1
                    }}
                  >
                    OPERATION FORGE X
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.14em',
                      color: 'var(--forge-orange)',
                      textTransform: 'uppercase'
                    }}
                  >
                    Military Leadership Expedition
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--steel-300)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.4rem' }}>
                India’s premier military-inspired leadership crucible for founders, decision-makers, and senior executives. Led by decorated veterans of the Indian Army, Navy, and Air Force.
              </p>

              <div
                style={{
                  background: 'rgba(255, 94, 20, 0.08)',
                  border: '1px solid var(--border-tactical)',
                  borderRadius: '3px',
                  padding: '0.8rem 1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--forge-amber)'
                }}
              >
                <Radio size={14} color="var(--forge-orange)" />
                <span>27–30 NOV 2026 · HYATT DEHRADUN</span>
              </div>
            </div>
          </div>

          {/* Column 2: Mission Chapters */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.08em',
                marginBottom: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ width: '4px', height: '14px', background: 'var(--forge-orange)', display: 'inline-block' }} />
              <span>MISSION CHAPTERS</span>
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
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                  className="footer-link"
                >
                  <ChevronRight size={13} color="var(--forge-orange)" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Basecamp Communication Lines */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.08em',
                marginBottom: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ width: '4px', height: '14px', background: 'var(--forge-orange)', display: 'inline-block' }} />
              <span>BASECAMP COMMUNICATIONS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Phone Lines */}
              <div
                style={{
                  background: 'rgba(14, 20, 29, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--forge-orange)', letterSpacing: '0.08em' }}>
                  // DIRECT EXPEDITION LINES
                </div>
                {EXPEDITION_DATA.phones.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    onClick={() => sound.playBlip(900)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      transition: 'color 0.2s ease'
                    }}
                    className="phone-link"
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={14} color="var(--forge-orange)" />
                      {phone.number}
                    </span>
                    <ExternalLink size={12} color="var(--steel-500)" />
                  </a>
                ))}
              </div>

              {/* Basecamp Location */}
              <div
                style={{
                  background: 'rgba(14, 20, 29, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  padding: '1rem'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--forge-amber)', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                  // HIMALAYAN BASECAMP VENUE
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--steel-300)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <MapPin size={16} color="var(--forge-orange)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <span>Hyatt Regency Dehradun Resort and Spa, Malsi Forest, Dehradun, Uttarakhand, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Fast Enlistment Action Card */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '0.08em',
                marginBottom: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ width: '4px', height: '14px', background: 'var(--forge-orange)', display: 'inline-block' }} />
              <span>PLATOON CLEARANCE</span>
            </div>

            <div
              className="tactical-frame"
              style={{
                padding: '1.6rem',
                border: '1px solid var(--border-tactical)',
                background: 'rgba(14, 20, 29, 0.9)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <Shield size={16} color="var(--forge-orange)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--forge-orange)', fontWeight: 700 }}>
                  LIMITED CLEARANCE
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>
                Max 20 Operatives / Platoon
              </div>

              <p style={{ color: 'var(--steel-300)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                Positions are allotted strictly upon committee approval. Secure your candidate profile now.
              </p>

              <button
                onClick={() => {
                  sound.playConfirm();
                  if (onOpenEnlist) onOpenEnlist();
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>APPLY FOR CLEARANCE</span>
                <ChevronRight size={16} />
              </button>

              <a
                href="https://wa.me/919979869175?text=Hello%20Operation%20Forge%20X%20Team%2C%20I%20would%20like%20to%20inquire%20about%20the%20leadership%20expedition."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(800)}
                style={{
                  marginTop: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: 'var(--steel-400)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  borderRadius: '3px',
                  transition: 'color 0.2s ease'
                }}
                className="whatsapp-query"
              >
                <MessageSquare size={13} color="#25D366" />
                <span>DIRECT WHATSAPP INQUIRY</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tactical Security & Legal Clearance Row */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--steel-500)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
            <span>© 2026 OPERATION FORGE X. ALL RIGHTS RESERVED.</span>
            <span style={{ color: 'var(--steel-700)' }}>|</span>
            <span>CLEARANCE: RESTRICTED // DECISION-MAKERS ONLY</span>
            <span style={{ color: 'var(--steel-700)' }}>|</span>
            <span>PROTOCOL ID: FX-DEHRADUN-2026-ALPHA</span>
          </div>

          {/* Tactical Spinning Radar Back-to-Top Button */}
          <button
            onClick={scrollToTop}
            title="Scan and return to summit briefing"
            style={{
              background: 'rgba(255, 94, 20, 0.1)',
              border: '1px solid var(--border-tactical)',
              color: 'var(--forge-orange)',
              padding: '0.5rem 1rem',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              transition: 'all 0.25s var(--ease-tactical)',
              boxShadow: '0 0 15px rgba(255, 94, 20, 0.15)'
            }}
            className="radar-top-btn"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .footer-coords { display: flex !important; }
        }
        .footer-link:hover {
          color: #ffffff !important;
          transform: translateX(4px);
        }
        .phone-link:hover {
          color: var(--forge-orange) !important;
        }
        .whatsapp-query:hover {
          color: #ffffff !important;
        }
        .radar-top-btn:hover {
          background: var(--forge-orange) !important;
          color: #ffffff !important;
          box-shadow: 0 0 25px var(--forge-orange-glow) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
