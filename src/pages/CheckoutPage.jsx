import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const paymentMethods = [
  {
    id: 'apple_pay', label: 'Apple Pay', sub: 'Touch ID or Face ID',
    icon: (
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#1B3C2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontSize: '11px', fontWeight: 700, lineHeight: 1 }}>Pay</span>
      </div>
    ),
  },
  {
    id: 'twint', label: 'Twint', sub: 'Pay with your Swiss bank app',
    icon: (
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #E91E63 0%, #FF9800 50%, #4CAF50 75%, #2196F3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>W</span>
      </div>
    ),
  },
  {
    id: 'pay_on_site', label: 'Pay on site', sub: 'Cash or card at the counter',
    icon: (
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#E8EDDA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

  // Payment success overlay
  if (paying) {
    return (
      <div style={{
        backgroundColor: '#1B3C2A', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes scaleIn { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }
          @keyframes checkDraw { from { stroke-dashoffset: 40 } to { stroke-dashoffset: 0 } }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
          @keyframes pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.05) } }
        `}</style>

        {/* Animated circle + checkmark */}
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%',
          backgroundColor: '#8BAA3D',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: done ? 'scaleIn 0.4s ease, pulse 0.6s ease 0.4s' : 'scaleIn 0.5s ease',
          boxShadow: '0 8px 32px rgba(139,170,61,0.4)',
        }}>
          {done ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: 'checkDraw 0.4s ease 0.2s both' }}>
              <polyline points="20 6 9 17 4 12" strokeDasharray="40" strokeDashoffset="0" />
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
          animation: 'slideUp 0.4s ease 0.3s both',
        }}>
          {done ? 'Payment confirmed!' : 'Processing payment...'}
        </p>
        <p style={{
          fontSize: '13px', color: '#7A8C6E', marginTop: '8px',
          animation: 'slideUp 0.4s ease 0.5s both',
        }}>
          {done ? 'Your order is on its way' : 'Please wait a moment'}
        </p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <button onClick={() => navigate('/delivery')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', marginRight: '12px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Payment Method</h1>
            <p style={{ fontSize: '12px', color: '#8A8F84', margin: '2px 0 0' }}>CHF {total.toFixed(2)} · {itemCount} article{itemCount !== 1 ? 's' : ''}</p>
          </div>
          <div style={{ width: '32px' }} />
        </div>
      </div>

      {/* Delivery location card */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>
              {deliveryInfo.city || 'Lancy Pont-Rouge'}
            </span>
            <span style={{ fontSize: '12px', color: '#8A8F84' }}>Ready in ~12 min · Delivery</span>
          </div>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#8BAA3D',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Choose payment */}
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', margin: '0 0 10px' }}>Choose payment</p>

        {paymentMethods.map((m) => {
          const selected = paymentMethod === m.id
          return (
            <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{
              backgroundColor: 'white', borderRadius: '16px', padding: '14px 16px',
              marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '14px',
              border: selected ? '2px solid #8BAA3D' : '2px solid transparent',
              cursor: 'pointer',
            }}>
              {m.icon}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{m.label}</span>
                <span style={{ fontSize: '12px', color: '#8A8F84' }}>{m.sub}</span>
              </div>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                border: `2px solid ${selected ? '#5A7A3A' : '#D4D1C8'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#5A7A3A' }} />}
              </div>
            </div>
          )
        })}
      </div>

      {/* Order summary */}
      <div style={{ padding: '16px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', margin: '0 0 10px' }}>Order summary</p>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px' }}>
          {/* Items */}
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

          <div style={{ borderTop: '1px solid #E8EDDA', paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#8A8F84' }}>Subtotal</span>
              <span style={{ fontSize: '13px', color: '#8A8F84' }}>CHF {(subtotal || 30.50).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#8A8F84' }}>Service fees</span>
              <span style={{ fontSize: '13px', color: '#8A8F84' }}>CHF 0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', backgroundColor: '#8BAA3D' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A' }}>-10% streak active</span>
              </div>
              <span style={{ fontSize: '13px', color: '#8BAA3D', fontWeight: 600 }}>- CHF {(streakDiscount || 3.15).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1B3C2A' }}>Total</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1B3C2A' }}>CHF {(total || 27.35).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reward unlock banner */}
      <div style={{ padding: '12px 24px 0' }}>
        <div style={{
          backgroundColor: '#FFF8F0', borderRadius: '14px', padding: '12px 16px',
          display: 'flex', alignItems: 'flex-start', gap: '10px',
        }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#E87A1E', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#E87A1E', display: 'block' }}>This order unlocks a free dish!</span>
            <span style={{ fontSize: '11px', color: '#8A8F84' }}>30th order · 1 free dish applied at next milestone</span>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={handlePay} style={{
          width: '100%', padding: '18px', borderRadius: '999px', border: 'none',
          backgroundColor: '#1B3C2A', color: 'white',
          fontSize: '16px', fontWeight: 600, cursor: 'pointer',
        }}>Pay</button>
      </div>
    </div>
  )
}
