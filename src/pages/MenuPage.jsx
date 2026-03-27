import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import platImages from '../assets/platImages'
import logoPng from '../assets/logo.png'

const menuItems = [
  { id: 'golden-salmon', name: 'Golden Salmon', desc: 'Salmon, sweet potatoes, broccoli', kcal: 500, protein: 36, carbs: 36, fat: 24, price: 15.50 },
  { id: 'sunny-chickpea', name: 'Sunny Chickpea', desc: 'Quinoa, chickpeas, hummus, veggie crunch', kcal: 510, protein: 18, carbs: 60, fat: 20, price: 12.90 },
  { id: 'tropical-shrimp', name: 'Tropical Shrimp', desc: 'Shrimp, mango, avocado, coconut rice', kcal: 480, protein: 30, carbs: 44, fat: 20, price: 15.90 },
  { id: 'mediterranean-bowl', name: 'Mediterranean Feast', desc: 'Falafel, hummus, tabbouleh, olives, pita', kcal: 450, protein: 22, carbs: 48, fat: 22, price: 13.90 },
  { id: 'tex-mex-power', name: 'Tex-Mex Power Plate', desc: 'Black beans, rice, guacamole, spicy sauce', kcal: 540, protein: 28, carbs: 56, fat: 22, price: 14.90 },
]

const steps = [
  { label: 'Protein', icon: '🥩' },
  { label: 'Carbs', icon: '🍚' },
  { label: 'Veggies', icon: '🥦' },
  { label: 'Extras', icon: '🫒' },
]

function ImagePlaceholder({ width, height, radius = 0, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: 'linear-gradient(135deg, #E8EDDA 0%, #D4DCBE 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '11px', color: '#7A8A5A', fontWeight: 600, flexShrink: 0,
      border: '1px solid rgba(139,170,61,0.15)',
      ...style,
    }}>
      Image
    </div>
  )
}

export default function MenuPage() {
  const navigate = useNavigate()
  const { addPresetToCart, removeOneFromCart, cart, getCartTotal } = useStore()
  const cartCount = cart.length
  const cartTotal = getCartTotal()

  const getQty = (id) => cart.filter((i) => i.id === id).length

  const handleAdd = (item) => {
    addPresetToCart({ ...item, tags: [`${item.kcal} kcal`, `${item.protein}g P`] })
  }

  const handleRemove = (id) => {
    removeOneFromCart(id)
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: cartCount > 0 ? '140px' : '100px' }}>

      {/* Header */}
      <div style={{ padding: '28px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(139,170,61,0.3)',
          }}>
            <img src={logoPng} alt="FitFork" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </div>
        </div>
        <button onClick={() => navigate('/basket')} style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '14px', width: '42px', height: '42px',
          cursor: 'pointer', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'transform 0.2s ease',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <div style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(139,170,61,0.4)',
              animation: 'scaleIn 0.3s ease-out',
            }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'white' }}>{cartCount}</span>
            </div>
          )}
        </button>
      </div>

      {/* Title */}
      <div style={{ padding: '20px 27px 0', animation: 'fadeInUp 0.4s ease-out' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 4px',
        }}>Menu</h1>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: 0, fontWeight: 400 }}>
          Healthy food made for your goals
        </p>
      </div>

      {/* Meal cards */}
      <div style={{ padding: '20px 18px 0' }}>
        {menuItems.map((item, i) => {
          const qty = getQty(item.id)
          const added = qty > 0
          return (
          <div key={item.id} className="hover-lift" style={{
            display: 'flex', gap: '14px',
            background: added ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: added ? '1.5px solid rgba(139,170,61,0.4)' : '1px solid rgba(255,255,255,0.6)',
            borderRadius: '20px',
            marginBottom: '12px',
            padding: '14px',
            alignItems: 'flex-start',
            position: 'relative',
            transition: 'all 0.3s ease',
            boxShadow: added
              ? '0 4px 20px rgba(139,170,61,0.12), 0 1px 4px rgba(0,0,0,0.04)'
              : '0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
            animation: `fadeInUp ${0.3 + i * 0.08}s ease-out both`,
          }}>
            {/* Checkmark badge when added */}
            {added && (
              <div style={{
                position: 'absolute', top: '-6px', right: '-6px',
                width: '26px', height: '26px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(139,170,61,0.4)',
                animation: 'scaleIn 0.3s ease-out',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Food image */}
            <img
              src={platImages[item.id]}
              alt={item.name}
              style={{ width: '110px', height: '110px', borderRadius: '16px', objectFit: 'cover', flexShrink: 0 }}
            />

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '15px', fontWeight: 700, color: '#1B3C2A',
                margin: '4px 0 4px',
              }}>{item.name}</h3>

              <p style={{
                fontSize: '11px', color: '#7A7F74', margin: '0 0 8px',
                lineHeight: 1.3,
              }}>{item.desc}</p>

              {/* Nutrition tags */}
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {[
                  `${item.kcal} kcal`,
                  `${item.protein}g P`,
                  `${item.carbs}g C`,
                  `${item.fat}g F`,
                ].map((tag) => (
                  <span key={tag} style={{
                    fontSize: '10px', fontWeight: 600,
                    background: 'rgba(139,170,61,0.1)',
                    color: '#5A7A3A',
                    borderRadius: '10px', padding: '4px 10px',
                    border: '1px solid rgba(139,170,61,0.15)',
                    letterSpacing: '0.2px',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Price + Add / Quantity control */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '16px', fontWeight: 700, color: '#1B3C2A',
                }}>CHF {item.price.toFixed(2)}</span>

                {!added ? (
                  <button onClick={() => handleAdd(item)} style={{
                    background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
                    border: 'none', borderRadius: '999px',
                    padding: '7px 18px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    boxShadow: '0 2px 10px rgba(139,170,61,0.3)',
                    transition: 'all 0.2s ease',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Add</span>
                  </button>
                ) : (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0',
                    background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
                    borderRadius: '999px', padding: '2px', overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(27,60,42,0.25)',
                  }}>
                    <button onClick={() => handleRemove(item.id)} style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'white', lineHeight: 1 }}>−</span>
                    </button>
                    <span style={{
                      fontSize: '13px', fontWeight: 700, color: 'white',
                      minWidth: '24px', textAlign: 'center',
                    }}>{qty}</span>
                    <button onClick={() => handleAdd(item)} style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'white', lineHeight: 1 }}>+</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          )
        })}
      </div>

      {/* Build your own bowl section */}
      <div style={{ padding: '24px 24px 0', animation: 'fadeInUp 0.6s ease-out both' }}>
        <div style={{
          width: '32px', height: '4px', borderRadius: '2px',
          background: 'linear-gradient(90deg, #8BAA3D, #A0C044)',
          marginBottom: '12px',
        }} />
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '22px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 6px',
        }}>Build your own bowl</h2>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 20px', lineHeight: 1.4 }}>
          Choose your ingredients and create a meal that fits your goals
        </p>
      </div>

      {/* Glass card: illustration + steps flow */}
      <div style={{ padding: '0 24px' }}>
        <div className="glass-card" style={{
          borderRadius: '24px', padding: '24px 20px 20px',
        }}>
          {/* Bowl illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img src={platImages['restaurant']} alt="Build your bowl" style={{ width: '180px', height: '110px', borderRadius: '20px', objectFit: 'cover' }} />
          </div>

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '17px', fontWeight: 700, color: '#1B3C2A',
            textAlign: 'center', margin: '0 0 4px',
          }}>Build your own bowl</h3>
          <p style={{
            fontSize: '12px', color: '#7A8A6A', textAlign: 'center',
            margin: '0 0 24px',
          }}>Choose your ingredients in 4 easy steps.</p>

          {/* Step flow: 1 → 2 → 3 → 4 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', gap: '6px' }}>
            {steps.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    border: '2px solid rgba(139,170,61,0.4)',
                    background: i === 0
                      ? 'linear-gradient(135deg, #8BAA3D, #A0C044)'
                      : 'rgba(255,255,255,0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: i === 0 ? '0 2px 10px rgba(139,170,61,0.3)' : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                    <span style={{
                      fontSize: '14px', fontWeight: 700,
                      color: i === 0 ? 'white' : '#8BAA3D',
                    }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#1B3C2A', letterSpacing: '0.3px' }}>{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    width: '20px', height: '2px', borderRadius: '1px',
                    background: 'linear-gradient(90deg, rgba(139,170,61,0.4), rgba(139,170,61,0.15))',
                    marginBottom: '18px',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark CTA bar */}
      <div style={{ padding: '12px 24px 24px' }}>
        <button onClick={() => navigate('/custom/protein')} className="glass-dark hover-lift" style={{
          width: '100%', padding: '16px 20px', borderRadius: '20px', border: '1px solid rgba(139,170,61,0.2)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px', fontWeight: 600, color: 'white',
          }}>Custom now</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            borderRadius: '999px', padding: '8px 18px',
            boxShadow: '0 2px 10px rgba(139,170,61,0.3)',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>GO</span>
            <span style={{ fontSize: '14px', color: 'white' }}>→</span>
          </div>
        </button>
      </div>

    </div>
  )
}
