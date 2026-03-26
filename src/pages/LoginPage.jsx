import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Logo area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #E8EDDA 0%, #D4E8B0 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
        }}>
          <span style={{ fontSize: '44px' }}>🥗</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '32px', fontWeight: 700, color: '#1B3C2A', textAlign: 'center', margin: '0 0 8px' }}>
          FitFork
        </h1>
        <p style={{ fontSize: '14px', color: '#8A8F84', textAlign: 'center', lineHeight: 1.5 }}>
          Healthy bowls, crafted for you
        </p>
      </div>

      {/* Buttons */}
      <div style={{ padding: '0 24px 48px' }}>
        {/* Create account / onboarding */}
        <button onClick={() => navigate('/onboarding')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          backgroundColor: '#8BAA3D', color: 'white', fontSize: '15px', fontWeight: 600,
          cursor: 'pointer', marginBottom: '12px', fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Create an account
        </button>

        {/* Login for returning users */}
        <button onClick={() => navigate('/login-2')} style={{
          width: '100%', padding: '16px', borderRadius: '999px',
          border: '1.5px solid #1B3C2A', backgroundColor: 'transparent',
          color: '#1B3C2A', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          marginBottom: '20px', fontFamily: "'Space Grotesk', sans-serif",
        }}>
          I already have an account
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#D4D1C8' }} />
          <span style={{ fontSize: '12px', color: '#8A8F84' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#D4D1C8' }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/onboarding')} style={{
            flex: 1, padding: '14px', borderRadius: '14px',
            border: '1px solid #D4D1C8', backgroundColor: 'white',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '18px' }}>G</span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#1B3C2A' }}>Google</span>
          </button>
          <button onClick={() => navigate('/onboarding')} style={{
            flex: 1, padding: '14px', borderRadius: '14px',
            border: '1px solid #D4D1C8', backgroundColor: 'white',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '18px' }}></span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#1B3C2A' }}>Apple</span>
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#8A8F84', marginTop: '20px', lineHeight: 1.4 }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}
