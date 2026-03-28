import { useLocation, useNavigate } from 'react-router-dom'

const hiddenPaths = [
  '/checkout', '/order-confirm', '/order-tracking', '/login', '/login-2',
  '/profile/preferences', '/profile/help', '/onboarding',
  '/custom/protein', '/custom/carbs', '/custom/veg', '/custom/extras', '/custom/recap',
  '/basket', '/drinks', '/delivery', '/rewards/register', '/profile/edit',
]

const tabs = [
  {
    path: '/', label: 'Home',
    icon: (a) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#9A9E94'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: '/menu', label: 'Menu',
    icon: (a) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a ? '#1B3C2A' : '#9A9E94'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill={a ? '#1B3C2A' : 'none'} />
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill={a ? '#1B3C2A' : 'none'} />
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill={a ? '#1B3C2A' : 'none'} />
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill={a ? '#1B3C2A' : 'none'} />
      </svg>
    ),
  },
  {
    path: '/leaderboard', label: 'Ranking',
    icon: (a) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#9A9E94'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 1012 0V2Z" />
      </svg>
    ),
  },
  {
    path: '/rewards', label: 'Rewards',
    icon: (a) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#9A9E94'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    path: '/profile', label: 'Profile',
    icon: (a) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#9A9E94'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function NavBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (hiddenPaths.some((p) => pathname.startsWith(p))) return null

  return (
    <nav style={{
      position: 'fixed', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)', maxWidth: '361px',
      background: 'rgba(255, 255, 255, 0.78)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      borderRadius: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      zIndex: 50, paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '58px' }}>
        {tabs.map((tab) => {
          const active = pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 12px',
                position: 'relative',
              }}
            >
              <div style={{
                padding: '6px',
                borderRadius: '14px',
                backgroundColor: active ? 'rgba(139, 170, 61, 0.12)' : 'transparent',
                transition: 'background-color 0.2s ease',
              }}>
                {tab.icon(active)}
              </div>
              <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '9px',
                fontWeight: active ? 700 : 500,
                color: active ? '#1B3C2A' : '#9A9E94',
                letterSpacing: '0.3px',
                transition: 'color 0.2s ease',
              }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
