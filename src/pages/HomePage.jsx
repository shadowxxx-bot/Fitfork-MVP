import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { presetBowls } from '../data/bowls'

const orderSteps = ['Order Confirmed', 'Meal Preparation', 'On Its Way', 'Delivered']

const features = [
  { icon: '🍽', title: 'Personalized', sub: 'Meals for you' },
  { icon: '📍', title: 'Live delivery', sub: 'To your door' },
  { icon: '📊', title: 'Nutrition', sub: 'Track your macros' },
  { icon: '⭐', title: 'Rewards', sub: 'Earn streaks' },
]

function ImagePlaceholder({ width, height, radius = 0, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius: radius, backgroundColor: '#D1D5DB',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '13px', color: '#6B7280', fontWeight: 500, flexShrink: 0,
      ...style,
    }}>
      Image
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const { currentOrder, orderStep, advanceOrderStep } = useStore()

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: currentOrder ? '140px' : '80px' }}>

      {/* Header: "Welcome to" + logo + cart icon */}
      <div style={{ padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#5A7A5A', fontWeight: 400, letterSpacing: '0.3px' }}>Welcome to</span>
            <div style={{ marginTop: '6px' }}>
              <ImagePlaceholder width="225px" height="59px" radius={4} />
            </div>
          </div>
          <button onClick={() => navigate('/basket')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slogan */}
      <div style={{ padding: '20px 24px 0' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700,
          color: '#1B3C2A', lineHeight: 1.15, margin: 0,
        }}>
          Who said Fast food{'\n'}can't be <span style={{ color: '#9AB222' }}>FIT FOOD</span>?
        </h1>
      </div>

      {/* Green divider */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ width: '40px', height: '4px', backgroundColor: '#8BAA3D', borderRadius: '2px' }} />
      </div>

      {/* Why us? */}
      <div style={{ padding: '16px 24px 0' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 16px',
        }}>Why us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {features.map((f) => (
            <div key={f.title} style={{
              backgroundColor: 'white', borderRadius: '16px', padding: '16px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#E8EDDA',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0,
              }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: '#7A7F74', marginTop: '2px' }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div style={{ padding: '20px 18px' }}>
        <ImagePlaceholder width="100%" height="239px" radius={20} />
      </div>

      {/* Green divider before recommendations */}
      <div style={{ padding: '0 24px 0' }}>
        <div style={{ width: '40px', height: '4px', backgroundColor: '#8BAA3D', borderRadius: '2px' }} />
      </div>

      {/* Section label: Our Recommendations */}
      <div style={{ padding: '16px 24px 0' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 16px',
        }}>Our Recommendations</h2>
      </div>

      {/* Product cards — row 1: 3 cards */}
      <div style={{ padding: '0 18px', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {presetBowls.slice(0, 3).map((bowl) => (
          <div key={bowl.id} onClick={() => { useStore.getState().addPresetToCart(bowl); navigate('/basket') }}
            style={{
              minWidth: '120px', flex: 1, backgroundColor: 'white', borderRadius: '16px',
              overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
            }}>
            <ImagePlaceholder width="100%" height="100px" radius={0} style={{ borderRadius: '16px 16px 0 0' }} />
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', marginBottom: '6px' }}>{bowl.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {bowl.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '9px', backgroundColor: '#E8EDDA', color: '#5A7A3A',
                    borderRadius: '999px', padding: '2px 8px', fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B9A5A' }}>CHF {bowl.price.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Product cards — row 2: 2 cards + Order FitFork button */}
      <div style={{ padding: '12px 18px 0', display: 'flex', gap: '10px' }}>
        {presetBowls.slice(3, 5).map((bowl) => (
          <div key={bowl.id} onClick={() => { useStore.getState().addPresetToCart(bowl); navigate('/basket') }}
            style={{
              flex: 1, backgroundColor: 'white', borderRadius: '16px',
              overflow: 'hidden', cursor: 'pointer',
            }}>
            <ImagePlaceholder width="100%" height="100px" radius={0} style={{ borderRadius: '16px 16px 0 0' }} />
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', marginBottom: '6px' }}>{bowl.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {bowl.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '9px', backgroundColor: '#E8EDDA', color: '#5A7A3A',
                    borderRadius: '999px', padding: '2px 8px', fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B9A5A' }}>CHF {bowl.price.toFixed(1)}</div>
            </div>
          </div>
        ))}

        {/* Order FitFork button */}
        <div onClick={() => navigate('/menu')} style={{
          flex: 1, backgroundColor: '#1B3C2A', borderRadius: '16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: '16px 10px', minHeight: '160px',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#8BAA3D',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <span style={{
            fontSize: '12px', fontWeight: 700, color: 'white', textAlign: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>Order{'\n'}FitFork</span>
        </div>
      </div>

      {/* Green divider before Customize */}
      <div style={{ padding: '28px 24px 0' }}>
        <div style={{ width: '40px', height: '4px', backgroundColor: '#8BAA3D', borderRadius: '2px' }} />
      </div>

      {/* Section label: Customize your meal */}
      <div style={{ padding: '16px 24px 0' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 16px',
        }}>Customize your meal</h2>
      </div>

      {/* Goal / Nutrition card — single instance */}
      <div style={{ padding: '0 24px 24px' }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '20px', padding: '20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            width: '60px', height: '60px', borderRadius: '50%',
            border: '5px solid #8BAA3D', borderTopColor: '#A0C870',
          }} />
          <div style={{ marginLeft: '88px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#A0C870', marginBottom: '2px' }}>Daily goal</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', marginBottom: '4px' }}>Track your nutrition</div>
            <div style={{ fontSize: '12px', color: '#2A5A3A', lineHeight: 1.4 }}>Build your bowl and hit your macros</div>
          </div>
          <button onClick={() => navigate('/custom/protein')} style={{
            marginTop: '16px', width: '100%', padding: '14px', borderRadius: '999px', border: 'none',
            backgroundColor: '#A0C044', color: '#1B3C2A',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>Start building →</button>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            {[
              { label: 'Calories', value: '420', unit: 'kcal' },
              { label: 'Protein', value: '32', unit: 'g' },
              { label: 'Fiber', value: '12', unit: 'g' },
            ].map((n) => (
              <div key={n.label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#A0C870',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>{n.value}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#2A5A3A', fontWeight: 500 }}>{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky order tracking bar (only if order exists) ── */}
      {currentOrder && (
        <div style={{
          position: 'fixed', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '393px', zIndex: 40,
          padding: '0 16px', boxSizing: 'border-box',
        }}>
          <div style={{
            backgroundColor: '#1B3C2A', borderRadius: '16px', padding: '14px 18px',
            boxShadow: '0 -2px 12px rgba(0,0,0,0.12)',
            cursor: 'pointer',
          }} onClick={() => navigate('/order-tracking')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
                  {orderSteps[orderStep]}
                </span>
                <span style={{ fontSize: '11px', color: '#7A8C6E' }}>{currentOrder.id}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); navigate('/order-tracking') }} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                backgroundColor: '#8BAA3D', borderRadius: '999px', padding: '5px 14px',
                border: 'none', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>Details</span>
                <span style={{ fontSize: '12px', color: 'white' }}>→</span>
              </button>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {orderSteps.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: '4px', borderRadius: '2px',
                  backgroundColor: i <= orderStep ? '#8BAA3D' : 'rgba(255,255,255,0.2)',
                  transition: 'background-color 0.3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
