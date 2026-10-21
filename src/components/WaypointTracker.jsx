import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEngine';

export default function WaypointTracker() {
  const [activeSection, setActiveSection] = useState('hero');

  const chapters = [
    { id: 'hero', label: '01 BRIEFING' },
    { id: 'philosophy', label: '02 DOCTRINE' },
    { id: 'faculty', label: '03 COMMANDERS' },
    { id: 'expedition', label: '04 3-DAY EXPEDITION' },
    { id: 'cohort', label: '05 PLATOON' },
    { id: 'outcomes', label: '06 OUTCOMES' },
    { id: 'basecamp', label: '07 BASECAMP' },
    { id: 'pricing', label: '08 QUARTERS' },
    { id: 'faqs', label: '09 INTEL' },
    { id: 'dispatch', label: '10 MUSTER' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(chapters[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'none',
        flexDirection: 'column',
        gap: '0.8rem'
      }}
      className="desktop-waypoint-tracker"
    >
      {chapters.map((ch) => {
        const isActive = activeSection === ch.id;
        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            onClick={() => sound.playSonar()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.6rem',
              textDecoration: 'none'
            }}
            title={ch.label}
          >
            {isActive && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--forge-orange)',
                  background: 'rgba(5, 7, 10, 0.9)',
                  padding: '0.2rem 0.6rem',
                  border: '1px solid var(--border-tactical)',
                  borderRadius: '2px',
                  whiteSpace: 'nowrap'
                }}
              >
                {ch.label}
              </span>
            )}
            <span
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                borderRadius: '50%',
                background: isActive ? 'var(--forge-orange)' : 'var(--steel-700)',
                boxShadow: isActive ? '0 0 10px var(--forge-orange)' : 'none',
                transition: 'all 0.25s ease'
              }}
            />
          </a>
        );
      })}
      <style>{`
        @media (min-width: 1200px) {
          .desktop-waypoint-tracker { display: flex !important; }
        }
      `}</style>
    </aside>
  );
}
