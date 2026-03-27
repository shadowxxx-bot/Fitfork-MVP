import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

/* ── Milestone definitions ── */
const milestones = [
  { orders: 5, title: 'First Bite!', sub: 'You just unlocked your first reward', discount: 3, emoji: '🌱', label: '-3% on next order', tier: 'Starter' },
  { orders: 10, title: 'Getting Hooked!', sub: 'Your discount keeps growing', discount: 5, emoji: '🌿', label: '-5% cumulative', tier: 'Regular' },
  { orders: 20, title: 'On Fire!', sub: 'Half way to Bronze — keep going', discount: 8, emoji: '🔥', label: '-8% cumulative', tier: 'Fan' },
  { orders: 50, title: 'Bronze Legend!', sub: '-12% on every order + free dish', discount: 12, emoji: '🏆', label: '-12% + free dish', tier: 'Bronze', isMax: true },
]

/* ── Demo states ── */
const demoStates = [
  { orders: 4, discount: 3, nextMi: 0 },
  { orders: 5, discount: 3, nextMi: 1, justUnlocked: 0 },
  { orders: 7, discount: 5, nextMi: 1 },
  { orders: 10, discount: 5, nextMi: 2, justUnlocked: 1 },
  { orders: 14, discount: 5, nextMi: 2 },
  { orders: 20, discount: 8, nextMi: 3, justUnlocked: 2 },
  { orders: 29, discount: 8, nextMi: 3 },
  { orders: 50, discount: 12, nextMi: 3, justUnlocked: 3 },
]

/* ── QR grid ── */
const QR = 21
const qrData = (() => {
  const g = Array(QR * QR).fill(0)
  const finder = (ox, oy) => {
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 7; x++) {
        const border = x === 0 || x === 6 || y === 0 || y === 6
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4
        if (border || inner) g[(oy + y) * QR + (ox + x)] = 1
      }
  }
  finder(0, 0); finder(14, 0); finder(0, 14)
  let s = 42
  for (let i = 0; i < g.length; i++) {
    const x = i % QR, y = Math.floor(i / QR)
    const near = (x < 8 && y < 8) || (x >= 13 && y < 8) || (x < 8 && y >= 13)
    if (!near && g[i] === 0) { s = (s * 1103515245 + 12345) & 0x7fffffff; g[i] = s % 3 !== 0 ? 1 : 0 }
  }
  return g
})()

export default function RewardsPage() {
  const navigate = useNavigate()
  const isLoggedIn = useStore((s) => s.isLoggedIn)
  const [si, setSi] = useState(0)
  const [showQR, setShowQR] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [milestonePopup, setMilestonePopup] = useState(null)
  const [progressAnim, setProgressAnim] = useState(0)
  const prevSi = useRef(0)

  const state = demoStates[si]
  const currentMilestoneIdx = milestones.reduce((acc, m, i) => state.orders >= m.orders ? i : acc, -1)
  const nextMs = milestones[state.nextMi]
  const prevMs = state.nextMi > 0 ? milestones[state.nextMi - 1] : { orders: 0 }
  const ordersToNext = nextMs ? Math.max(0, nextMs.orders - state.orders) : 0
  const progressInSegment = nextMs ? (state.orders - prevMs.orders) / (nextMs.orders - prevMs.orders) : 1

  useEffect(() => {
    const timer = setTimeout(() => setProgressAnim(progressInSegment), 300)
    return () => clearTimeout(timer)
  }, [progressInSegment])

  if (!isLoggedIn) {
    return (
      <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', paddingBottom: '80px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8BAA3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 8px', textAlign: 'center' }}>Sign in to earn rewards</h2>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 24px', textAlign: 'center' }}>Build your streak, unlock discounts and free dishes</p>
        <button onClick={() => navigate('/login')} style={{
          padding: '14px 40px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Sign in or create account</button>
      </div>
    )
  }

  const changeState = (newSi) => {
    const newState = demoStates[newSi]
    if (newState.justUnlocked !== undefined && newSi > si) {
      setAnimating(true)
      setShowQR(false)
      setTimeout(() => {
        setSi(newSi)
        setProgressAnim(0)
        setAnimating(false)
        setMilestonePopup(milestones[newState.justUnlocked])
      }, 400)
    } else {
      setAnimating(true)
      setProgressAnim(0)
      setTimeout(() => {
        setSi(newSi)
        setAnimating(false)
        setMilestonePopup(null)
      }, 300)
    }
    prevSi.current = si
  }

  const prev = () => { if (si > 0) changeState(si - 1) }
  const next = () => { if (si < demoStates.length - 1) changeState(si + 1) }

  const ringRadius = 72
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference * (1 - progressAnim)

  const achievements = [
    { emoji: '🌱', title: 'First Order', sub: 'Place your first order', done: state.orders >= 1 },
    { emoji: '🔥', title: '5-Streak', sub: 'Order 5 times', done: state.orders >= 5, reward: '-3%' },
    { emoji: '⚡', title: '10-Streak', sub: 'Order 10 times', done: state.orders >= 10, reward: '-5%' },
    { emoji: '💎', title: '20-Streak', sub: 'Order 20 times', done: state.orders >= 20, reward: '-8%' },
    { emoji: '🏆', title: 'Bronze Legend', sub: 'Reach 50 orders', done: state.orders >= 50, reward: '-12% + free dish' },
    { emoji: '🥗', title: 'Bowl Master', sub: 'Try 3 different bowls', done: state.orders >= 7 },
  ]
  const achievedCount = achievements.filter(a => a.done).length

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>
      <style>{`
        @keyframes rewardFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes milestoneSlideUp { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes celebrateBadge { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes confettiDrop { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(80px) rotate(720deg); opacity: 0; } }
        @keyframes qrSlideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ringPulse { 0%,100% { filter: drop-shadow(0 0 6px rgba(139,170,61,0.3)); } 50% { filter: drop-shadow(0 0 16px rgba(139,170,61,0.6)); } }
        @keyframes shineSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>

      {/* ══════ MILESTONE CELEBRATION POPUP ══════ */}
      {milestonePopup && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1A2B1A, #0D2418)' }} />
          {/* Confetti */}
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: `${5 + Math.random() * 40}%`, left: `${5 + Math.random() * 90}%`,
              width: `${6 + Math.random() * 10}px`, height: `${6 + Math.random() * 10}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              backgroundColor: ['#8BAA3D', '#D4E8B0', '#FFD700', '#FF6B6B', '#6B9F2D', '#E8EDDA', '#FFA500', '#FF4ECD'][i % 8],
              animation: `confettiDrop ${1.5 + Math.random() * 1.5}s ease-out ${Math.random() * 0.8}s forwards`,
              zIndex: 1,
            }} />
          ))}
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px', width: '100%', maxWidth: '393px', animation: 'rewardFadeIn 0.4s ease-out' }}>
            <div style={{ fontSize: '60px', animation: 'celebrateBadge 0.6s ease-out 0.2s both', marginBottom: '8px' }}>{milestonePopup.emoji}</div>
            <div style={{ background: 'linear-gradient(135deg, #8BAA3D, #6B9F2D)', borderRadius: '999px', padding: '6px 20px', marginBottom: '16px', animation: 'milestoneSlideUp 0.5s ease-out 0.3s both' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Level Up!</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700, color: 'white', margin: '0 0 8px', textAlign: 'center', animation: 'milestoneSlideUp 0.5s ease-out 0.35s both' }}>{milestonePopup.title}</h2>
            <p style={{ fontSize: '14px', color: '#A8C07A', margin: '0 0 32px', textAlign: 'center', padding: '0 20px', animation: 'milestoneSlideUp 0.5s ease-out 0.4s both' }}>{milestonePopup.sub}</p>
            <div style={{ animation: 'milestoneSlideUp 0.5s ease-out 0.5s both', width: '85%', maxWidth: '300px', display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1, background: 'rgba(139,170,61,0.15)', border: '1px solid rgba(139,170,61,0.25)', borderRadius: '20px', padding: '20px 14px', textAlign: 'center' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🏷️</span>
                <span style={{ fontSize: '22px', fontWeight: 800, color: 'white', display: 'block' }}>-{milestonePopup.discount}%</span>
                <span style={{ fontSize: '11px', color: '#A8C07A', marginTop: '4px', display: 'block' }}>Every order</span>
              </div>
              {milestonePopup.isMax && (
                <div style={{ flex: 1, background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '20px', padding: '20px 14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🍽️</span>
                  <span style={{ fontSize: '17px', fontWeight: 800, color: 'white', display: 'block' }}>Free dish</span>
                  <span style={{ fontSize: '11px', color: '#D4C07A', marginTop: '4px', display: 'block' }}>Every 10 orders</span>
                </div>
              )}
            </div>
            <button onClick={() => setMilestonePopup(null)} style={{ marginTop: '36px', padding: '16px 56px', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif", animation: 'milestoneSlideUp 0.5s ease-out 0.6s both', boxShadow: '0 4px 24px rgba(139,170,61,0.4)' }}>Awesome!</button>
          </div>
        </div>
      )}

      {/* ══════ MAIN CONTENT ══════ */}
      <div style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 0' }}>
          <span style={{ fontSize: '13px', color: '#7A8A6A' }}>Your streak</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700, background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '2px 0 0' }}>Rewards</h1>
        </div>

        {/* ── Big progress ring card ── */}
        <div style={{ padding: '16px 24px 0', animation: 'rewardFadeIn 0.5s ease-out both' }}>
          <div style={{
            background: 'linear-gradient(145deg, #1B3C2A 0%, #0D2418 100%)',
            borderRadius: '28px', padding: '28px 20px 24px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(27,60,42,0.3)',
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(139,170,61,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(139,170,61,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
                <svg width="160" height="160" viewBox="0 0 160 160" style={{ animation: 'ringPulse 3s ease-in-out infinite' }}>
                  <circle cx="80" cy="80" r={ringRadius} fill="none" stroke="rgba(139,170,61,0.15)" strokeWidth="10" />
                  <circle cx="80" cy="80" r={ringRadius} fill="none" stroke="url(#grad)" strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={ringCircumference} strokeDashoffset={ringOffset}
                    transform="rotate(-90 80 80)" style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A0C044" /><stop offset="100%" stopColor="#8BAA3D" /></linearGradient></defs>
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: 'white', lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>{state.orders}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>orders</div>
                  <div style={{ fontSize: '20px', marginTop: '4px' }}>🔥</div>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ background: 'rgba(139,170,61,0.15)', borderRadius: '12px', padding: '8px 12px', display: 'inline-block', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#A0C044', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {currentMilestoneIdx >= 0 ? milestones[currentMilestoneIdx].tier : 'Newbie'}
                  </span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#8BAA3D', lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>-{state.discount}%</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>current discount</div>
                {ordersToNext > 0 && (
                  <div style={{ marginTop: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '10px 12px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, color: '#A0C044' }}>{ordersToNext}</span> to next reward
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(139,170,61,0.15)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, #8BAA3D, #A0C044)', width: `${progressAnim * 100}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    </div>
                  </div>
                )}
                {ordersToNext === 0 && (
                  <div style={{ marginTop: '12px', fontSize: '13px', color: '#FFD700', fontWeight: 700 }}>Max level! 👑</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Daily challenge ── */}
        <div style={{ padding: '16px 24px 0', animation: 'rewardFadeIn 0.55s ease-out both' }}>
          <div onClick={() => navigate('/menu')} style={{
            background: 'linear-gradient(135deg, #E87A1E, #F5A623)', borderRadius: '20px',
            padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(232,122,30,0.25)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shineSlide 3s ease-in-out infinite' }} />
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
              🎯
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', display: 'block' }}>Daily Challenge</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Order today and earn 2x streak points!</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </div>
        </div>

        {/* ── Achievements ── */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#1B3C2A', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>Achievements</p>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8BAA3D' }}>{achievedCount}/{achievements.length}</span>
          </div>

          <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(139,170,61,0.1)', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '4px',
              background: 'linear-gradient(90deg, #8BAA3D, #A0C044, #E87A1E)',
              width: `${(achievedCount / achievements.length) * 100}%`,
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {achievements.map((a, i) => (
              <div key={i} style={{
                background: a.done ? 'linear-gradient(145deg, #1B3C2A, #2D5A3F)' : 'rgba(255,255,255,0.72)',
                backdropFilter: a.done ? 'none' : 'blur(12px)',
                border: a.done ? 'none' : '1px solid rgba(255,255,255,0.5)',
                borderRadius: '18px', padding: '14px',
                position: 'relative', overflow: 'hidden',
                boxShadow: a.done ? '0 4px 16px rgba(27,60,42,0.2)' : '0 2px 8px rgba(0,0,0,0.03)',
                animation: `rewardFadeIn ${0.4 + i * 0.08}s ease-out both`,
                opacity: a.done ? 1 : 0.6,
              }}>
                {a.done && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A0C044" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                )}
                <div style={{ fontSize: '26px', marginBottom: '8px' }}>{a.emoji}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: a.done ? 'white' : '#1B3C2A', marginBottom: '2px' }}>{a.title}</div>
                <div style={{ fontSize: '11px', color: a.done ? 'rgba(255,255,255,0.5)' : '#7A8A6A', marginBottom: a.reward ? '6px' : 0 }}>{a.sub}</div>
                {a.reward && (
                  <div style={{
                    display: 'inline-block', background: a.done ? 'rgba(139,170,61,0.2)' : 'rgba(139,170,61,0.1)',
                    borderRadius: '8px', padding: '3px 8px',
                    fontSize: '10px', fontWeight: 700, color: a.done ? '#A0C044' : '#8BAA3D',
                  }}>
                    {a.reward}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Next unlock teaser ── */}
        {nextMs && ordersToNext > 0 && (
          <div style={{ padding: '16px 24px 0', animation: 'rewardFadeIn 0.7s ease-out both' }}>
            <div onClick={() => navigate('/menu')} style={{
              background: 'rgba(139,170,61,0.08)', border: '1.5px dashed rgba(139,170,61,0.3)',
              borderRadius: '20px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px',
              cursor: 'pointer',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(139,170,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                {nextMs.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1B3C2A', display: 'block' }}>Next: {nextMs.label}</span>
                <span style={{ fontSize: '11px', color: '#7A8A6A' }}>{ordersToNext} order{ordersToNext !== 1 ? 's' : ''} away — order to level up!</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8BAA3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
            </div>
          </div>
        )}

        {/* ── CTAs ── */}
        <div style={{ padding: '20px 24px 0', display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/menu')} style={{
            flex: 1, padding: '16px', borderRadius: '999px', border: 'none',
            background: 'linear-gradient(135deg, #8BAA3D, #A0C044)',
            boxShadow: '0 4px 20px rgba(139,170,61,0.35)', color: 'white', fontSize: '14px', fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span>Order now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
          <button onClick={() => setShowQR(true)} style={{
            width: '52px', height: '52px', borderRadius: '18px', border: 'none',
            background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)',
            boxShadow: '0 4px 16px rgba(27,60,42,0.25)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>

        {/* Demo nav */}
        <div style={{ padding: '16px 24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <button onClick={prev} disabled={si === 0 || animating} style={{ width: '36px', height: '36px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.6)', cursor: si === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: si === 0 ? 0.4 : 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <span style={{ fontSize: '11px', color: '#7A8A6A', fontWeight: 500, minWidth: '80px', textAlign: 'center' }}>State {si + 1} / {demoStates.length}</span>
          <button onClick={next} disabled={si === demoStates.length - 1 || animating} style={{ width: '36px', height: '36px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.6)', cursor: si === demoStates.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: si === demoStates.length - 1 ? 0.4 : 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </div>
      </div>

      {/* ══════ QR CODE OVERLAY ══════ */}
      {showQR && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1B3C2A 0%, #0D2418 100%)', animation: 'qrSlideUp 0.35s ease-out' }}>
          {/* Header */}
          <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '393px', width: '100%', margin: '0 auto' }}>
            <button onClick={() => setShowQR(false)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: 'white', margin: 0 }}>Scan & Earn</h2>
            <div style={{ width: '40px' }} />
          </div>

          {/* Content */}
          <div style={{ overflow: 'auto', padding: '24px 24px 40px', maxWidth: '393px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', color: '#A8C07A', margin: '0 0 24px', textAlign: 'center' }}>Show this at the counter to earn points</p>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,170,61,0.2)', borderRadius: '28px', padding: '24px', textAlign: 'center', width: '100%', maxWidth: '300px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', display: 'inline-block', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${QR}, 1fr)`, gap: '1px', width: '200px', height: '200px' }}>
                  {qrData.map((v, i) => (<div key={i} style={{ backgroundColor: v ? '#1B3C2A' : 'white', borderRadius: '1px' }} />))}
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#7A8C6E', margin: '16px 0 0', letterSpacing: '0.5px' }}>FT-001-ABCD</p>
            </div>

            <div style={{ width: '100%', marginTop: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#8BAA3D', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>How it works</p>
              {[
                { emoji: '🛒', title: 'Order your meal', sub: 'In-app or in-store' },
                { emoji: '📱', title: 'Show your QR code', sub: 'At the counter when you pick up' },
                { emoji: '✨', title: 'Points added instantly', sub: 'Watch your streak grow' },
              ].map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: idx < 2 ? '14px' : 0 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(139,170,61,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{s.emoji}</div>
                  <div>
                    <span style={{ fontSize: '13px', color: 'white', fontWeight: 600, display: 'block' }}>{s.title}</span>
                    <span style={{ fontSize: '11px', color: '#7A8C6E' }}>{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setShowQR(false)} style={{ width: '100%', marginTop: '24px', padding: '16px', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 4px 16px rgba(139,170,61,0.3)', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>Back to rewards</button>
          </div>
        </div>
      )}
    </div>
  )
}
