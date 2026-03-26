import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { vegetables } from '../data/ingredients'

export default function CustomBowlVegPage() {
  const navigate = useNavigate()
  const { selectedVegetables, toggleVegetable } = useStore()
  const canContinue = selectedVegetables.length >= 1

  return (
    <div style={{ backgroundColor: '#F5F4EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/custom/carbs')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button onClick={() => { useStore.getState().resetCustomBowl(); navigate('/menu') }} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#8A8F84', cursor: 'pointer' }}>Cancel</button>
      </div>

      <div style={{ padding: '12px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '12px', color: '#8A8F84' }}>3 / 4</span>
      </div>
      <div style={{ padding: '8px 24px 0', display: 'flex', gap: '4px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '999px', backgroundColor: i <= 2 ? '#8BAA3D' : '#E8EDDA' }} />
        ))}
      </div>

      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Vegetables</h1>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#8BAA3D' }}>Choose 1-2</span>
      </div>
      <div style={{ padding: '4px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#5A7A5A' }}>Select your vegetable base</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', backgroundColor: '#E8EDDA', borderRadius: '999px', padding: '4px 12px' }}>CHF 3.00</span>
      </div>

      <div style={{ flex: 1, padding: '20px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignContent: 'start' }}>
        {vegetables.map((item) => {
          const selected = selectedVegetables.includes(item.id)
          return (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div onClick={() => toggleVegetable(item.id)} style={{
                width: '90px', height: '90px', borderRadius: '50%', cursor: 'pointer',
                backgroundColor: '#D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: '#6B7280', fontWeight: 500,
                border: selected ? '3px solid #8BAA3D' : '3px solid transparent', boxSizing: 'border-box',
              }}>Image</div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1B3C2A', textAlign: 'center' }}>{item.name}</span>
              <span style={{ fontSize: '10px', color: '#7A7F74' }}>{item.kcal} kcal</span>
              <button onClick={() => toggleVegetable(item.id)} style={{
                fontSize: '10px', fontWeight: 600, border: 'none', borderRadius: '999px',
                padding: '4px 14px', cursor: 'pointer',
                backgroundColor: selected ? '#8BAA3D' : '#E8EDDA', color: selected ? 'white' : '#5A7A3A',
              }}>{selected ? '✓ Added' : '+ Add'}</button>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '16px 24px 32px' }}>
        <button onClick={() => canContinue && navigate('/custom/extras')} disabled={!canContinue} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          backgroundColor: canContinue ? '#1B3C2A' : '#E8EDDA',
          color: canContinue ? 'white' : '#8A8F84',
          fontSize: '14px', fontWeight: 600, cursor: canContinue ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          Continue to Extra
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </div>
  )
}
