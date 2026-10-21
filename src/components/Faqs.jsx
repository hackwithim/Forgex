import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { EXPEDITION_DATA } from '../utils/data';
import { sound } from '../utils/soundEngine';

export default function Faqs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = EXPEDITION_DATA.faqs.filter((faq) => {
    const q = faq.q.toLowerCase();
    const a = faq.a.toLowerCase();
    const s = searchQuery.toLowerCase();
    return q.includes(s) || a.includes(s);
  });

  const toggleFaq = (idx) => {
    sound.playBlip(idx === openIdx ? 500 : 700);
    setOpenIdx(idx === openIdx ? -1 : idx);
  };

  return (
    <section
      id="faqs"
      style={{
        padding: '6rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(10,14,20,0.95) 0%, rgba(5,7,10,0.7) 100%)'
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
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Essential operational details regarding eligibility, physical readiness, venue, and fee structures.
          </p>
        </motion.div>

        {/* Real-time Search Input Box */}
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto 3rem',
            position: 'relative'
          }}
        >
          <Search
            size={18}
            color="var(--steel-400)"
            style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search intel (e.g. eligibility, fitness, fee, venue, faculty)..."
            style={{
              width: '100%',
              padding: '0.9rem 1.2rem 0.9rem 3rem',
              background: 'rgba(14, 20, 29, 0.8)',
              border: '1px solid var(--border-tactical)',
              borderRadius: '4px',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              outline: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        {/* Accordion Stack */}
        <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="tactical-frame"
                style={{
                  overflow: 'hidden',
                  borderColor: isOpen ? 'var(--border-tactical)' : 'var(--border-subtle)'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.4rem 1.8rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--forge-orange)' : '#ffffff',
                      lineHeight: 1.4,
                      letterSpacing: '0.02em',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0, marginLeft: '1rem', color: isOpen ? 'var(--forge-orange)' : 'var(--steel-400)' }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        style={{
                          padding: '0 1.8rem 1.6rem',
                          color: 'var(--steel-300)',
                          fontSize: '0.95rem',
                          lineHeight: 1.75,
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                          paddingTop: '1.2rem'
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--steel-400)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              NO MATCHING INTEL FOUND FOR "{searchQuery.toUpperCase()}"
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
