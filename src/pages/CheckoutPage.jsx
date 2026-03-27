import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import appleSvg from '../assets/apple.svg'
import twintPng from '../assets/twint.png'

const ApplePayIcon = () => (
  <div style={{
    width: '42px', height: '42px', borderRadius: '14px',
    background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <img src={appleSvg} alt="Apple Pay" style={{ width: '22px', height: '22px', filter: 'invert(1)' }} />
  </div>
)

const TwintIcon = () => (
  <div style={{
    width: '42px', height: '42px', borderRadius: '14px',
    overflow: 'hidden',
  }}>
    <img src={twintPng} alt="Twint" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
)

const paymentMethods = [
  {
    id: 'apple_pay', label: 'Apple Pay', sub: 'Touch ID or Face ID',
    icon: <ApplePayIcon />,
  },
  {
    id: 'twint', label: 'Twint', sub: 'Pay with your Swiss bank app',
    icon: <TwintIcon />,
  },
  {
    id: 'pay_on_site', label: 'Pay on site', sub: 'Cash or card at the counter',
    icon: (
      <div style={{
        width: '42px', height: '42px', borderRadius: '14px',
        background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#5A7A3A' }}>fr.</span>
      </div>
    ),
  },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, getCartTotal, placeOrder, paymentMethod, setPaymentMethod, deliveryInfo } = useStore()
  const subtotal = getCartTotal()
  const serviceFee = 0
  const streakDiscount = subtotal > 0 ? +(subtotal * 0.10).toFixed(2) : 0
  const total = +(subtotal - streakDiscount + serviceFee).toFixed(2)
  const itemCount = cart.length

  const [paying, setPaying] = useState(false)
  const [done, setDone] = useState(false)

  const handlePay = () => {
    setPaying(true)
    setTimeout(() => {
      placeOrder()
      setDone(true)
      setTimeout(() => navigate('/order-confirm'), 900)
    }, 1400)
  }

  if (paying) {
    return (
      <div style={{
        background: 'linear-gradient(180deg, #1B3C2A 0%, #0D2418 100%)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}>
        <div style={{
          width: '110px', height: '110px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: done ? 'scaleIn 0.4s ease' : 'scaleIn 0.5s ease',
          boxShadow: '0 8px 40px rgba(139,170,61,0.4)',
        }}>
          {done ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <div style={{
              width: '28px', height: '28px', border: '3px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white', borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
            }} />
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: 'white', marginTop: '24px', textAlign: 'center',
          animation: 'fadeInUp 0.4s ease 0.3s both',
        }}>
          {done ? 'Payment confirmed!' : 'Processing payment...'}
        </p>
        <p style={{
          fontSize: '13px', color: 'rgba(139,170,61,0.7)', marginTop: '8px',
          animation: 'fadeInUp 0.4s ease 0.5s both',
        }}>
          {done ? 'Your order is on its way' : 'Please wait a moment'}
        </p>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <button onClick={() => navigate('/delivery')} style={{
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
            width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginRight: '12px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
              background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>Payment Method</h1>
            <p style={{ fontSize: '12px', color: '#7A8A6A', margin: '2px 0 0' }}>CHF {total.toFixed(2)} · {itemCount} article{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <div style={{ width: '40px' }} />
        </div>
      </div>

      {/* Delivery location card */}
      <div style={{ padding: '16px 24px 0' }}>
        <div className="glass-card" style={{
          borderRadius: '20px', padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>
              {deliveryInfo.city || 'Lancy Pont-Rouge'}
            </span>
            <span style={{ fontSize: '12px', color: '#7A8A6A' }}>Ready in ~12 min · Delivery</span>
          </div>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(139,170,61,0.3)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Choose payment */}
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', margin: '0 0 10px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Choose payment</p>

        {paymentMethods.map((m, i) => {
          const selected = paymentMethod === m.id
          return (
            <div key={m.id} onClick={() => setPaymentMethod(m.id)} className="hover-lift" style={{
              background: selected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '20px', padding: '14px 16px',
              marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '14px',
              border: selected ? '1.5px solid rgba(139,170,61,0.4)' : '1px solid rgba(255,255,255,0.5)',
              cursor: 'pointer',
              boxShadow: selected ? '0 4px 16px rgba(139,170,61,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
              transition: 'all 0.25s ease',
              animation: `fadeInUp ${0.3 + i * 0.08}s ease-out both`,
            }}>
              {m.icon}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{m.label}</span>
                <span style={{ fontSize: '12px', color: '#7A8A6A' }}>{m.sub}</span>
              </div>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                border: `2px solid ${selected ? '#8BAA3D' : 'rgba(0,0,0,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}>
                {selected && <div style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
                }} />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Order summary */}
      <div style={{ padding: '16px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', margin: '0 0 10px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Order summary</p>
        <div className="glass-card" style={{ borderRadius: '20px', padding: '16px' }}>
          {cart.length > 0 ? cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>{item.name}</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>CHF {item.price.toFixed(2)}</span>
            </div>
          )) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>Tropical Shrimp</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>CHF 15.50</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>Build your own bowl</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>CHF 15.00</span>
              </div>
            </>
          )}

          <div style={{ borderTop: '1px solid rgba(139,170,61,0.12)', paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>Subtotal</span>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>CHF {(subtotal || 30.50).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>Service fees</span>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>CHF 0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '6px',
                  background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
                }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A' }}>-10% streak active</span>
              </div>
              <span style={{ fontSize: '13px', color: '#8BAA3D', fontWeight: 600 }}>- CHF {(streakDiscount || 3.15).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1B3C2A' }}>Total</span>
              <span style={{
                fontSize: '18px', fontWeight: 700,
                background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>CHF {(total || 27.35).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reward unlock banner */}
      <div style={{ padding: '12px 24px 0' }}>
        <div style={{
          background: 'rgba(232,122,30,0.08)',
          border: '1px solid rgba(232,122,30,0.15)',
          borderRadius: '18px', padding: '12px 16px',
          display: 'flex', alignItems: 'flex-start', gap: '10px',
        }}>
          <div style={{
            width: '18px', height: '18px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #E87A1E, #F5A623)',
            flexShrink: 0, marginTop: '2px',
          }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#E87A1E', display: 'block' }}>This order unlocks a free dish!</span>
            <span style={{ fontSize: '11px', color: '#7A8A6A' }}>30th order · 1 free dish applied at next milestone</span>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={handlePay} style={{
          width: '100%', padding: '18px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
          color: 'white', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: '0 4px 16px rgba(27,60,42,0.25)',
          transition: 'transform 0.2s ease',
        }}>Pay</button>
      </div>
    </div>
  )
}
