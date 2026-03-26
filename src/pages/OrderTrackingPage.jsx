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

  // Auto-advance every 8 seconds for demo
  useEffect(() => {
    if (!currentOrder || orderStep >= 3) return
    const timer = setInterval(() => {
      advanceOrderStep()
    }, 8000)
    return () => clearInterval(timer)
  }, [currentOrder, orderStep, advanceOrderStep])

  if (!currentOrder) {
    return (
      <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '15px', color: '#8A8F84', marginBottom: '16px' }}>No active order</p>
          <button onClick={() => navigate('/')} style={{
            padding: '12px 28px', borderRadius: '999px', border: 'none',
            backgroundColor: '#8BAA3D', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>Back to home</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Top bar */}
      <div style={{
        padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Order Tracking</h1>
        <div style={{ width: '28px' }} />
      </div>

      {/* Arriving banner */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{
          backgroundColor: '#1B3C2A', borderRadius: '16px', padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <span style={{ fontSize: '11px', color: '#7A8C6E', display: 'block' }}>Order {currentOrder.id}</span>
            <span style={{ fontSize: '17px', fontWeight: 700, color: 'white', fontFamily: "'Space Grotesk', sans-serif" }}>
              Arriving in ~15 min
            </span>
          </div>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: '#8BAA3D', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '16px' }}>🚴</span>
          </div>
        </div>
      </div>

      {/* Order status timeline */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', fontWeight: 500, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order status</p>

        {steps.map((step, i) => {
          const done = i <= orderStep
          const active = i === orderStep
          const isLast = i === steps.length - 1

          return (
            <div key={i} style={{ display: 'flex', gap: '14px' }}>
              {/* Circle + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', flexShrink: 0 }}>
                <div style={{
                  width: active ? '22px' : '18px', height: active ? '22px' : '18px', borderRadius: '50%',
                  backgroundColor: done ? '#8BAA3D' : '#E8EDDA',
                  border: active ? '3px solid #D4E8B0' : done ? '2px solid #6B9F2D' : '2px solid #D4D1C8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, zIndex: 1,
                  boxShadow: active ? '0 0 0 4px rgba(139,170,61,0.15)' : 'none',
                  transition: 'all 0.3s ease',
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
                    backgroundColor: i < orderStep ? '#8BAA3D' : '#E8EDDA',
                    transition: 'background-color 0.3s',
                  }} />
                )}
              </div>

              {/* Text */}
              <div style={{ paddingBottom: isLast ? 0 : '16px', flex: 1 }}>
                <span style={{
                  fontSize: '14px', fontWeight: active ? 700 : 600,
                  color: done ? '#1B3C2A' : '#8A8F84',
                  display: 'block',
                }}>{step.title}</span>
                <span style={{
                  fontSize: '12px',
                  color: done ? '#5A7A5A' : '#B0ADA4',
                }}>{step.sub}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Your order items */}
      <div style={{ padding: '28px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', fontWeight: 500, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your order</p>

        {currentOrder.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: i < currentOrder.items.length - 1 ? '1px solid #E8EDDA' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: '#E8EDDA', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', flexShrink: 0,
              }}>🥗</div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>{item.name}</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>CHF {item.price.toFixed(2)}</span>
          </div>
        ))}

        {/* Total */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '12px', marginTop: '4px',
          borderTop: '1.5px solid #1B3C2A',
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B3C2A' }}>Total</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B3C2A' }}>CHF {currentOrder.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Back to home CTA */}
      <div style={{ padding: '28px 24px 0' }}>
        <button onClick={() => navigate('/')} style={{
          width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
          backgroundColor: '#8BAA3D', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Back to home</button>
      </div>
    </div>
  )
}
