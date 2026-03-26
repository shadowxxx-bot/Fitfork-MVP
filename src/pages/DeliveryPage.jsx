import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function DeliveryPage() {
  const navigate = useNavigate()
  const { deliveryInfo, setDeliveryInfo } = useStore()
  const [form, setForm] = useState({ ...deliveryInfo })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleContinue = (e) => {
    e.preventDefault()
    setDeliveryInfo(form)
    navigate('/checkout')
  }

  const fieldStyle = {
    width: '100%', backgroundColor: 'white', border: '2px solid #8BAA3D',
    borderRadius: '14px', padding: '16px', fontSize: '15px', color: '#1B3C2A',
    fontWeight: 500, outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Bricolage Grotesque', sans-serif",
  }

  const labelStyle = {
    display: 'block', fontSize: '13px', color: '#1B3C2A', fontWeight: 600,
    marginBottom: '8px', marginTop: '20px',
  }

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
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button onClick={() => navigate('/basket')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={() => navigate('/basket')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '14px', color: '#8A8F84', fontWeight: 500, padding: 0,
        }}>Cancel</button>
      </div>

      {/* Title */}
      <div style={{ padding: '0 24px' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px',
          fontWeight: 700, color: '#1B3C2A', margin: '0 0 4px',
        }}>Enter the delivery details</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleContinue} style={{ padding: '0 24px' }}>
        {fields.map((f) => (
          <div key={f.key}>
            <label style={labelStyle}>{f.label}</label>
            <input
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={fieldStyle}
            />
          </div>
        ))}

        {/* Continue button */}
        <button type="submit" style={{
          width: '100%', padding: '18px', borderRadius: '999px', border: 'none',
          backgroundColor: '#1B3C2A', color: 'white',
          fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          marginTop: '28px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '12px',
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
