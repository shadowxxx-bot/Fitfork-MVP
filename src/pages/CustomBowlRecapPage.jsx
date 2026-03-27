import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import platImages from '../assets/platImages'

export default function CustomBowlRecapPage() {
  const navigate = useNavigate()
  const { getCustomNutrition, getSelectedItems, addCustomToCart } = useStore()
  const nutrition = getCustomNutrition()
  const items = getSelectedItems()

  const handleAdd = () => {
    addCustomToCart()
    navigate('/menu')
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/custom/extras')} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Your Custom Bowl</h1>
        <button onClick={() => navigate('/custom/protein')} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#8BAA3D', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
      </div>

      {/* Bowl illustration placeholder */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0 12px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '160px', height: '100px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(139,170,61,0.12) 0%, rgba(139,170,61,0.06) 100%)', border: '1px solid rgba(139,170,61,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', padding: '10px' }}>
              {items.slice(0, 5).map((item, i) => (
                <div key={i} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: '#E8EDDA', overflow: 'hidden',
                }}>{platImages[item.id] ? <img src={platImages[item.id]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}</div>
              ))}
            </div>
          </div>
          <div style={{
            position: 'absolute', top: '-6px', right: '10px',
            width: '24px', height: '24px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 2px 8px rgba(139,170,61,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '14px', color: '#5A7A5A', margin: '0 0 24px' }}>
        Your bowl is ready to order!
      </p>

      {/* Choice list */}
      <div style={{ flex: 1, padding: '0 24px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#8A8F84', margin: '0 0 12px', letterSpacing: '0.3px' }}>Choice</h3>

        {items.map((item) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 0', borderBottom: '1px solid rgba(139,170,61,0.1)',
          }}>
            {/* Circular image placeholder */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #E8EDDA 0%, #D4DCBE 100%)', border: '1px solid rgba(139,170,61,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: '#6B7280', fontWeight: 500, flexShrink: 0,
              overflow: 'hidden',
            }}>{platImages[item.id] ? <img src={platImages[item.id]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'Image'}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{item.name}</span>
              <span style={{ fontSize: '11px', color: '#7A7F74' }}>
                {item.cat} · {item.protein || 0}g P · {item.kcal} kcal
              </span>
            </div>

            <span style={{ fontSize: '13px', fontWeight: 600, color: '#5A7A3A', flexShrink: 0 }}>
              CHF {item.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Nutritional summary box */}
      <div style={{ margin: '20px 24px 0', background: 'linear-gradient(135deg, rgba(27,60,42,0.92), rgba(13,36,24,0.95))', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(139,170,61,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', borderRadius: '16px', padding: '16px 20px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#C8E6A0', display: 'block', marginBottom: '10px' }}>Nutritional summary</span>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[
            { val: nutrition.kcal, unit: 'kcal' },
            { val: `${nutrition.protein}g`, unit: 'protein' },
            { val: `${nutrition.carbs}g`, unit: 'carbs' },
            { val: `${nutrition.fat}g`, unit: 'fat' },
          ].map((n) => (
            <div key={n.unit} style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'white', display: 'block' }}>{n.val}</span>
              <span style={{ fontSize: '10px', color: '#7FAF72' }}>{n.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add to cart CTA */}
      <div style={{ padding: '16px 24px 32px' }}>
        <button onClick={handleAdd} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>
          Add to cart · CHF {nutrition.price.toFixed(2)}
        </button>
      </div>
    </div>
  )
}
