import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian', sub: 'No meat or fish', icon: '🥬' },
  { id: 'vegan', label: 'Vegan', sub: 'No animal products', icon: '🌱' },
  { id: 'gluten-free', label: 'Gluten-free', sub: 'No wheat, barley, rye', icon: '🌾' },
  { id: 'lactose-free', label: 'Lactose-free', sub: 'No dairy products', icon: '🥛' },
]

const allergyOptions = ['Nuts', 'Shellfish', 'Soy', 'Eggs', 'Sesame']
const allergyIcons = { Nuts: '🥜', Shellfish: '🦐', Soy: '🫘', Eggs: '🥚', Sesame: '🫒' }

const notificationOptions = [
  { id: 'order_updates', label: 'Order updates', sub: 'Status and delivery alerts', icon: '📦' },
  { id: 'promotions', label: 'Promotions', sub: 'Deals and special offers', icon: '⭐' },
  { id: 'streak_reminders', label: 'Streak reminders', sub: "Don't lose your streak!", icon: '🔥' },
]

export default function PreferencesPage() {
  const navigate = useNavigate()
  const [dietary, setDietary] = useState({})
  const [allergies, setAllergies] = useState([])
  const [notifications, setNotifications] = useState({})

  const toggleDiet = (id) => setDietary((s) => ({ ...s, [id]: !s[id] }))
  const toggleAllergy = (a) => setAllergies((s) => s.includes(a) ? s.filter((x) => x !== a) : [...s, a])
  const toggleNotif = (id) => setNotifications((s) => ({ ...s, [id]: !s[id] }))

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{
      width: '44px', height: '26px', borderRadius: '13px',
      background: on ? 'linear-gradient(135deg, #8BAA3D, #A0C044)' : 'rgba(0,0,0,0.08)',
      padding: '2px', cursor: 'pointer',
      display: 'flex', alignItems: 'center',
      justifyContent: on ? 'flex-end' : 'flex-start',
      transition: 'all 0.2s ease',
      flexShrink: 0,
    }}>
      <div style={{
        width: '22px', height: '22px', borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transition: 'all 0.2s ease',
      }} />
    </div>
  )

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Preferences</h1>
        <div style={{ width: '28px' }} />
      </div>

      {/* Dietary preferences */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Dietary preferences</p>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '4px 16px' }}>
          {dietaryOptions.map((opt, i) => (
            <div key={opt.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 0',
              borderBottom: i < dietaryOptions.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
              }}>{opt.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{opt.label}</span>
                <span style={{ fontSize: '11px', color: '#7A8A6A' }}>{opt.sub}</span>
              </div>
              <Toggle on={dietary[opt.id]} onToggle={() => toggleDiet(opt.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Allergies</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allergyOptions.map((a) => {
            const active = allergies.includes(a)
            return (
              <button key={a} onClick={() => toggleAllergy(a)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '999px',
                border: active ? '1.5px solid rgba(139,170,61,0.4)' : '1px solid rgba(255,255,255,0.5)',
                background: active ? 'rgba(139,170,61,0.1)' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                color: active ? '#1B3C2A' : '#7A8A6A',
              }}>
                <span style={{ fontSize: '14px' }}>{allergyIcons[a]}</span>
                {a}
              </button>
            )
          })}
          <button style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '8px 14px', borderRadius: '999px',
            border: '1.5px dashed rgba(139,170,61,0.2)', backgroundColor: 'transparent',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#7A8A6A',
          }}>
            + Add other
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>Notifications</p>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '4px 16px' }}>
          {notificationOptions.map((opt, i) => (
            <div key={opt.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 0',
              borderBottom: i < notificationOptions.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
              }}>{opt.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{opt.label}</span>
                <span style={{ fontSize: '11px', color: '#7A8A6A' }}>{opt.sub}</span>
              </div>
              <Toggle on={notifications[opt.id]} onToggle={() => toggleNotif(opt.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div style={{ padding: '28px 24px 0' }}>
        <button onClick={() => navigate('/profile')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Back</button>
      </div>
    </div>
  )
}
