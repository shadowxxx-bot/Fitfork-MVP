import { useNavigate } from 'react-router-dom'

const hours = [
  { day: 'Monday', time: '11:00 – 21:00' },
  { day: 'Tuesday', time: '11:00 – 21:00' },
  { day: 'Wednesday', time: '11:00 – 21:00' },
  { day: 'Thursday', time: '11:00 – 21:00' },
  { day: 'Friday', time: '11:00 – 22:00' },
  { day: 'Saturday', time: '11:30 – 22:00', highlight: true },
  { day: 'Sunday', time: '11:30 – 20:00' },
]

const infoCards = [
  { icon: '🕐', title: 'Last order 30 min before closing', sub: 'Kitchen closes earlier than the restaurant' },
  { icon: '🚚', title: 'Delivery until 30 min before closing', sub: 'Free delivery from CHF 25' },
  { icon: '🎉', title: 'Public holidays', sub: 'Hours may vary · check our socials' },
]

export default function OpeningHoursPage() {
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/maps')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: 0, flex: 1 }}>Opening hours</h1>
          <span style={{
            fontSize: '12px', fontWeight: 600, color: 'white',
            backgroundColor: '#1B3C2A', borderRadius: '999px',
            padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8BAA3D' }} />
            Open now
          </span>
        </div>
      </div>

      {/* Weekly schedule */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '4px 16px' }}>
          {hours.map((h, i) => {
            const isToday = h.day === today
            const isHighlight = h.highlight
            return (
              <div key={h.day} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 0', borderBottom: i < hours.length - 1 ? '1px solid #E8EDDA' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: isToday ? 700 : 500, color: '#1B3C2A' }}>{h.day}</span>
                  {isHighlight && (
                    <span style={{ fontSize: '9px', fontWeight: 600, color: 'white', backgroundColor: '#8BAA3D', borderRadius: '4px', padding: '2px 6px' }}>Today</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', color: '#5A7A5A', fontWeight: isHighlight ? 600 : 400 }}>{h.time}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Good to know */}
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', margin: '0 0 10px' }}>Good to know</p>
        {infoCards.map((card, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            padding: '14px 0', borderBottom: i < infoCards.length - 1 ? '1px solid #E8EDDA' : 'none',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E8EDDA',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0,
            }}>{card.icon}</div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{card.title}</span>
              <span style={{ fontSize: '12px', color: '#7A7F74' }}>{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTAs */}
      <div style={{ padding: '20px 24px 0', display: 'flex', gap: '12px' }}>
        <button onClick={() => navigate('/menu')} style={{
          flex: 1, padding: '14px', borderRadius: '999px', border: 'none',
          backgroundColor: '#8BAA3D', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>Order Now</button>
        <button style={{
          flex: 1, padding: '14px', borderRadius: '999px',
          border: '1.5px solid #1B3C2A', backgroundColor: 'transparent',
          color: '#1B3C2A', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>Dine-in</button>
      </div>
    </div>
  )
}
