import { useNavigate } from 'react-router-dom'

const podium = [
  { rank: 2, name: 'Sarah M.', orders: 47, avatar: 'S' },
  { rank: 1, name: 'Alex K.', orders: 63, avatar: 'A' },
  { rank: 3, name: 'Luca B.', orders: 41, avatar: 'L' },
]

const rankings = [
  { rank: 4, name: 'Emma R.', orders: 38 },
  { rank: 5, name: 'Noah P.', orders: 35 },
  { rank: 6, name: 'Julie T.', orders: 31 },
  { rank: 7, name: 'Marc D.', orders: 28 },
  { rank: 8, name: 'Clara W.', orders: 25 },
  { rank: 9, name: 'Tom H.', orders: 22 },
  { rank: 10, name: 'Lea F.', orders: 19 },
]

const podiumColors = {
  1: { bg: 'linear-gradient(135deg, #FFD700, #FFA500)', shadow: 'rgba(255,215,0,0.4)', border: 'rgba(255,215,0,0.6)' },
  2: { bg: 'linear-gradient(135deg, #C0C0C0, #A8A8A8)', shadow: 'rgba(192,192,192,0.4)', border: 'rgba(192,192,192,0.6)' },
  3: { bg: 'linear-gradient(135deg, #CD7F32, #B8690E)', shadow: 'rgba(205,127,50,0.4)', border: 'rgba(205,127,50,0.6)' },
}

const podiumHeights = { 1: 120, 2: 90, 3: 70 }

export default function LeaderboardPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ padding: '28px 24px 0' }}>
        <span style={{ fontSize: '13px', color: '#7A8A6A' }}>Community</span>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700,
          background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '2px 0 0',
        }}>Leaderboard</h1>
      </div>

      {/* Podium section */}
      <div style={{ padding: '24px 24px 0', animation: 'fadeInUp 0.4s ease-out both' }}>
        <div style={{
          background: 'linear-gradient(145deg, #1B3C2A 0%, #0D2418 100%)',
          borderRadius: '28px', padding: '28px 16px 0', position: 'relative', overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(27,60,42,0.3)',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(139,170,61,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 700,
            color: 'rgba(255,255,255,0.7)', textAlign: 'center', margin: '0 0 20px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>Top Orderers</p>

          {/* Podium blocks */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', paddingBottom: '0' }}>
            {podium.map((user) => {
              const colors = podiumColors[user.rank]
              const height = podiumHeights[user.rank]
              return (
                <div key={user.rank} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1,
                  animation: `fadeInUp ${0.3 + user.rank * 0.1}s ease-out both`,
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: user.rank === 1 ? '56px' : '46px',
                    height: user.rank === 1 ? '56px' : '46px',
                    borderRadius: '50%', background: colors.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 4px 16px ${colors.shadow}`,
                    border: `2px solid ${colors.border}`,
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontSize: user.rank === 1 ? '20px' : '16px',
                      fontWeight: 800, color: 'white',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>{user.avatar}</span>
                  </div>

                  {/* Name */}
                  <span style={{
                    fontSize: '12px', fontWeight: 700, color: 'white',
                    marginBottom: '2px', textAlign: 'center',
                  }}>{user.name}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                    {user.orders} orders
                  </span>

                  {/* Podium block */}
                  <div style={{
                    width: '100%', height: `${height}px`,
                    background: `linear-gradient(180deg, rgba(139,170,61,${user.rank === 1 ? '0.3' : '0.15'}) 0%, rgba(139,170,61,0.05) 100%)`,
                    borderRadius: '14px 14px 0 0',
                    border: '1px solid rgba(139,170,61,0.2)',
                    borderBottom: 'none',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    paddingTop: '12px',
                  }}>
                    <span style={{
                      fontSize: user.rank === 1 ? '24px' : '20px',
                      fontWeight: 800, color: user.rank === 1 ? '#FFD700' : 'rgba(255,255,255,0.6)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>#{user.rank}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Rankings list */}
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{
          fontSize: '12px', color: '#B0ADA4', margin: '0 0 12px',
          fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>Rankings</p>

        {rankings.map((user, i) => (
          <div key={user.rank} className="hover-lift" style={{
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '18px', padding: '14px 16px',
            marginBottom: '8px',
            display: 'flex', alignItems: 'center', gap: '14px',
            animation: `fadeInUp ${0.3 + i * 0.06}s ease-out both`,
          }}>
            {/* Rank */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{
                fontSize: '13px', fontWeight: 800, color: '#5A7A3A',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>{user.rank}</span>
            </div>

            {/* Name */}
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>
                {user.name}
              </span>
            </div>

            {/* Orders count */}
            <div style={{
              background: 'rgba(139,170,61,0.1)', borderRadius: '10px',
              padding: '6px 12px', border: '1px solid rgba(139,170,61,0.12)',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#5A7A3A' }}>
                {user.orders} orders
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/menu')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
          boxShadow: '0 4px 20px rgba(139,170,61,0.35)',
          color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <span>Order now to climb the ranks</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  )
}
