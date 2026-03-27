import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import platImages from '../assets/platImages'

export default function BasketPage() {
  const navigate = useNavigate()
  const { cart, addPresetToCart, removeOneFromCart, removeFromCart, getCartTotal } = useStore()
  const total = getCartTotal()

  // Group cart items by base id (strip custom- timestamp suffix for custom bowls)
  const grouped = cart.reduce((acc, item) => {
    const key = item.type === 'custom' ? 'custom' : item.id
    if (!acc[key]) acc[key] = { ...item, qty: 0 }
    acc[key].qty += 1
    return acc
  }, {})
  const groupedItems = Object.values(grouped)

  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/menu')} style={{
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
            width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
            background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Your Basket</h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '24px',
            background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
            animation: 'float 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '36px' }}>🥣</span>
          </div>
          <p style={{ color: '#7A8A6A', fontSize: '14px', marginBottom: '20px' }}>Your basket is empty</p>
          <button onClick={() => navigate('/menu')} style={{
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            color: 'white', border: 'none', borderRadius: '999px',
            padding: '12px 28px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139,170,61,0.3)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>Browse menu</button>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, padding: '0 24px' }}>
            {groupedItems.map((item, i) => (
              <div key={item.id} className="glass-card hover-lift" style={{
                borderRadius: '20px', padding: '16px',
                marginBottom: '12px', animation: `fadeInUp ${0.2 + i * 0.08}s ease-out both`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: 'linear-gradient(135deg, #E8EDDA 0%, #D4DCBE 100%)',
                    border: '1px solid rgba(139,170,61,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    overflow: 'hidden',
                  }}>{platImages[item.id] ? <img src={platImages[item.id]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '28px' }}>🥗</span>}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', marginBottom: '4px' }}>{item.name}</h3>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 600,
                        background: 'rgba(139,170,61,0.1)', color: '#5A7A3A',
                        borderRadius: '999px', padding: '2px 8px',
                        border: '1px solid rgba(139,170,61,0.15)',
                      }}>🔥 {item.kcal} kcal</span>
                      <span style={{
                        fontSize: '10px', fontWeight: 600,
                        background: 'rgba(139,170,61,0.1)', color: '#5A7A3A',
                        borderRadius: '999px', padding: '2px 8px',
                        border: '1px solid rgba(139,170,61,0.15)',
                      }}>💪 {item.protein}g</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#1B3C2A' }}>CHF {(item.price * item.qty).toFixed(2)}</span>
                </div>
                {/* Quantity stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    background: 'none', border: 'none', color: '#B0ADA4', fontSize: '11px',
                    cursor: 'pointer',
                  }}>Remove all</button>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0',
                    background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)', borderRadius: '999px',
                    padding: '6px 4px', boxShadow: '0 2px 10px rgba(27,60,42,0.2)',
                  }}>
                    <button onClick={() => removeOneFromCart(item.id)} style={{
                      width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                      background: 'transparent', color: 'white', fontSize: '18px', fontWeight: 600,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>-</button>
                    <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: 'white' }}>{item.qty}</span>
                    <button onClick={() => addPresetToCart(item)} style={{
                      width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                      background: 'transparent', color: 'white', fontSize: '18px', fontWeight: 600,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>+</button>
                  </div>
                </div>
              </div>
            ))}

            {/* Nutritional Summary */}
            <div style={{
              marginTop: '16px', background: 'linear-gradient(135deg, rgba(27,60,42,0.92), rgba(13,36,24,0.95))',
              border: '1px solid rgba(139,170,61,0.15)', borderRadius: '20px', padding: '16px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8BAA3D', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>Nutritional summary</span>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {[
                  { val: cart.reduce((s, i) => s + (i.kcal || 0), 0), unit: 'kcal', icon: '🔥' },
                  { val: `${cart.reduce((s, i) => s + (i.protein || 0), 0)}g`, unit: 'protein', icon: '💪' },
                  { val: `${cart.reduce((s, i) => s + (i.carbs || 0), 0)}g`, unit: 'carbs', icon: '🌾' },
                  { val: `${cart.reduce((s, i) => s + (i.fat || 0), 0)}g`, unit: 'fat', icon: '🫒' },
                ].map((n) => (
                  <div key={n.unit} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', display: 'block', marginBottom: '4px' }}>{n.icon}</span>
                    <span style={{ fontSize: '17px', fontWeight: 700, color: 'white', display: 'block' }}>{n.val}</span>
                    <span style={{ fontSize: '10px', color: '#7FAF72', textTransform: 'capitalize' }}>{n.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{
              borderTop: '1px solid rgba(139,170,61,0.15)', paddingTop: '16px', marginTop: '16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#7A8A6A' }}>Total</span>
              <span style={{
                fontSize: '20px', fontWeight: 700,
                background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>CHF {total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ padding: '16px 24px 32px' }}>
            <button onClick={() => navigate('/delivery')} style={{
              width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
              background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
              color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(139,170,61,0.3)',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'transform 0.2s ease',
            }}>Proceed to Delivery</button>
          </div>
        </>
      )}
    </div>
  )
}
