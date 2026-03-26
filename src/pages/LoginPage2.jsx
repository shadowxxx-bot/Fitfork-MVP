import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

export default function LoginPage2() {
  const navigate = useNavigate()
  const login = useStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    login({ name: email.split('@')[0] || 'User', email, phone: '', dob: '' })
    navigate('/')
  }

  const fieldStyle = (key) => ({
    width: '100%', backgroundColor: 'white',
    border: focusedInput === key ? '2px solid #8BAA3D' : '1.5px solid #D4D1C8',
    borderRadius: '12px', padding: '16px', fontSize: '15px', color: '#1B3C2A',
    outline: 'none', boxSizing: 'border-box', fontFamily: "'Bricolage Grotesque', sans-serif",
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 8px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: '#8A8F84', margin: '0 0 32px' }}>
          Sign in to your account
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#8A8F84', fontWeight: 500, marginBottom: '6px' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)}
              placeholder="your@email.com" style={fieldStyle('email')} autoFocus />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#8A8F84', fontWeight: 500, marginBottom: '6px' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)}
              placeholder="Enter your password" style={fieldStyle('password')} />
          </div>
          <div style={{ textAlign: 'right', marginBottom: '28px' }}>
            <span style={{ fontSize: '12px', color: '#8BAA3D', fontWeight: 500, cursor: 'pointer' }}>Forgot password?</span>
          </div>
          <button type="submit" style={{
            width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
            backgroundColor: '#1B3C2A', color: 'white', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Sign in
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#8A8F84', marginTop: '24px' }}>
          Don't have an account? <span onClick={() => navigate('/onboarding')} style={{ color: '#8BAA3D', fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
        </p>
      </div>
    </div>
  )
}
