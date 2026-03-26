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
      backgroundColor: on ? '#8BAA3D' : '#D4D1C8',
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
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 style={{ flex: 1, textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Preferences</h1>
        <div style={{ width: '28px' }} />
      </div>

      {/* Dietary preferences */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', fontWeight: 500, margin: '0 0 12px' }}>Dietary preferences</p>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '4px 16px' }}>
          {dietaryOptions.map((opt, i) => (
            <div key={opt.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 0',
              borderBottom: i < dietaryOptions.length - 1 ? '1px solid #EEF2E6' : 'none',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EEF2E6',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
              }}>{opt.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{opt.label}</span>
                <span style={{ fontSize: '11px', color: '#8A8F84' }}>{opt.sub}</span>
              </div>
              <Toggle on={dietary[opt.id]} onToggle={() => toggleDiet(opt.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', fontWeight: 500, margin: '0 0 12px' }}>Allergies</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allergyOptions.map((a) => {
            const active = allergies.includes(a)
            return (
              <button key={a} onClick={() => toggleAllergy(a)} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '999px',
                border: active ? '1.5px solid #8BAA3D' : '1.5px solid #D4D1C8',
                backgroundColor: active ? '#F0F5E6' : 'white',
                cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                color: active ? '#1B3C2A' : '#8A8F84',
              }}>
                <span style={{ fontSize: '14px' }}>{allergyIcons[a]}</span>
                {a}
              </button>
            )
          })}
          <button style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '8px 14px', borderRadius: '999px',
            border: '1.5px dashed #D4D1C8', backgroundColor: 'transparent',
            cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#8A8F84',
          }}>
            + Add other
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '24px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', fontWeight: 500, margin: '0 0 12px' }}>Notifications</p>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '4px 16px' }}>
          {notificationOptions.map((opt, i) => (
            <div key={opt.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 0',
              borderBottom: i < notificationOptions.length - 1 ? '1px solid #EEF2E6' : 'none',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EEF2E6',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
              }}>{opt.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{opt.label}</span>
                <span style={{ fontSize: '11px', color: '#8A8F84' }}>{opt.sub}</span>
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
          backgroundColor: '#8BAA3D', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Back</button>
      </div>
    </div>
  )
}
