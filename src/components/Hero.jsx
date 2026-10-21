import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Calendar, MapPin, ChevronRight, Compass } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Hero({ onOpenEnlist }) {
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 600], [0, 80]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0.3]);

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
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5rem 0 4rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Hero Image with Tactical Atmospheric Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(5, 7, 10, 0.4) 0%, #05070a 90%), url("assets/images/hero_expedition.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.35,
          zIndex: 0,
          filter: 'contrast(1.15) saturate(0.9)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          style={{ y: yHeroText, opacity: opacityHero, textAlign: 'center', maxWidth: '980px', margin: '0 auto' }}
        >
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '1.25rem' }}
          >
            <span className="hud-tag">
              <Shield size={14} />
              CLASSIFIED LEADERSHIP EXPEDITION // DEHRADUN
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '1rem',
              textShadow: '0 0 35px rgba(255, 94, 20, 0.3)'
            }}
          >
            OPERATION FORGE X
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
              fontWeight: 700,
              color: 'var(--forge-orange)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
              textShadow: '0 0 15px rgba(255, 94, 20, 0.4)'
            }}
          >
            {EXPEDITION_DATA.subtitle}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--steel-200)',
              maxWidth: '780px',
              margin: '0 auto 1.8rem',
              lineHeight: 1.65,
              fontWeight: 400
            }}
          >
            {EXPEDITION_DATA.tagline}
          </motion.p>

          {/* Date & Location Chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.2rem',
              padding: '0.75rem 1.6rem',
              background: 'rgba(14, 20, 29, 0.85)',
              border: '1px solid var(--border-tactical)',
              borderRadius: '3px',
              backdropFilter: 'blur(10px)',
              marginBottom: '2.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              <Calendar size={16} color="var(--forge-orange)" />
              <span>{EXPEDITION_DATA.dates}</span>
            </div>
            <span style={{ color: 'var(--steel-600)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              <MapPin size={16} color="var(--forge-orange)" />
              <span>{EXPEDITION_DATA.location}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.2rem',
              justifyContent: 'center',
              marginBottom: '3.5rem'
            }}
          >
            <button
              onClick={() => {
                sound.playConfirm();
                onOpenEnlist();
              }}
              className="btn-primary"
              style={{ fontSize: '1.05rem', padding: '1rem 2.4rem' }}
            >
              <span>ENLIST FOR EXPEDITION</span>
              <ChevronRight size={18} />
            </button>
            <a
              href="#expedition"
              className="btn-secondary"
              onClick={() => sound.playBlip(700)}
            >
              <Compass size={18} />
              <span>EXPLORE MISSION SCHEDULE</span>
            </a>
          </motion.div>

          {/* Live Countdown Clock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="tactical-frame"
            style={{
              maxWidth: '680px',
              margin: '0 auto 3rem',
              padding: '1.2rem 1.8rem',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: 'var(--forge-orange)', lineHeight: 1 }}>
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--steel-400)', marginTop: '0.35rem' }}>
                DAYS
              </div>
            </div>
            <div style={{ color: 'var(--steel-600)', fontSize: '1.5rem', fontWeight: 300 }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--steel-400)', marginTop: '0.35rem' }}>
                HOURS
              </div>
            </div>
            <div style={{ color: 'var(--steel-600)', fontSize: '1.5rem', fontWeight: 300 }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--steel-400)', marginTop: '0.35rem' }}>
                MINUTES
              </div>
            </div>
            <div style={{ color: 'var(--steel-600)', fontSize: '1.5rem', fontWeight: 300 }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 800, color: 'var(--forge-amber)', lineHeight: 1 }}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--steel-400)', marginTop: '0.35rem' }}>
                SECONDS
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 4 Core Stat Cards with Staggered Entrance */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginTop: '1.5rem'
          }}
        >
          {EXPEDITION_DATA.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4, borderColor: 'var(--forge-orange)' }}
              className="tactical-frame"
              style={{
                padding: '1.4rem 1.6rem',
                borderLeft: '3px solid var(--forge-orange)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: 'var(--forge-orange)',
                  lineHeight: 1
                }}
              >
                {stat.value}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.06em', color: '#ffffff' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--steel-400)', marginTop: '0.2rem' }}>
                  {stat.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
