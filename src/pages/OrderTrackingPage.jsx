import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const steps = [
  { title: 'Order confirmed', sub: '8:04 · Payment received' },
  { title: 'Preparing your meal', sub: '8:06 · Kitchen started' },
  { title: 'On the way', sub: 'Your rider is heading to you' },
  { title: 'Delivered', sub: 'Estimated 8:55' },
]

export default function OrderTrackingPage() {
  const navigate = useNavigate()
  const { currentOrder, orderStep, advanceOrderStep } = useStore()

  useEffect(() => {
    if (!currentOrder || orderStep >= 3) return
    const timer = setInterval(() => {
      advanceOrderStep()
    }, 8000)
    return () => clearInterval(timer)
  }, [currentOrder, orderStep, advanceOrderStep])

  if (!currentOrder) {
    return (
      <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', animation: 'float 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '28px' }}>📦</span>
          </div>
          <p style={{ fontSize: '15px', color: '#7A8A6A', marginBottom: '16px' }}>No active order</p>
          <button onClick={() => navigate('/')} style={{
            padding: '12px 28px', borderRadius: '999px', border: 'none',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139,170,61,0.3)',
          }}>Back to home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Top bar */}
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
          width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: 0,
        }}>Order Tracking</h1>
        <div style={{ width: '40px' }} />
      </div>

      {/* Arriving banner */}
      <div style={{ padding: '20px 24px 0', animation: 'fadeInUp 0.3s ease-out both' }}>
        <div className="glass-dark" style={{
          borderRadius: '20px', padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <span style={{ fontSize: '11px', color: 'rgba(139,170,61,0.6)', display: 'block' }}>Order {currentOrder.id}</span>
            <span style={{ fontSize: '17px', fontWeight: 700, color: 'white', fontFamily: "'Space Grotesk', sans-serif" }}>
              Arriving in ~15 min
            </span>
          </div>
          <div style={{
            width: '40px', height: '40px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(139,170,61,0.3)',
            animation: 'float 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '18px' }}>🚴</span>
          </div>
        </div>
      </div>

      {/* Order status timeline */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order status</p>

        {steps.map((step, i) => {
          const done = i <= orderStep
          const active = i === orderStep
          const isLast = i === steps.length - 1

          return (
            <div key={i} style={{
              display: 'flex', gap: '14px',
              animation: `fadeInUp ${0.3 + i * 0.1}s ease-out both`,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', flexShrink: 0 }}>
                <div style={{
                  width: active ? '24px' : '20px', height: active ? '24px' : '20px', borderRadius: '50%',
                  background: done ? 'linear-gradient(135deg, #8BAA3D, #A0C044)' : 'rgba(139,170,61,0.08)',
                  border: active ? '3px solid rgba(139,170,61,0.2)' : done ? 'none' : '2px solid rgba(0,0,0,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, zIndex: 1,
                  boxShadow: active ? '0 0 0 6px rgba(139,170,61,0.1), 0 2px 8px rgba(139,170,61,0.3)' : done ? '0 2px 6px rgba(139,170,61,0.2)' : 'none',
                  transition: 'all 0.4s ease',
                }}>
                  {done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                {!isLast && (
                  <div style={{
                    width: '2px', flex: 1, minHeight: '32px',
                    background: i < orderStep ? 'linear-gradient(180deg, #8BAA3D, #A0C044)' : 'rgba(139,170,61,0.1)',
                    transition: 'background 0.4s',
                    borderRadius: '1px',
                  }} />
                )}
              </div>

              <div style={{ paddingBottom: isLast ? 0 : '16px', flex: 1 }}>
                <span style={{
                  fontSize: '14px', fontWeight: active ? 700 : 600,
                  color: done ? '#1B3C2A' : '#B0ADA4',
                  display: 'block', transition: 'color 0.3s',
                }}>{step.title}</span>
                <span style={{
                  fontSize: '12px',
                  color: done ? '#7A8A6A' : '#B0ADA4',
                  transition: 'color 0.3s',
                }}>{step.sub}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Your order items */}
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your order</p>

        {currentOrder.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: i < currentOrder.items.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '12px',
                background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', flexShrink: 0,
              }}>🥗</div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>{item.name}</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>CHF {item.price.toFixed(2)}</span>
          </div>
        ))}

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '12px', marginTop: '4px',
          borderTop: '1.5px solid #1B3C2A',
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B3C2A' }}>Total</span>
          <span style={{
            fontSize: '16px', fontWeight: 700,
            background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>CHF {currentOrder.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Back to home CTA */}
      <div style={{ padding: '28px 24px 0' }}>
        <button onClick={() => navigate('/')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
          color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: '0 4px 16px rgba(139,170,61,0.3)',
          transition: 'transform 0.2s ease',
        }}>Back to home</button>
      </div>
    </div>
  )
}
