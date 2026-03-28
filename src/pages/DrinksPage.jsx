import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import platImages from '../assets/platImages'

const drinks = [
  {
    id: 'focus-active', name: 'FOCUSWATER Active', size: '500 ml', price: 3.50,
    highlights: ['Vitamin B complex', 'Zero sugar', 'Hydration boost'],
  },
  {
    id: 'focus-antiox', name: 'FOCUSWATER Antiox', size: '500 ml', price: 3.50,
    highlights: ['Lemon & Lime', 'Antioxidant blend', 'No sweeteners'],
  },
  {
    id: 'focus-care', name: 'FOCUSWATER Care', size: '500 ml', price: 3.50,
    highlights: ['Mirabelle & Rhubarb', 'Added zinc', 'Low calorie'],
  },
  {
    id: 'chief-choco', name: 'Chiefs Protein Chocolate', size: '330 ml', price: 4.90,
    highlights: ['25g protein', 'Post-workout', 'Rich cocoa taste'],
  },
  {
    id: 'chief-vani', name: 'Chiefs Protein Vanilla', size: '330 ml', price: 4.90,
    highlights: ['25g protein', 'Smooth vanilla', 'Muscle recovery'],
  },
  {
    id: 'swiss-kombucha', name: 'Swiss Kombucha Jasmine', size: '400 ml', price: 6.90,
    highlights: ['Live cultures', 'White jasmine tea', 'Gut-friendly'],
  },
]

export default function DrinksPage() {
  const navigate = useNavigate()
  const { cart, addPresetToCart, removeOneFromCart } = useStore()

  const getDrinkQty = (id) => cart.filter((i) => i.id === id).length

  const handleAdd = (drink) => {
    addPresetToCart({
      ...drink,
      type: 'drink',
      kcal: 0, protein: 0, carbs: 0, fat: 0,
      tags: [],
    })
  }

  const handleSkip = () => navigate('/delivery')
  const handleContinue = () => navigate('/delivery')

  const hasDrinks = cart.some((i) => i.type === 'drink')

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <button onClick={() => navigate('/basket')} style={{
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
            width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700,
              background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>Drinks</h1>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ padding: '8px 24px 0', animation: 'fadeInUp 0.3s ease-out both' }}>
        <p style={{
          fontSize: '13px', color: '#7A8A6A', lineHeight: 1.5, margin: 0,
        }}>
          Carefully selected Swiss brands to complement your meal — clean ingredients, no compromises.
        </p>
      </div>

      {/* Drink cards */}
      <div style={{ padding: '20px 18px 0' }}>
        {drinks.map((drink, i) => {
          const qty = getDrinkQty(drink.id)
          const added = qty > 0
          return (
            <div key={drink.id} className="hover-lift" style={{
              display: 'flex', gap: '14px',
              background: added ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: added ? '1.5px solid rgba(139,170,61,0.4)' : '1px solid rgba(255,255,255,0.6)',
              borderRadius: '20px',
              marginBottom: '12px',
              padding: '14px',
              alignItems: 'center',
              position: 'relative',
              transition: 'all 0.3s ease',
              boxShadow: added
                ? '0 4px 20px rgba(139,170,61,0.12), 0 1px 4px rgba(0,0,0,0.04)'
                : '0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
              animation: `fadeInUp ${0.3 + i * 0.06}s ease-out both`,
            }}>
              {/* Badge */}
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

              {/* Circular image */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                overflow: 'hidden', flexShrink: 0,
                border: '2px solid rgba(139,170,61,0.15)',
                background: 'linear-gradient(135deg, #E8EDDA 0%, #D4DCBE 100%)',
              }}>
                {platImages[drink.id] ? (
                  <img src={platImages[drink.id]} alt={drink.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🥤</div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px', fontWeight: 700, color: '#1B3C2A',
                  margin: '0 0 2px',
                }}>{drink.name}</h3>
                <span style={{ fontSize: '11px', color: '#B0ADA4', fontWeight: 500 }}>{drink.size}</span>

                {/* Highlights */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '8px 0 10px' }}>
                  {drink.highlights.map((h) => (
                    <span key={h} style={{
                      fontSize: '9px', fontWeight: 600,
                      background: 'rgba(139,170,61,0.1)',
                      color: '#5A7A3A',
                      borderRadius: '10px', padding: '3px 8px',
                      border: '1px solid rgba(139,170,61,0.15)',
                      letterSpacing: '0.2px',
                    }}>{h}</span>
                  ))}
                </div>

                {/* Price + Add */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '15px', fontWeight: 700, color: '#1B3C2A',
                  }}>CHF {drink.price.toFixed(2)}</span>

                  {!added ? (
                    <button onClick={() => handleAdd(drink)} style={{
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
                      <button onClick={() => removeOneFromCart(drink.id)} style={{
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
                      <button onClick={() => handleAdd(drink)} style={{
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

      {/* CTAs */}
      <div style={{ padding: '16px 24px 0' }}>
        <button onClick={handleContinue} style={{
          width: '100%', padding: '18px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
          color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: '0 4px 16px rgba(27,60,42,0.25)',
          transition: 'transform 0.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <span>Continue</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {!hasDrinks && (
        <div style={{ padding: '10px 24px 0' }}>
          <button onClick={handleSkip} style={{
            width: '100%', padding: '14px', borderRadius: '999px',
            background: 'none', border: '1.5px solid rgba(139,170,61,0.25)',
            color: '#7A8A6A', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Space Grotesk', sans-serif",
            transition: 'all 0.2s ease',
          }}>I don't want any drinks</button>
        </div>
      )}
    </div>
  )
}
