import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const paymentLabels = {
  apple_pay: 'Apple Pay', twint: 'Twint', pay_on_site: 'Pay on site',
}

export default function OrderConfirmPage() {
  const navigate = useNavigate()
  const currentOrder = useStore((s) => s.currentOrder)
  const deliveryTime = useStore((s) => s.deliveryTime)

  const order = currentOrder || {
    id: '#041',
    items: [
      { id: 1, name: 'Tropical Shrimp', desc: 'Shrimps, rice, avocado and tropical mix', kcal: 590, protein: 35, carbs: 62, fat: 22, price: 18.50 },
      { id: 2, name: 'Build your own bowl', desc: 'Salmon teriyaki, rice, broccoli,', kcal: 545, protein: 50, carbs: 60, fat: 20, price: 15.00 },
    ],
    total: 31.83,
    payment: 'apple_pay',
    deliveryInfo: { city: 'Lancy Pont-Rouge' },
  }

  const subtotal = order.items.reduce((s, i) => s + i.price, 0)
  const streakDiscount = +(subtotal * 0.05).toFixed(2)
  const total = order.total || +(subtotal - streakDiscount).toFixed(2)

  const totalNutrition = order.items.reduce(
    (acc, i) => ({
      kcal: acc.kcal + (i.kcal || 0),
      protein: acc.protein + (i.protein || 0),
      carbs: acc.carbs + (i.carbs || 0),
      fat: acc.fat + (i.fat || 0),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
          width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      </div>

      {/* Confirmation hero */}
      <div style={{ textAlign: 'center', padding: '16px 24px 0', animation: 'fadeInUp 0.4s ease-out both' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 4px',
        }}>Order Confirmed</h1>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 20px' }}>Payment successful</p>

        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
          margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 6px rgba(139,170,61,0.12), 0 8px 32px rgba(27,60,42,0.2)',
          animation: 'scaleIn 0.4s ease-out both',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8BAA3D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div style={{
          background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)',
          borderRadius: '999px', padding: '8px 20px',
          display: 'inline-block', marginBottom: '6px',
        }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1B3C2A' }}>Order {order.id}</span>
        </div>
        <p style={{ fontSize: '12px', color: '#7A8A6A', margin: '4px 0 0' }}>
          CHF {total.toFixed(2)} · {paymentLabels[order.payment] || 'Apple Pay'}
        </p>
      </div>

      {/* Delivery location */}
      <div style={{ padding: '20px 24px 0' }}>
        <div className="glass-card" style={{
          borderRadius: '20px', padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>
              {order.deliveryInfo?.city || 'Lancy Pont-Rouge'}
            </span>
            <span style={{ fontSize: '12px', color: '#7A8A6A' }}>{deliveryTime ? `Delivery at ${deliveryTime}` : 'Delivery'}</span>
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

      {/* Your order */}
      <div style={{ padding: '16px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', margin: '0 0 10px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Your order</p>
        <div className="glass-card" style={{ borderRadius: '20px', padding: '16px' }}>
          {order.items.map((item, idx) => (
            <div key={item.id || idx} style={{
              paddingBottom: '12px', marginBottom: idx < order.items.length - 1 ? '12px' : '0',
              borderBottom: idx < order.items.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>{item.name}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A' }}>CHF {item.price.toFixed(2)}</span>
              </div>
              {item.desc && <p style={{ fontSize: '12px', color: '#7A8A6A', margin: '0 0 6px' }}>{item.desc}</p>}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[
                  { val: item.kcal || 0, unit: 'kcal' },
                  { val: (item.protein || 0) + 'g', unit: 'P' },
                  { val: (item.carbs || 0) + 'g', unit: 'C' },
                  { val: (item.fat || 0) + 'g', unit: 'F' },
                ].map((t) => (
                  <span key={t.unit} style={{
                    fontSize: '10px', fontWeight: 600, color: '#5A7A3A',
                    background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
                    borderRadius: '8px', padding: '3px 8px',
                  }}>{typeof t.val === 'number' ? t.val : t.val} {t.unit}</span>
                ))}
              </div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid rgba(139,170,61,0.12)', paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>Subtotal</span>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>CHF {subtotal.toFixed(2)}</span>
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
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A' }}>-5% streak reward</span>
              </div>
              <span style={{ fontSize: '13px', color: '#8BAA3D', fontWeight: 600 }}>- CHF {streakDiscount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#1B3C2A' }}>Total</span>
              <span style={{
                fontSize: '18px', fontWeight: 700,
                background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>CHF {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Free dish banner */}
      <div style={{ padding: '12px 24px 0' }}>
        <div style={{
          background: 'rgba(232,122,30,0.08)', border: '1px solid rgba(232,122,30,0.15)',
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
            <span style={{ fontSize: '11px', color: '#7A8A6A' }}>30th order · free dish at next milestone</span>
          </div>
        </div>
      </div>

      {/* Nutritional summary */}
      {(totalNutrition.kcal > 0) && (
        <div style={{ padding: '16px 24px 0' }}>
          <div className="glass-card" style={{ borderRadius: '20px', padding: '14px 16px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', margin: '0 0 10px' }}>Nutritional summary</p>
            <div style={{
              height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px',
              background: 'rgba(139,170,61,0.1)',
            }}>
              <div style={{
                height: '100%', width: '60%', borderRadius: '2px',
                background: 'linear-gradient(90deg, #8BAA3D 0%, #E87A1E 100%)',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[
                { val: totalNutrition.kcal, label: 'kcal' },
                { val: totalNutrition.protein + 'g', label: 'Proteins' },
                { val: totalNutrition.carbs + 'g', label: 'Carbs' },
                { val: totalNutrition.fat + 'g', label: 'Fats' },
              ].map((n) => (
                <div key={n.label} style={{ textAlign: 'center' }}>
                  <span style={{
                    fontSize: '18px', fontWeight: 700, display: 'block',
                    background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{n.val}</span>
                  <span style={{ fontSize: '10px', color: '#7A8A6A' }}>{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Follow your order CTA */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/')} className="glass-card hover-lift" style={{
          width: '100%', padding: '18px', borderRadius: '999px',
          color: '#1B3C2A', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Follow your order</button>
      </div>
    </div>
  )
}
