import { useNavigate } from 'react-router-dom'
import appleSvg from '../assets/apple.svg'
import googleJpg from '../assets/google.jpg'
import logoPng from '../assets/logo.png'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Back button */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate(-1)} style={{
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

      {/* Logo area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{
          width: '110px', height: '110px', borderRadius: '32px',
          background: 'linear-gradient(135deg, rgba(139,170,61,0.15) 0%, rgba(139,170,61,0.08) 100%)',
          border: '1.5px solid rgba(139,170,61,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(139,170,61,0.1)',
          animation: 'float 4s ease-in-out infinite',
        }}>
          <img src={logoPng} alt="FitFork" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '34px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #8BAA3D 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textAlign: 'center', margin: '0 0 8px',
        }}>
          FitFork
        </h1>
        <p style={{ fontSize: '14px', color: '#7A8A6A', textAlign: 'center', lineHeight: 1.5 }}>
          Healthy bowls, crafted for you
        </p>
      </div>

      {/* Buttons */}
      <div style={{ padding: '0 24px 48px', animation: 'fadeInUp 0.5s ease-out both' }}>
        <button onClick={() => navigate('/onboarding')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
          color: 'white', fontSize: '15px', fontWeight: 600,
          cursor: 'pointer', marginBottom: '12px', fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: '0 4px 16px rgba(139,170,61,0.3)',
          transition: 'transform 0.2s ease',
        }}>
          Create an account
        </button>

        <button onClick={() => navigate('/login-2')} className="glass-card" style={{
          width: '100%', padding: '16px', borderRadius: '999px',
          color: '#1B3C2A', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          marginBottom: '20px', fontFamily: "'Space Grotesk', sans-serif",
          transition: 'transform 0.2s ease',
        }}>
          I already have an account
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,170,61,0.2), transparent)' }} />
          <span style={{ fontSize: '12px', color: '#7A8A6A' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,170,61,0.2), transparent)' }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/onboarding')} className="glass-card hover-lift" style={{
            flex: 1, padding: '14px', borderRadius: '16px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <img src={googleJpg} alt="Google" style={{ width: '22px', height: '22px', borderRadius: '4px', objectFit: 'contain' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#1B3C2A' }}>Google</span>
          </button>
          <button onClick={() => navigate('/onboarding')} className="glass-card hover-lift" style={{
            flex: 1, padding: '14px', borderRadius: '16px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <img src={appleSvg} alt="Apple" style={{ width: '20px', height: '20px' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#1B3C2A' }}>Apple</span>
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#B0ADA4', marginTop: '20px', lineHeight: 1.4 }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  )
}
