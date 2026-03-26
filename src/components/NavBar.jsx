import { useLocation, useNavigate } from 'react-router-dom'

const hiddenPaths = [
  '/checkout', '/order-confirm', '/order-tracking', '/login', '/login-2',
  '/profile/preferences', '/profile/help', '/onboarding',
  '/custom/protein', '/custom/carbs', '/custom/veg', '/custom/extras', '/custom/recap',
  '/basket', '/delivery', '/rewards/register', '/profile/edit',
]

const tabs = [
  {
    path: '/', label: 'Home',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#8A8F84'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: '/menu', label: 'Menu',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? '#1B3C2A' : '#8A8F84'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" fill={a ? '#1B3C2A' : 'none'} />
        <rect x="14" y="3" width="7" height="7" rx="1" fill={a ? '#1B3C2A' : 'none'} />
        <rect x="3" y="14" width="7" height="7" rx="1" fill={a ? '#1B3C2A' : 'none'} />
        <rect x="14" y="14" width="7" height="7" rx="1" fill={a ? '#1B3C2A' : 'none'} />
      </svg>
    ),
  },
  {
    path: '/maps', label: 'Maps',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#8A8F84'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" fill={a ? 'white' : 'none'} />
      </svg>
    ),
  },
  {
    path: '/rewards', label: 'Rewards',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#8A8F84'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    path: '/profile', label: 'Profile',
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? '#1B3C2A' : 'none'} stroke={a ? '#1B3C2A' : '#8A8F84'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
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
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: '393px',
      backgroundColor: '#F4F3EC', borderTop: '1px solid #E8EDDA',
      zIndex: 50, paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '60px' }}>
        {tabs.map((tab) => {
          const active = pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 12px',
              }}
            >
              {tab.icon(active)}
              <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '10px',
                fontWeight: active ? 600 : 400,
                color: active ? '#1B3C2A' : '#8A8F84',
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
