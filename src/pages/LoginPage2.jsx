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
    navigate('/rewards')
  }

  const fieldStyle = (key) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    border: focusedInput === key ? '1.5px solid rgba(139,170,61,0.5)' : '1px solid rgba(255,255,255,0.5)',
    borderRadius: '16px', padding: '16px', fontSize: '15px', color: '#1B3C2A',
    outline: 'none', boxSizing: 'border-box', fontFamily: "'Bricolage Grotesque', sans-serif",
    transition: 'all 0.25s ease',
    boxShadow: focusedInput === key ? '0 0 0 3px rgba(139,170,61,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
  })

  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/login')} style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px',
          width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <div style={{ padding: '24px 24px 0' }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 8px',
        }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: '#7A8A6A', margin: '0 0 32px' }}>
          Sign in to your account
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#7A8A6A', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.3px' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)}
              placeholder="your@email.com" style={fieldStyle('email')} autoFocus />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#7A8A6A', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.3px' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)}
              placeholder="Enter your password" style={fieldStyle('password')} />
          </div>
          <div style={{ textAlign: 'right', marginBottom: '28px' }}>
            <span style={{ fontSize: '12px', color: '#8BAA3D', fontWeight: 600, cursor: 'pointer' }}>Forgot password?</span>
          </div>
          <button type="submit" style={{
            width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
            background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
            color: 'white', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 4px 16px rgba(27,60,42,0.25)',
            transition: 'transform 0.2s ease',
          }}>
            Sign in
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#7A8A6A', marginTop: '24px' }}>
          Don't have an account? <span onClick={() => navigate('/onboarding')} style={{ color: '#8BAA3D', fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
        </p>
      </div>
    </div>
  )
}
