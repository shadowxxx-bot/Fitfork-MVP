import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const orderSteps = ['Order Confirmed', 'Meal Preparation', 'On Its Way', 'Delivered']

const hiddenPaths = [
  '/checkout', '/order-confirm', '/order-tracking', '/login', '/login-2',
  '/profile/preferences', '/profile/help', '/onboarding',
  '/custom/protein', '/custom/carbs', '/custom/veg', '/custom/extras', '/custom/recap',
  '/basket', '/delivery', '/rewards/register', '/profile/edit',
]

export default function FloatingBars() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { currentOrder, orderStep, cart, getCartTotal } = useStore()

  if (hiddenPaths.some((p) => pathname.startsWith(p))) return null

  const cartCount = cart.length
  const cartTotal = cartCount > 0 ? getCartTotal() : 0
  const showBasket = cartCount > 0 && pathname === '/menu'
  const showOrder = !!currentOrder && pathname === '/'

  if (!showBasket && !showOrder) return null

  // Stack: navbar is at bottom:12px, ~70px tall. First bar at bottom:90px, second at bottom:160px
  let barBottom = 90

  return (
    <>
      {showOrder && (
        <div style={{
          position: 'fixed', bottom: `${showBasket ? barBottom + 70 : barBottom}px`,
          left: '50%', transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)', maxWidth: '361px', zIndex: 40,
        }}>
          <div className="glass-dark" style={{
            borderRadius: '20px', padding: '14px 18px', cursor: 'pointer',
          }} onClick={() => navigate('/order-tracking')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{orderSteps[orderStep]}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{currentOrder.id}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); navigate('/order-tracking') }} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
                borderRadius: '999px', padding: '5px 14px', border: 'none', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>Details</span>
                <span style={{ fontSize: '12px', color: 'white' }}>→</span>
              </button>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {orderSteps.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: '3px', borderRadius: '2px',
                  backgroundColor: i <= orderStep ? '#8BAA3D' : 'rgba(255,255,255,0.12)',
                  transition: 'background-color 0.4s ease',
                }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {showBasket && (
        <div style={{
          position: 'fixed', bottom: `${barBottom}px`,
          left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '393px', zIndex: 40,
          padding: '0 16px', boxSizing: 'border-box',
        }}>
          <div onClick={() => navigate('/drinks')} className="glass-dark" style={{
            borderRadius: '20px', padding: '14px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(139,170,61,0.3)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'white' }}>{cartCount}</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'white', fontFamily: "'Space Grotesk', sans-serif" }}>
                View basket
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                CHF {cartTotal.toFixed(2)}
              </span>
              <span style={{ fontSize: '14px', color: '#8BAA3D' }}>→</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
