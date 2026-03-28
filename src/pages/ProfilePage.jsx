import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

const activityFactors = {
  'Sedentary': 1.2, 'Lightly active': 1.375, 'Moderately active': 1.55,
  'Very active': 1.725, 'Athlete': 1.9,
}
const goalOffsets = { 'Lose weight': -300, 'Build muscle': 300, 'Maintain weight': 0 }

function computeNutrition(p) {
  const w = parseFloat(p.weight) || 70
  const h = parseFloat(p.height) || 170
  const a = parseInt(p.age) || 25
  const isMale = p.gender !== 'Female'
  const bmr = isMale ? (10 * w + 6.25 * h - 5 * a + 5) : (10 * w + 6.25 * h - 5 * a - 161)
  const factor = activityFactors[p.activity] || 1.2
  const offset = goalOffsets[p.goal] || 0
  const tdee = Math.round(bmr * factor + offset)
  const protein = Math.round(w * (p.goal === 'Build muscle' ? 2.2 : 1.6))
  const fats = Math.round(tdee * 0.25 / 9)
  const carbs = Math.round((tdee - protein * 4 - fats * 9) / 4)
  return { calories: Math.max(tdee, 1200), protein, carbs: Math.max(carbs, 50), fats }
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, profile, updateProfile, logout, isLoggedIn } = useStore()
  const [openDropdown, setOpenDropdown] = useState(null)

  if (!isLoggedIn) {
    return (
      <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', paddingBottom: '80px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8BAA3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 8px', textAlign: 'center' }}>Sign in to view your profile</h2>
        <p style={{ fontSize: '13px', color: '#8A8F84', margin: '0 0 24px', textAlign: 'center' }}>Track your nutrition, manage preferences and more</p>
        <button onClick={() => navigate('/login')} style={{
          padding: '14px 40px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Sign in or create account</button>
      </div>
    )
  }

  const handleLogout = () => { logout(); navigate('/login') }

  // Auto-compute nutrition from profile data
  const computed = computeNutrition(profile)

  // When goal or activity changes, recalculate and save
  const handleDropdownChange = (key, value) => {
    const updated = { ...profile, [key]: value }
    const n = computeNutrition(updated)
    updateProfile({ [key]: value, calories: String(n.calories), protein: String(n.protein), carbs: String(n.carbs), fats: String(n.fats) })
    setOpenDropdown(null)
  }

  const rowStyle = (last) => ({
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '14px 0', borderBottom: last ? 'none' : '1px solid rgba(139,170,61,0.1)', cursor: 'pointer',
  })

  const iconCircle = (children) => (
    <div style={{
      width: '40px', height: '40px', borderRadius: '14px', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>{children}</div>
  )

  const chevron = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0ADA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
  )

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top section */}
      <div style={{ padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button onClick={() => navigate('/profile/edit')} style={{
            background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)', boxShadow: '0 2px 8px rgba(27,60,42,0.2)', color: 'white', border: 'none',
            borderRadius: '14px', padding: '10px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>Edit</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(139,170,61,0.12) 0%, rgba(139,170,61,0.06) 100%)', border: '2px solid rgba(139,170,61,0.3)' }} />
            <div style={{
              position: 'absolute', bottom: '0', right: '0',
              width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <span style={{ fontSize: '13px', color: '#8BAA3D', marginTop: '8px', fontWeight: 500 }}>Change photo</span>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div style={{ padding: '0 24px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '16px 18px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#B0ADA4', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Personal information</p>

          {[
            {
              label: 'Full Name', value: user.name || 'Not set', field: 'name',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
            },
            {
              label: 'Gender', value: profile.gender || 'Not set', field: 'gender',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 00-16 0" /></svg>,
            },
            {
              label: 'Age', value: profile.age ? `${profile.age} years` : 'Not set', field: 'age',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
            },
            {
              label: 'Weight', value: profile.weight ? `${profile.weight} kg` : 'Not set', field: 'weight',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" /><path d="M2 20h20l-2-8H4l-2 8z" /></svg>,
            },
            {
              label: 'Height', value: profile.height ? `${profile.height} cm` : 'Not set', field: 'height', last: true,
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22" /><polyline points="8 6 12 2 16 6" /><polyline points="8 18 12 22 16 18" /></svg>,
            },
          ].map((item) => (
            <div key={item.label} onClick={() => navigate(`/profile/edit?field=${item.field}`)} style={rowStyle(item.last)}>
              {iconCircle(item.icon)}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{item.label}</span>
                <span style={{ fontSize: '12px', color: '#7A8A6A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{item.value}</span>
              </div>
              {chevron}
            </div>
          ))}
        </div>
      </div>

      {/* NUTRITION GOALS */}
      <div style={{ padding: '0 24px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '16px 18px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#B0ADA4', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>Nutrition goals per meal</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            {[
              { label: 'Calories', value: Math.round(computed.calories / 3), unit: 'kcal' },
              { label: 'Protein', value: Math.round(computed.protein / 3), unit: 'g' },
              { label: 'Carbs', value: Math.round(computed.carbs / 3), unit: 'g' },
              { label: 'Fats', value: Math.round(computed.fats / 3), unit: 'g' },
            ].map((n, i) => (
              <div key={n.label} style={{ background: 'rgba(139,170,61,0.06)', border: '1px solid rgba(139,170,61,0.1)', borderRadius: '16px', padding: '12px 14px' }}>
                <span style={{ fontSize: '11px', color: '#8A8F84', display: 'block', marginBottom: '4px' }}>{n.label}</span>
                {i === 0 ? (
                  <span style={{ fontSize: '14px', fontWeight: 600, background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n.value} {n.unit}</span>
                ) : (
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#5A7A5A' }}>{n.value} {n.unit}</span>
                )}
              </div>
            ))}
          </div>

          <div style={{ fontSize: '10px', color: '#B0ADA4', textAlign: 'center', marginBottom: '8px' }}>
            Auto-calculated from your profile (3 meals/day)
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(139,170,61,0.1)', margin: '4px 0' }} />

          {/* Goal & Activity dropdowns */}
          {[
            {
              key: 'goal', label: 'Goal', value: profile.goal,
              options: ['Lose weight', 'Build muscle', 'Maintain weight'],
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
            },
            {
              key: 'activity', label: 'Activity Level', value: profile.activity,
              options: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Athlete'],
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
            },
          ].map((dd, di) => {
            const isOpen = openDropdown === dd.key
            return (
              <div key={dd.key}>
                <div onClick={() => setOpenDropdown(isOpen ? null : dd.key)} style={{
                  ...rowStyle(di === 1 && !isOpen), cursor: 'pointer',
                }}>
                  {iconCircle(dd.icon)}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{dd.label}</span>
                    <span style={{ fontSize: '12px', color: '#5A7A5A' }}>{dd.value}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0ADA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                {isOpen && (
                  <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1.5px solid rgba(139,170,61,0.4)', overflow: 'hidden', marginBottom: '8px' }}>
                    {dd.options.map((opt) => {
                      const selected = dd.value === opt
                      return (
                        <div key={opt} onClick={() => handleDropdownChange(dd.key, opt)} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid rgba(139,170,61,0.1)',
                          backgroundColor: selected ? 'rgba(139,170,61,0.08)' : 'white',
                        }}>
                          <span style={{ fontSize: '14px', fontWeight: selected ? 600 : 400, color: selected ? '#1B3C2A' : '#5A7A5A' }}>{opt}</span>
                          {selected && (
                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* SETTINGS */}
      <div style={{ padding: '0 24px', marginBottom: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px', padding: '16px 18px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#B0ADA4', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Settings</p>
          {[
            {
              label: 'Preferences', sub: null, route: '/profile/preferences',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
            },
            {
              label: 'My Rewards', sub: null, route: '/rewards',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
            },
            {
              label: 'Help & Support', sub: null, last: true, route: '/profile/help',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
            },
          ].map((item) => (
            <div key={item.label} onClick={() => navigate(item.route)} style={rowStyle(item.last)}>
              {iconCircle(item.icon)}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{item.label}</span>
                {item.sub && <span style={{ fontSize: '12px', color: '#7A8A6A' }}>{item.sub}</span>}
              </div>
              {chevron}
            </div>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div style={{ padding: '0 24px' }}>
        <button onClick={handleLogout} style={{
          width: '100%', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)', borderRadius: '20px',
          padding: '16px 18px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: 'rgba(192,64,64,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C04040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#C04040' }}>Sign out</span>
        </button>
      </div>
    </div>
  )
}
