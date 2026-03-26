import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function BasketPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, getCartTotal } = useStore()
  const total = getCartTotal()

  return (
    <div style={{ backgroundColor: '#F5F4EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header — from basket.svg: back rect at x=35 y=62 */}
      <div style={{ padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 600, color: '#1B3C2A' }}>Your Basket</h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <span style={{ fontSize: '48px', marginBottom: '16px' }}>🥣</span>
          <p style={{ color: '#8A8F84', fontSize: '14px', marginBottom: '20px' }}>Your basket is empty</p>
          <button onClick={() => navigate('/menu')} style={{
            backgroundColor: '#8BAA3D', color: '#1B3C2A', border: 'none', borderRadius: '999px',
            padding: '12px 24px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
          }}>Browse menu</button>
        </div>
      ) : (
        <>
          {/* Cart items — from basket.svg colors: #E8EDDA (10x), #5A7A3A (8x), #8A8F84 (12x) */}
          <div style={{ flex: 1, padding: '0 24px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{
                backgroundColor: 'white', borderRadius: '16px', padding: '16px',
                marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#E8EDDA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                  🥗
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', marginBottom: '4px' }}>{item.name}</h3>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '10px', backgroundColor: '#E8EDDA', color: '#5A7A3A', borderRadius: '999px', padding: '2px 8px' }}>🔥 {item.kcal} kcal</span>
                    <span style={{ fontSize: '10px', backgroundColor: '#E8EDDA', color: '#5A7A3A', borderRadius: '999px', padding: '2px 8px' }}>💪 {item.protein}g</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>CHF {item.price.toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#8A8F84', fontSize: '11px', cursor: 'pointer', marginTop: '4px' }}>Remove</button>
                </div>
              </div>
            ))}

            {/* Total */}
            <div style={{ borderTop: '1px solid #E8EDDA', paddingTop: '16px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#1B3C2A' }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#1B3C2A' }}>CHF {total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ padding: '16px 24px 32px' }}>
            <button onClick={() => navigate('/delivery')} style={{
              width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
              backgroundColor: '#8BAA3D', color: '#1B3C2A', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}>Proceed to Delivery</button>
          </div>
        </>
      )}
    </div>
  )
}
