import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, ChevronRight, Calculator, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Pricing({ onOpenEnlist }) {
  const [selectedPlan, setSelectedPlan] = useState('single');
  const currentPlan = EXPEDITION_DATA.quarters[selectedPlan];

  const gstAmount = Math.round(currentPlan.basePrice * 0.18);
  const totalAmount = currentPlan.basePrice + gstAmount;

  return (
    <section
      id="pricing"
      style={{
        padding: '6rem 0',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Single Authoritative Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <h2 className="section-title">Quarters & Pricing</h2>
          <p className="section-subtitle">
            Choose your quarters and prepare for muster. Space is strictly capped at 20 operatives per platoon.
          </p>
        </motion.div>

        {/* 4 Quick Programme Specs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.2rem',
            marginBottom: '3.5rem'
          }}
        >
          <div className="tactical-frame" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--forge-orange)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <Clock size={14} /> // DURATION
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              3 Programme Days
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--steel-400)', marginTop: '0.2rem' }}>
              3 Nights Luxury Basecamp
            </div>
          </div>

          <div className="tactical-frame" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--forge-orange)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <Calendar size={14} /> // DATES
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              27–30 November 2026
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--steel-400)', marginTop: '0.2rem' }}>
              Hyatt Regency Dehradun
            </div>
          </div>

          <div className="tactical-frame" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--forge-orange)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <Users size={14} /> // PLATOON COHORT
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Max 20 Operatives
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--steel-400)', marginTop: '0.2rem' }}>
              Strictly Capped Roster
            </div>
          </div>

          <div className="tactical-frame" style={{ padding: '1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--forge-orange)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> // INCLUSIONS
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              All-Inclusive Immersion
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--steel-400)', marginTop: '0.2rem' }}>
              Meals, Gear, Mentorship & Mess
            </div>
          </div>
        </div>

        {/* Master Interactive Pricing Engine */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto'
          }}
        >
          {/* Toggle Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2.5rem'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(14, 20, 29, 0.9)',
                border: '1px solid var(--border-tactical)',
                padding: '0.4rem',
                borderRadius: '4px'
              }}
            >
              <button
                onClick={() => {
                  sound.playBlip(750);
                  setSelectedPlan('single');
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '0.75rem 1.8rem',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: selectedPlan === 'single' ? 'var(--forge-orange)' : 'transparent',
                  color: selectedPlan === 'single' ? '#ffffff' : 'var(--steel-400)',
                  boxShadow: selectedPlan === 'single' ? '0 0 16px var(--forge-orange-glow)' : 'none'
                }}
              >
                SINGLE OCCUPANCY
              </button>
              <button
                onClick={() => {
                  sound.playBlip(850);
                  setSelectedPlan('twin');
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '0.75rem 1.8rem',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: selectedPlan === 'twin' ? 'var(--forge-orange)' : 'transparent',
                  color: selectedPlan === 'twin' ? '#ffffff' : 'var(--steel-400)',
                  boxShadow: selectedPlan === 'twin' ? '0 0 16px var(--forge-orange-glow)' : 'none'
                }}
              >
                TWIN-SHARING OCCUPANCY
              </button>
            </div>
          </div>

          {/* Pricing Details Card with Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPlan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="tactical-frame"
              style={{
                padding: '3rem',
                border: '1px solid var(--border-tactical)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 94, 20, 0.15)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                  <span className="hud-tag gold" style={{ marginBottom: '0.6rem' }}>
                    {selectedPlan === 'single' ? 'PRIVATE QUARTERS' : 'SHARED QUARTERS'}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                    {currentPlan.title}
                  </h3>
                  <p style={{ color: 'var(--steel-300)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                    {currentPlan.desc}
                  </p>
                </div>

                {/* Price Display */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 900, color: 'var(--forge-orange)', lineHeight: 1 }}>
                    {currentPlan.formattedPrice}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--steel-400)', marginTop: '0.35rem' }}>
                    + 18% GST (₹{gstAmount.toLocaleString('en-IN')})
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, marginTop: '0.2rem' }}>
                    Total: ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Inclusions List */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', marginBottom: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
                  EXPEDITION PACKAGE INCLUSIONS:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {currentPlan.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                      <Check size={18} color="var(--forge-orange)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--steel-200)', lineHeight: 1.5 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    sound.playConfirm();
                    onOpenEnlist(selectedPlan);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', maxWidth: '420px', padding: '1rem', fontSize: '1.05rem' }}
                >
                  <span>RESERVE {selectedPlan.toUpperCase()} QUARTERS</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
