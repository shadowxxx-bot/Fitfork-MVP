import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const menuItems = [
  { id: 'golden-salmon', name: 'Golden Salmon', desc: 'Salmon, sweet potatoes, broccoli', kcal: 500, protein: 36, carbs: 36, fat: 24, price: 15.50 },
  { id: 'sunny-chickpea', name: 'Sunny Chickpea', desc: 'Quinoa, chickpeas, hummus, veggie crunch', kcal: 510, protein: 18, carbs: 60, fat: 20, price: 12.90 },
  { id: 'green-vitality', name: 'Green Vitality', desc: 'Chicken, avocado, spinach, brown rice', kcal: 480, protein: 34, carbs: 42, fat: 18, price: 14.50 },
  { id: 'mediterranean-bowl', name: 'Mediterranean Feast', desc: 'Falafel, hummus, tabbouleh, olives, pita', kcal: 450, protein: 22, carbs: 48, fat: 22, price: 13.90 },
  { id: 'teriyaki-chicken', name: 'Teriyaki Chicken Bowl', desc: 'Chicken, rice, edamame, sesame, ginger', kcal: 540, protein: 38, carbs: 52, fat: 16, price: 14.90 },
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
      width, height, borderRadius: radius, backgroundColor: '#D1D5DB',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', color: '#6B7280', fontWeight: 500, flexShrink: 0,
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
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: cartCount > 0 ? '140px' : '80px' }}>

      {/* Header icons */}
      <div style={{ padding: '28px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ImagePlaceholder width="24px" height="24px" radius={4} style={{ fontSize: '8px' }} />
        </div>
        <button onClick={() => navigate('/basket')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', position: 'relative' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <div style={{
              position: 'absolute', top: '-2px', right: '-4px',
              width: '18px', height: '18px', borderRadius: '50%',
              backgroundColor: '#8BAA3D', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'white' }}>{cartCount}</span>
            </div>
          )}
        </button>
      </div>

      {/* Title */}
      <div style={{ padding: '20px 27px 0' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700,
          color: '#1B3C2A', margin: '0 0 4px',
        }}>Menu</h1>
        <p style={{ fontSize: '13px', color: '#5A7A5A', margin: 0, fontWeight: 400 }}>
          Healthy food made for your goals
        </p>
      </div>

      {/* Meal cards */}
      <div style={{ padding: '20px 18px 0' }}>
        {menuItems.map((item, i) => {
          const qty = getQty(item.id)
          const added = qty > 0
          return (
          <div key={item.id} style={{
            display: 'flex', gap: '14px',
            backgroundColor: added ? 'white' : 'transparent',
            border: added ? '2px solid #8BAA3D' : '2px solid transparent',
            borderRadius: added ? '20px' : '0',
            marginBottom: i < menuItems.length - 1 ? '12px' : '0',
            padding: added ? '12px' : '0 6px',
            alignItems: 'flex-start',
            position: 'relative',
            transition: 'all 0.25s ease',
          }}>
            {/* Checkmark badge when added */}
            {added && (
              <div style={{
                position: 'absolute', top: '-6px', right: '-6px',
                width: '24px', height: '24px', borderRadius: '50%',
                backgroundColor: '#8BAA3D', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Food image placeholder */}
            <ImagePlaceholder
              width="110px" height="110px" radius={16}
              style={{ flexShrink: 0 }}
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
                    fontSize: '10px', fontWeight: 500,
                    backgroundColor: '#E8EDDA', color: '#5A7A3A',
                    borderRadius: '8px', padding: '4px 10px',
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
                    padding: '6px 16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'white', lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Add</span>
                  </button>
                ) : (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0',
                    backgroundColor: '#1B3C2A', borderRadius: '999px',
                    padding: '2px', overflow: 'hidden',
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
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ width: '32px', height: '4px', backgroundColor: '#8BAA3D', borderRadius: '2px', marginBottom: '12px' }} />
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '22px', fontWeight: 700, color: '#1B3C2A',
          margin: '0 0 6px',
        }}>Build your own bowl</h2>
        <p style={{ fontSize: '13px', color: '#5A7A5A', margin: '0 0 20px', lineHeight: 1.4 }}>
          Choose your ingredients and create a meal that fits your goals
        </p>
      </div>

      {/* White card: illustration + steps flow */}
      <div style={{ padding: '0 24px' }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '20px', padding: '24px 20px 20px',
        }}>
          {/* Bowl illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <ImagePlaceholder width="180px" height="110px" radius={16} />
          </div>

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '17px', fontWeight: 700, color: '#1B3C2A',
            textAlign: 'center', margin: '0 0 4px',
          }}>Build your own bowl</h3>
          <p style={{
            fontSize: '12px', color: '#5A7A5A', textAlign: 'center',
            margin: '0 0 24px',
          }}>Choose your ingredients in 4 easy steps.</p>

          {/* Step flow: 1 → 2 → 3 → 4 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', gap: '6px' }}>
            {steps.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '2px solid #8BAA3D',
                    backgroundColor: i === 0 ? '#8BAA3D' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontSize: '14px', fontWeight: 700,
                      color: i === 0 ? 'white' : '#8BAA3D',
                    }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#1B3C2A' }}>{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <span style={{ fontSize: '12px', color: '#B0ADA4', marginBottom: '18px' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark CTA bar: "Custom now" + GO */}
      <div style={{ padding: '12px 24px 24px' }}>
        <button onClick={() => navigate('/custom/protein')} style={{
          width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none',
          backgroundColor: '#1B3C2A', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px', fontWeight: 600, color: 'white',
          }}>Custom now</span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: '#8BAA3D', borderRadius: '999px', padding: '8px 18px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>GO</span>
            <span style={{ fontSize: '14px', color: 'white' }}>→</span>
          </div>
        </button>
      </div>

      {/* Sticky checkout bar when cart has items */}
      {cartCount > 0 && (
        <div style={{
          position: 'fixed', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '393px', zIndex: 40,
          padding: '0 16px', boxSizing: 'border-box',
        }}>
          <div onClick={() => navigate('/basket')} style={{
            backgroundColor: '#1B3C2A', borderRadius: '16px', padding: '14px 18px',
            boxShadow: '0 -2px 12px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                backgroundColor: '#8BAA3D', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
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
    </div>
  )
}
