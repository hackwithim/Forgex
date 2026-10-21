import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
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
        padding: '7rem 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="container">
        {/* Single Authoritative Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="section-header"
        >
          <h2 className="section-title">Quarters & Pricing</h2>
          <p className="section-subtitle">
            Experience Operation Forge X with two accommodation options. Space strictly capped at 20 operatives per platoon.
          </p>
        </motion.div>

        {/* Master Interactive Pricing Engine */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {/* Minimalist Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(14, 20, 29, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.35rem',
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
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '0.7rem 1.8rem',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: selectedPlan === 'single' ? 'var(--forge-orange)' : 'transparent',
                  color: selectedPlan === 'single' ? '#ffffff' : 'var(--steel-400)'
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
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '0.7rem 1.8rem',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: selectedPlan === 'twin' ? 'var(--forge-orange)' : 'transparent',
                  color: selectedPlan === 'twin' ? '#ffffff' : 'var(--steel-400)'
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
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                    {currentPlan.title}
                  </h3>
                  <p style={{ color: 'var(--steel-300)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                    {currentPlan.desc}
                  </p>
                </div>

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
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '2rem', marginBottom: '2.5rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
                  PACKAGE INCLUSIONS:
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
                  style={{ width: '100%', maxWidth: '380px', padding: '0.95rem', fontSize: '1.05rem', borderRadius: '2px' }}
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
