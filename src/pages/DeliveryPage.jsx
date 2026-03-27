import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function DeliveryPage() {
  const navigate = useNavigate()
  const { deliveryInfo, setDeliveryInfo } = useStore()
  const [form, setForm] = useState({ ...deliveryInfo })
  const [focusedKey, setFocusedKey] = useState(null)

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleContinue = (e) => {
    e.preventDefault()
    setDeliveryInfo(form)
    navigate('/checkout')
  }

  const fieldStyle = (key) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    border: focusedKey === key ? '1.5px solid rgba(139,170,61,0.5)' : '1px solid rgba(255,255,255,0.5)',
    borderRadius: '16px', padding: '16px', fontSize: '15px', color: '#1B3C2A',
    fontWeight: 500, outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Bricolage Grotesque', sans-serif",
    transition: 'all 0.25s ease',
    boxShadow: focusedKey === key ? '0 0 0 3px rgba(139,170,61,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
  })

  const fields = [
    { key: 'firstName', label: 'First name', placeholder: 'Guy' },
    { key: 'lastName', label: 'Last name', placeholder: 'Beroud' },
    { key: 'company', label: 'Company name', placeholder: 'Events Concept' },
    { key: 'address', label: 'Address', placeholder: 'Esplanade de Pont - Rouge' },
    { key: 'houseNumber', label: 'House Number', placeholder: '6' },
    { key: 'postalCode', label: 'Postal code', placeholder: '1212' },
    { key: 'city', label: 'City', placeholder: 'Geneva' },
  ]

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={() => navigate('/basket')} style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
          width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={() => navigate('/basket')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '14px', color: '#B0ADA4', fontWeight: 500, padding: 0,
        }}>Cancel</button>
      </div>

      {/* Title */}
      <div style={{ padding: '0 24px' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 4px',
        }}>Enter the delivery details</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleContinue} style={{ padding: '0 24px' }}>
        {fields.map((f, i) => (
          <div key={f.key} style={{ animation: `fadeInUp ${0.2 + i * 0.05}s ease-out both` }}>
            <label style={{
              display: 'block', fontSize: '12px', color: '#7A8A6A', fontWeight: 600,
              marginBottom: '6px', marginTop: '18px', letterSpacing: '0.3px',
            }}>{f.label}</label>
            <input
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              onFocus={() => setFocusedKey(f.key)}
              onBlur={() => setFocusedKey(null)}
              placeholder={f.placeholder}
              style={fieldStyle(f.key)}
            />
          </div>
        ))}

        <button type="submit" style={{
          width: '100%', padding: '18px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
          color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          marginTop: '28px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '12px',
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: '0 4px 16px rgba(27,60,42,0.25)',
          transition: 'transform 0.2s ease',
        }}>
          <span>Continue</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
    </div>
  )
}
