import { useNavigate } from 'react-router-dom'

const hours = [
  { day: 'Monday', time: '11:00 – 21:00' },
  { day: 'Tuesday', time: '11:00 – 21:00' },
  { day: 'Wednesday', time: '11:00 – 21:00' },
  { day: 'Thursday', time: '11:00 – 21:00' },
  { day: 'Friday', time: '11:00 – 22:00' },
  { day: 'Saturday', time: '11:30 – 22:00' },
  { day: 'Sunday', time: '11:30 – 20:00' },
]

const infoCards = [
  { icon: '🕐', title: 'Last order 30 min before closing', sub: 'Kitchen closes earlier than the restaurant' },
  { icon: '🚚', title: 'Delivery until 30 min before closing', sub: 'Free delivery from CHF 25' },
  { icon: '🎉', title: 'Public holidays', sub: 'Hours may vary · check our socials' },
]

export default function OpeningHoursPage() {
  const navigate = useNavigate()
  const now = new Date()
  const today = now.toLocaleDateString('en-US', { weekday: 'long' })
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  // Check if currently open based on today's hours
  const todayEntry = hours.find((h) => h.day === today)
  const isOpen = (() => {
    if (!todayEntry) return false
    const [openStr, closeStr] = todayEntry.time.split(' – ')
    const [oh, om] = openStr.split(':').map(Number)
    const [ch, cm] = closeStr.split(':').map(Number)
    return currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm
  })()

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/maps')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, background: 'linear-gradient(135deg, #1B3C2A, #8BAA3D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, flex: 1 }}>Opening hours</h1>
          <span style={{
            fontSize: '12px', fontWeight: 600, color: 'white',
            background: isOpen ? 'linear-gradient(135deg, #1B3C2A, #2D5A3F)' : 'linear-gradient(135deg, #8B2020, #A03030)', borderRadius: '999px',
            padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isOpen ? '#8BAA3D' : '#FF6B6B' }} />
            {isOpen ? 'Open now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Weekly schedule */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', borderRadius: '20px', padding: '4px 16px' }}>
          {hours.map((h, i) => {
            const isToday = h.day === today
            return (
              <div key={h.day} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 0', borderBottom: i < hours.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
                background: isToday ? 'rgba(139,170,61,0.06)' : 'none', borderRadius: isToday ? '10px' : 0, margin: isToday ? '0 -8px' : 0, padding: isToday ? '14px 8px' : '14px 0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: isToday ? 700 : 500, color: '#1B3C2A' }}>{h.day}</span>
                  {isToday && (
                    <span style={{ fontSize: '9px', fontWeight: 600, color: 'white', background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', borderRadius: '4px', padding: '2px 6px' }}>Today</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#5A7A5A', fontWeight: isToday ? 600 : 400 }}>{h.time}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Good to know */}
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#B0ADA4', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Good to know</p>
        {infoCards.map((card, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            padding: '14px 0', borderBottom: i < infoCards.length - 1 ? '1px solid rgba(139,170,61,0.1)' : 'none',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
            }}>{card.icon}</div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{card.title}</span>
              <span style={{ fontSize: '12px', color: '#7A8A6A' }}>{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTAs */}
      <div style={{ padding: '20px 24px 0', display: 'flex', gap: '12px' }}>
        <button onClick={() => navigate('/menu')} style={{
          flex: 1, padding: '14px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>Order Now</button>
        <button style={{
          flex: 1, padding: '14px', borderRadius: '999px',
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          color: '#1B3C2A', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>Dine-in</button>
      </div>
    </div>
  )
}
