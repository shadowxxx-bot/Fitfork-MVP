import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function StreakRegisterPage() {
  const navigate = useNavigate()
  const { login, unlockStreak } = useStore()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: 'User', email, phone: '' })
    unlockStreak()
    navigate('/rewards')
  }

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/rewards')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      </div>

      {/* Illustration placeholder */}
      <div style={{ padding: '16px 24px' }}>
        <div style={{
          height: '200px', backgroundColor: '#E8EDDA', borderRadius: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', color: '#8A8F84', fontWeight: 500,
        }}>Image</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '0 24px 32px' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 8px' }}>
          Join FitFork Rewards
        </h1>
        <p style={{ fontSize: '14px', color: '#7A7F74', margin: '0 0 24px', lineHeight: 1.5 }}>
          Earn discounts with every order. Start your streak and unlock up to -10% off + free dishes.
        </p>

        {/* Benefits */}
        {[
          { icon: '🎯', text: 'Earn points with every order' },
          { icon: '📈', text: 'Discounts grow as you order more' },
          { icon: '🍽️', text: 'Free dishes at 30+ orders' },
        ].map((b) => (
          <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E8EDDA',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
            }}>{b.icon}</div>
            <span style={{ fontSize: '13px', color: '#1B3C2A', fontWeight: 500 }}>{b.text}</span>
          </div>
        ))}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#7A7F74', fontWeight: 500, marginBottom: '6px' }}>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" style={{
            width: '100%', backgroundColor: 'white', border: '1.5px solid #E8EDDA',
            borderRadius: '12px', padding: '14px 16px', fontSize: '14px', color: '#1B3C2A',
            outline: 'none', boxSizing: 'border-box', marginBottom: '20px',
          }} />
          <button type="submit" style={{
            width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
            backgroundColor: '#8BAA3D', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>Join Now</button>
        </form>
      </div>
    </div>
  )
}
