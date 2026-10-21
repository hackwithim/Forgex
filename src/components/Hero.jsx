import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Calendar, MapPin } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Hero({ onOpenEnlist }) {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 60]);
  const opacityHero = useTransform(scrollY, [0, 450], [1, 0.2]);

  // Live countdown to 27 Nov 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-27T08:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5rem 0 3.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Cinematic Background Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(5, 7, 10, 0.45) 0%, #05070a 92%), url("assets/images/hero_expedition.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.38,
          zIndex: 0,
          filter: 'contrast(1.15) brightness(0.9)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          style={{ y: yHero, opacity: opacityHero, textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}
        >
          {/* Master Cinematic Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 5.6rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '1rem',
              textShadow: '0 0 40px rgba(255, 94, 20, 0.25)'
            }}
          >
            OPERATION FORGE X
          </motion.h1>

          {/* Single Focused Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
              fontWeight: 700,
              color: 'var(--forge-orange)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}
          >
            {EXPEDITION_DATA.subtitle}
          </motion.div>

          {/* Concise Narrative Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
              color: 'var(--steel-200)',
              maxWidth: '680px',
              margin: '0 auto 1.6rem',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            {EXPEDITION_DATA.tagline}
          </motion.p>

          {/* Minimalist Date & Venue Anchor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              color: 'var(--steel-300)',
              letterSpacing: '0.06em',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem'
            }}
          >
            <span>{EXPEDITION_DATA.dates}</span>
            <span style={{ color: 'var(--forge-orange)' }}>·</span>
            <span>{EXPEDITION_DATA.location}</span>
          </motion.div>

          {/* Single High-Impact Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{ marginBottom: '3.5rem' }}
          >
            <button
              onClick={() => {
                sound.playConfirm();
                onOpenEnlist();
              }}
              className="btn-primary"
              style={{
                fontSize: '1.05rem',
                padding: '0.95rem 2.5rem',
                borderRadius: '2px'
              }}
            >
              <span>ENLIST NOW</span>
              <ChevronRight size={18} />
            </button>
          </motion.div>

          {/* Sleek Minimalist Countdown (Borderless Floating Display) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '0.6rem 2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 800, color: 'var(--forge-orange)' }}>
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--steel-400)', letterSpacing: '0.12em' }}>DAYS</div>
            </div>
            <span style={{ color: 'var(--steel-700)', fontSize: '1.2rem' }}>:</span>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 800, color: '#ffffff' }}>
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--steel-400)', letterSpacing: '0.12em' }}>HOURS</div>
            </div>
            <span style={{ color: 'var(--steel-700)', fontSize: '1.2rem' }}>:</span>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 800, color: '#ffffff' }}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--steel-400)', letterSpacing: '0.12em' }}>MINS</div>
            </div>
            <span style={{ color: 'var(--steel-700)', fontSize: '1.2rem' }}>:</span>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 800, color: 'var(--forge-amber)' }}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--steel-400)', letterSpacing: '0.12em' }}>SECS</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimal 4-Metric Bar (Spacious & Clean) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            marginTop: '3.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          {EXPEDITION_DATA.stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: 'var(--forge-orange)',
                  lineHeight: 1,
                  marginBottom: '0.35rem'
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', color: '#ffffff' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--steel-400)', marginTop: '0.15rem' }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
