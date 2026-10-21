import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import ForgeSparks from './components/ForgeSparks';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Faculty from './components/Faculty';
import Expedition from './components/Expedition';
import Cohort from './components/Cohort';
import Outcomes from './components/Outcomes';
import Basecamp from './components/Basecamp';
import Pricing from './components/Pricing';
import Faqs from './components/Faqs';
import Dispatch from './components/Dispatch';
import Footer from './components/Footer';
import WaypointTracker from './components/WaypointTracker';
import FacultyModal from './components/FacultyModal';
import EnlistModal from './components/EnlistModal';

export default function App() {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [enlistModalOpen, setEnlistModalOpen] = useState(false);
  const [enlistPlan, setEnlistPlan] = useState('single');

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenEnlist = (plan = 'single') => {
    setEnlistPlan(plan);
    setEnlistModalOpen(true);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-void)' }}>
      {/* Scroll Progress Bar at Top */}
      <ScrollProgressBar />

      {/* Floating Canvas Sparks Particle Background */}
      <ForgeSparks />

      {/* Sticky Telemetry Header */}
      <Header onOpenEnlist={() => handleOpenEnlist('single')} />

      {/* Main Content Flow */}
      <main>
        <Hero onOpenEnlist={() => handleOpenEnlist('single')} />
        <Philosophy />
        <Faculty onSelectOfficer={(officer) => setSelectedOfficer(officer)} />
        <Expedition />
        <Cohort />
        <Outcomes />
        <Basecamp />
        <Pricing onOpenEnlist={(plan) => handleOpenEnlist(plan)} />
        <Faqs />
        <Dispatch onOpenEnlist={() => handleOpenEnlist('single')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Waypoint Chapter Radar (Desktop) */}
      <WaypointTracker />

      {/* Interactive Classified Dossier Modal */}
      <FacultyModal
        officer={selectedOfficer}
        onClose={() => setSelectedOfficer(null)}
      />

      {/* Enlistment Application Modal */}
      <EnlistModal
        isOpen={enlistModalOpen}
        defaultPlan={enlistPlan}
        onClose={() => setEnlistModalOpen(false)}
      />
    </div>
  );
}
