import { useNavigate } from 'react-router-dom'

/* Deterministic 15×15 QR-like grid */
const QR = 15
const qrData = (() => {
  const g = Array(QR * QR).fill(0)
  const finder = (ox, oy) => {
    for (let y = 0; y < 5; y++)
      for (let x = 0; x < 5; x++) {
        const border = x === 0 || x === 4 || y === 0 || y === 4
        const center = x === 2 && y === 2
        if (border || center) g[(oy + y) * QR + (ox + x)] = 1
      }
  }
  finder(0, 0); finder(10, 0); finder(0, 10)
  let s = 99
  for (let i = 0; i < g.length; i++) {
    const x = i % QR, y = Math.floor(i / QR)
    const near = (x < 6 && y < 6) || (x >= 9 && y < 6) || (x < 6 && y >= 9)
    if (!near && g[i] === 0) { s = (s * 1103515245 + 12345) & 0x7fffffff; g[i] = s % 3 !== 0 ? 1 : 0 }
  }
  return g
})()

export default function StreakQRCodePage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/rewards')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 40px' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', marginBottom: '8px', textAlign: 'center' }}>
          Your QR Code
        </h1>
        <p style={{ fontSize: '14px', color: '#7A7F74', textAlign: 'center', marginBottom: '32px' }}>
          Show this at the counter to earn points
        </p>

        {/* QR Code */}
        <div style={{
          backgroundColor: 'white', borderRadius: '20px', padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '32px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${QR}, 1fr)`,
            gap: '2px', width: '180px', height: '180px',
          }}>
            {qrData.map((v, i) => (
              <div key={i} style={{
                backgroundColor: v ? '#1B3C2A' : 'white',
                borderRadius: '1px',
              }} />
            ))}
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#8A8F84', textAlign: 'center', marginBottom: '24px' }}>
          Scan once per order to add points
        </p>

        <button onClick={() => navigate('/rewards')} style={{
          backgroundColor: '#1B3C2A', color: 'white', border: 'none',
          borderRadius: '999px', padding: '14px 40px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>Done</button>
      </div>
    </div>
  )
}
