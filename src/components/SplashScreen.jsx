import { useState, useEffect } from 'react'
import logoPng from '../assets/logo.png'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0) // 0=logo in, 1=text in, 2=fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #1B3C2A 0%, #0D2418 60%, #0A1C12 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 2 ? 0 : 1,
      transition: 'opacity 0.6s ease-out',
    }}>
      <style>{`
        @keyframes splashLogoIn {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes splashPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139,170,61,0.4), 0 12px 40px rgba(139,170,61,0.3); }
          50% { box-shadow: 0 0 0 16px rgba(139,170,61,0), 0 12px 40px rgba(139,170,61,0.3); }
        }
        @keyframes splashTextIn {
          from { opacity: 0; transform: translateY(16px); letter-spacing: 8px; }
          to { opacity: 1; transform: translateY(0); letter-spacing: 2px; }
        }
        @keyframes splashSubIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 0.5; transform: translateY(0); }
        }
        @keyframes splashBarGrow {
          from { width: 0; }
          to { width: 48px; }
        }
      `}</style>

      {/* Glow behind logo */}
      <div style={{
        position: 'absolute',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,170,61,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{
        width: '100px', height: '100px', borderRadius: '32px',
        background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'splashLogoIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both, splashPulse 2s ease-in-out 0.6s infinite',
        boxShadow: '0 12px 40px rgba(139,170,61,0.3)',
      }}>
        <img src={logoPng} alt="FitFork" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
      </div>

      {/* Brand name */}
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '32px', fontWeight: 800, color: 'white',
        margin: '24px 0 0', letterSpacing: '2px',
        opacity: phase >= 1 ? 1 : 0,
        animation: phase >= 1 ? 'splashTextIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both' : 'none',
      }}>
        Fit<span style={{ color: '#A0C044' }}>Fork</span>
      </h1>

      {/* Accent bar */}
      <div style={{
        height: '3px', borderRadius: '2px',
        background: 'linear-gradient(90deg, #8BAA3D, #A0C044)',
        marginTop: '12px',
        opacity: phase >= 1 ? 1 : 0,
        animation: phase >= 1 ? 'splashBarGrow 0.4s ease-out 0.2s both' : 'none',
      }} />

      {/* Tagline */}
      <p style={{
        fontSize: '13px', color: 'rgba(255,255,255,0.5)',
        marginTop: '14px', fontWeight: 500, letterSpacing: '0.5px',
        opacity: phase >= 1 ? 1 : 0,
        animation: phase >= 1 ? 'splashSubIn 0.4s ease-out 0.35s both' : 'none',
      }}>
        Healthy food, made for you
      </p>
    </div>
  )
}
