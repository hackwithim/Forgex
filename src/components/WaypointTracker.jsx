import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEngine';

export default function WaypointTracker() {
  const [activeSection, setActiveSection] = useState('hero');

  const chapters = [
    { id: 'hero', label: 'Briefing' },
    { id: 'philosophy', label: 'Doctrine' },
    { id: 'faculty', label: 'Commanders' },
    { id: 'expedition', label: 'Expedition' },
    { id: 'cohort', label: 'Cohort' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'basecamp', label: 'Basecamp' },
    { id: 'pricing', label: 'Quarters' },
    { id: 'faqs', label: 'Intel' },
    { id: 'dispatch', label: 'Muster' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
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
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'none',
        flexDirection: 'column',
        gap: '0.9rem'
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
              textDecoration: 'none',
              padding: '4px'
            }}
            title={ch.label}
          >
            <span
              style={{
                width: isActive ? '8px' : '5px',
                height: isActive ? '8px' : '5px',
                borderRadius: '50%',
                background: isActive ? 'var(--forge-orange)' : 'rgba(255, 255, 255, 0.2)',
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
