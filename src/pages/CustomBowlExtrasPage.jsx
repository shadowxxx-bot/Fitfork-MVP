import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { extras } from '../data/ingredients'
import platImages from '../assets/platImages'

export default function CustomBowlExtrasPage() {
  const navigate = useNavigate()
  const { selectedExtras, toggleExtra } = useStore()
  const canContinue = selectedExtras.length >= 1

  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/custom/veg')} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={() => { useStore.getState().resetCustomBowl(); navigate('/menu') }} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#B0ADA4', cursor: 'pointer' }}>Cancel</button>
      </div>

      <div style={{ padding: '12px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '12px', color: '#8A8F84' }}>4 / 4</span>
      </div>
      <div style={{ padding: '8px 24px 0', display: 'flex', gap: '4px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '999px', background: 'linear-gradient(90deg, #8BAA3D, #A0C044)' }} />
        ))}
      </div>

      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Extra</h1>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#8BAA3D' }}>Choose 1-2</span>
      </div>
      <div style={{ padding: '4px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#7A8A6A' }}>Select your extra</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)', borderRadius: '999px', padding: '4px 12px' }}>CHF 1.50</span>
      </div>

      <div style={{ flex: 1, padding: '20px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignContent: 'start' }}>
        {extras.map((item) => {
          const selected = selectedExtras.includes(item.id)
          return (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div onClick={() => toggleExtra(item.id)} style={{
                width: '90px', height: '90px', borderRadius: '50%', cursor: 'pointer',
                background: 'linear-gradient(135deg, #E8EDDA 0%, #D4DCBE 100%)', border: selected ? '3px solid #8BAA3D' : '1px solid rgba(139,170,61,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: '#6B7280', fontWeight: 500,
                boxShadow: selected ? '0 0 0 4px rgba(139,170,61,0.15)' : 'none', boxSizing: 'border-box', overflow: 'hidden', padding: 0,
              }}>{platImages[item.id] ? <img src={platImages[item.id]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'Image'}</div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', textAlign: 'center' }}>{item.name}</span>
              <span style={{ fontSize: '10px', color: '#7A7F74' }}>{item.kcal} kcal</span>
              <button onClick={() => toggleExtra(item.id)} style={{
                fontSize: '10px', fontWeight: 600, borderRadius: '999px',
                padding: '4px 14px', cursor: 'pointer',
                ...(selected
                  ? { background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 2px 8px rgba(139,170,61,0.3)', color: 'white', border: 'none' }
                  : { background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)', color: '#5A7A3A' }),
              }}>{selected ? '✓ Added' : '+ Add'}</button>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '16px 24px 32px' }}>
        <button onClick={() => canContinue && navigate('/custom/recap')} disabled={!canContinue} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          ...(canContinue
            ? { background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)', boxShadow: '0 4px 16px rgba(27,60,42,0.25)', color: 'white' }
            : { background: 'rgba(139,170,61,0.08)', color: '#B0ADA4' }),
          fontSize: '14px', fontWeight: 600, cursor: canContinue ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </div>
  )
}
