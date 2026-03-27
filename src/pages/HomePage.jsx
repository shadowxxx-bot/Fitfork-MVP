import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { presetBowls } from '../data/bowls'
import nomPng from '../assets/nom.png'
import platImages, { restaurant } from '../assets/platImages'

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
      width, height, borderRadius: radius, backgroundColor: '#E4E3DC',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '13px', color: '#A0A098', fontWeight: 500, flexShrink: 0,
      ...style,
    }}>
      Image
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const { currentOrder, orderStep } = useStore()

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: currentOrder ? '150px' : '90px' }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 0', animation: 'fadeIn 0.4s ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#8A8F84', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Welcome to</span>
            <div style={{ marginTop: '8px' }}>
              <img src={nomPng} alt="FitFork" style={{ height: '40px', objectFit: 'contain' }} />
            </div>
          </div>
          <button onClick={() => navigate('/basket')} style={{
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
            width: '44px', height: '44px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slogan */}
      <div style={{ padding: '24px 24px 0', animation: 'fadeInUp 0.5s ease-out 0.1s both' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700,
          color: '#1B3C2A', lineHeight: 1.15, margin: 0,
        }}>
          Who said Fast food{'\n'}can't be <span style={{
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>FIT FOOD</span>?
        </h1>
      </div>

      {/* Accent line */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{
          width: '40px', height: '4px', borderRadius: '2px',
          background: 'linear-gradient(90deg, #8BAA3D, #A0C044)',
        }} />
      </div>

      {/* Why us? */}
      <div style={{ padding: '20px 24px 0', animation: 'fadeInUp 0.5s ease-out 0.2s both' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 14px',
        }}>Why us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {features.map((f, i) => (
            <div key={f.title} className="hover-lift" style={{
              background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '18px', padding: '16px',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
              display: 'flex', alignItems: 'center', gap: '12px',
              animation: `fadeInUp 0.4s ease-out ${0.15 + i * 0.05}s both`,
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #E8EDDA, #D4E8B0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0,
              }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: '#8A8F84', marginTop: '1px' }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div style={{ padding: '20px 18px', animation: 'scaleIn 0.5s ease-out 0.3s both' }}>
        <div style={{
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        }}>
          <img src={restaurant} alt="FitFork Restaurant" style={{ width: '100%', height: '239px', objectFit: 'cover', borderRadius: '24px', display: 'block' }} />
        </div>
      </div>

      {/* Accent line */}
      <div style={{ padding: '0 24px 0' }}>
        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, #8BAA3D, #A0C044)' }} />
      </div>

      {/* Our Recommendations */}
      <div style={{ padding: '16px 24px 0' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 14px',
        }}>Our Recommendations</h2>
      </div>

      {/* Product cards row 1 */}
      <div style={{ padding: '0 18px', display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
        {presetBowls.slice(0, 3).map((bowl, i) => (
          <div key={bowl.id} className="hover-lift" onClick={() => { useStore.getState().addPresetToCart(bowl); navigate('/basket') }}
            style={{
              minWidth: '120px', flex: 1, borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
              background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
              animation: `slideInRight 0.4s ease-out ${0.1 + i * 0.08}s both`,
            }}>
            <img src={platImages[bowl.id]} alt={bowl.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '20px 20px 0 0', display: 'block' }} />
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', marginBottom: '6px' }}>{bowl.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {bowl.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '9px', backgroundColor: 'rgba(139,170,61,0.1)', color: '#5A7A3A',
                    borderRadius: '999px', padding: '2px 8px', fontWeight: 500,
                    border: '1px solid rgba(139,170,61,0.15)',
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#8BAA3D' }}>CHF {bowl.price.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Product cards row 2 + CTA */}
      <div style={{ padding: '12px 18px 0', display: 'flex', gap: '10px' }}>
        {presetBowls.slice(3, 5).map((bowl) => (
          <div key={bowl.id} className="hover-lift" onClick={() => { useStore.getState().addPresetToCart(bowl); navigate('/basket') }}
            style={{
              flex: 1, borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
              background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}>
            <img src={platImages[bowl.id]} alt={bowl.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '20px 20px 0 0', display: 'block' }} />
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', marginBottom: '6px' }}>{bowl.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                {bowl.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '9px', backgroundColor: 'rgba(139,170,61,0.1)', color: '#5A7A3A',
                    borderRadius: '999px', padding: '2px 8px', fontWeight: 500,
                    border: '1px solid rgba(139,170,61,0.15)',
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#8BAA3D' }}>CHF {bowl.price.toFixed(1)}</div>
            </div>
          </div>
        ))}

        {/* Order CTA */}
        <div onClick={() => navigate('/menu')} className="hover-lift" style={{
          flex: 1, borderRadius: '20px', cursor: 'pointer', padding: '16px 10px', minHeight: '160px',
          background: 'linear-gradient(135deg, #1B3C2A, #2A5A3A)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(27,60,42,0.2)',
          border: '1px solid rgba(139,170,61,0.2)',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(139,170,61,0.3)',
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

      {/* Customize section */}
      <div style={{ padding: '28px 24px 0' }}>
        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, #8BAA3D, #A0C044)' }} />
      </div>

      <div style={{ padding: '16px 24px 0' }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 16px',
        }}>Customize your meal</h2>
      </div>

      {/* Custom bowl card */}
      <div style={{ padding: '0 24px 24px' }}>
        <div className="hover-lift" style={{
          background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px', padding: '24px 20px 20px',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle gradient accent */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,170,61,0.08) 0%, transparent 70%)',
          }} />

          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            width: '56px', height: '56px', borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(139,170,61,0.15), rgba(160,192,68,0.08))',
            border: '2px solid rgba(139,170,61,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '22px' }}>🥗</span>
          </div>

          <div style={{ marginLeft: '80px', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#8BAA3D', marginBottom: '2px', letterSpacing: '0.5px' }}>Daily goal</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', marginBottom: '4px' }}>Track your nutrition</div>
            <div style={{ fontSize: '12px', color: '#5A7A5A', lineHeight: 1.4 }}>Build your bowl and hit your macros</div>
          </div>

          <button onClick={() => navigate('/custom/protein')} style={{
            marginTop: '20px', width: '100%', padding: '14px', borderRadius: '16px', border: 'none',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139,170,61,0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>Start building →</button>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            {[
              { label: 'Calories', value: '420', unit: 'kcal' },
              { label: 'Protein', value: '32', unit: 'g' },
              { label: 'Fiber', value: '12', unit: 'g' },
            ].map((n) => (
              <div key={n.label} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(139,170,61,0.15), rgba(160,192,68,0.08))',
                  border: '1.5px solid rgba(139,170,61,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#5A7A3A' }}>{n.value}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#8A8F84', fontWeight: 500 }}>{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
