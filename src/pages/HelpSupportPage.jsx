import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const faqs = [
  { q: 'How does delivery work?', a: 'We deliver within a 3 to 5 km radius of our restaurant. Orders above CHF 25 within 3 km get free delivery. For orders under CHF 25, a CHF 3.50 delivery fee applies within 3 km. We also deliver up to 5 km for CHF 7.60. Simply add items to your cart, choose "Delivery", enter your address, and pay in advance through the app. Your meal will arrive in 15 to 30 minutes depending on your distance.' },
  { q: 'Can I modify my order?', a: 'You can modify your order within 2 minutes after placing it. After that, the kitchen starts preparing your meal and changes are no longer possible. To modify, go to your order status page and tap "Edit order".' },
  { q: 'How do rewards and streaks work?', a: 'Every order earns you points toward rewards. Keep ordering regularly to build a streak — the longer your streak, the bigger the discount. At 5 orders you unlock -3%, at 10 orders -5%, and at 20 orders -8% on every order. Scan your QR code at the counter or order via the app to track your progress.' },
  { q: 'What payment methods do you accept?', a: 'We accept Apple Pay and Twint. All payments are processed securely through the app. Cash or Visa, Mastercard is accepted for dine-in and pick-up orders only.' },
  { q: 'How is my calorie goal calculated?', a: 'Your daily calorie goal is calculated using the Mifflin-St Jeor formula, based on your age, weight, height, gender, and activity level. We then adjust it according to your goal — lose weight, maintain, or build muscle. You can update your profile anytime to recalculate.' },
]

export default function HelpSupportPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Help and Support</h1>
        <div style={{ width: '28px' }} />
      </div>

      {/* FAQ */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Frequently ask question</p>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '4px 0', overflow: 'hidden' }}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div key={i} style={{
                borderBottom: i < faqs.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
                animation: `fadeInUp ${0.2 + i * 0.05}s ease-out both`,
              }}>
                <div onClick={() => setOpenFaq(isOpen ? null : i)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 18px', cursor: 'pointer',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: isOpen ? 700 : 500, color: '#1B3C2A' }}>{faq.q}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0ADA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, marginLeft: '8px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 18px 16px' }}>
                    <p style={{ fontSize: '13px', color: '#7A8A6A', lineHeight: 1.5, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Contact us */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Contact us</p>

        {/* Phone */}
        <div onClick={() => window.open('tel:+41221234567')} style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: '14px',
          marginBottom: '10px', cursor: 'pointer',
          animation: 'fadeInUp 0.4s ease-out both',
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>+41 22 123 45 67</span>
            <span style={{ fontSize: '11px', color: '#7A8A6A' }}>Call the restaurant</span>
          </div>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 2px 8px rgba(139,170,61,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </div>
        </div>

        {/* Email */}
        <div style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: '14px',
          cursor: 'pointer',
          animation: 'fadeInUp 0.4s ease-out both',
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22 6 12 13 2 6" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>Email us</span>
            <span style={{ fontSize: '11px', color: '#7A8A6A' }}>support@fitfork.ch</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0ADA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* More */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>More</p>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '4px 0', overflow: 'hidden' }}>
          {[
            { label: 'Report a problem', icon: '🐛' },
            { label: 'About FitFork', sub: 'Version 1.0.0', icon: '🍴' },
          ].map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 18px',
              borderBottom: i === 0 ? '1px solid rgba(139,170,61,0.1)' : 'none',
              cursor: 'pointer',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
              }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{item.label}</span>
                {item.sub && <span style={{ fontSize: '11px', color: '#7A8A6A' }}>{item.sub}</span>}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0ADA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div style={{ padding: '28px 24px 0' }}>
        <button onClick={() => navigate('/profile')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Back</button>
      </div>
    </div>
  )
}
