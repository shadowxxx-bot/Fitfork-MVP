import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'

/* ── Milestone definitions ── */
const milestones = [
  { orders: 5, title: 'First milestone!', sub: 'You just unlocked your first reward', discount: '-3% unlocked', discountSub: 'On your next order', discountDetail: 'Automatically applied at checkout', journeyLabel: '-3% on next order' },
  { orders: 10, title: 'Streak Building!', sub: 'Your discount keeps growing', discount: '-5% cumulative', discountSub: 'Applied on every order', discountDetail: 'Stacks with previous rewards', journeyLabel: '-5% cumulative' },
  { orders: 20, title: 'On a roll!', sub: 'Half way to Bronze — keep going', discount: '-8% cumulative', discountSub: 'Applied on every order', discountDetail: '30 more orders to Bronze badge', journeyLabel: '-8% cumulative' },
  { orders: 50, title: 'Bronze unlocked!', sub: '-12% on every order + free dish', isMax: true, isBronze: true, journeyLabel: '-12% + free dish' },
]

/* ── Demo states ── */
const demoStates = [
  { orders: 4, discount: '3', nextMi: 0 },
  { orders: 5, discount: '3', nextMi: 1, justUnlocked: 0 },
  { orders: 7, discount: '5', nextMi: 1 },
  { orders: 10, discount: '5', nextMi: 2, justUnlocked: 1 },
  { orders: 14, discount: '5', nextMi: 2 },
  { orders: 20, discount: '8', nextMi: 3, justUnlocked: 2 },
  { orders: 29, discount: '8', nextMi: 3 },
  { orders: 50, discount: '12', nextMi: 3, justUnlocked: 3 },
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
  const prevSi = useRef(0)

  // Auth guard
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', paddingBottom: '80px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#E8EDDA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8BAA3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 8px', textAlign: 'center' }}>Sign in to earn rewards</h2>
        <p style={{ fontSize: '13px', color: '#8A8F84', margin: '0 0 24px', textAlign: 'center' }}>Build your streak, unlock discounts and free dishes</p>
        <button onClick={() => navigate('/login')} style={{
          padding: '14px 40px', borderRadius: '999px', border: 'none',
          backgroundColor: '#8BAA3D', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Sign in or create account</button>
      </div>
    )
  }

  const state = demoStates[si]
  const currentMilestoneIdx = milestones.reduce((acc, m, i) => state.orders >= m.orders ? i : acc, -1)
  const currentMs = currentMilestoneIdx >= 0 ? milestones[currentMilestoneIdx] : null
  const nextMs = milestones[state.nextMi]
  const ordersToNext = nextMs ? Math.max(0, nextMs.orders - state.orders) : 0
  const topMilestone = milestones[milestones.length - 1]

  // Handle state change with animation
  const changeState = (newSi) => {
    const newState = demoStates[newSi]
    // Check if new state has a milestone unlock
    if (newState.justUnlocked !== undefined && newSi > si) {
      setAnimating(true)
      setShowQR(false)
      setTimeout(() => {
        setSi(newSi)
        setAnimating(false)
        setMilestonePopup(milestones[newState.justUnlocked])
      }, 400)
    } else {
      setAnimating(true)
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

  /* ── Journey timeline ── */
  const Journey = () => {
    const reversed = [...milestones].reverse()
    return (
      <div style={{ padding: '20px 24px 0' }}>
        <p style={{ fontSize: '15px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 16px', fontFamily: "'Space Grotesk', sans-serif" }}>Your journey</p>
        <div style={{
          backgroundColor: 'white', borderRadius: '20px', padding: '24px 20px 18px',
          border: '1.5px solid #E8EDDA',
        }}>
          {reversed.map((m, ri) => {
            const origIdx = milestones.length - 1 - ri
            const done = state.orders >= m.orders
            const isCurrent = origIdx === currentMilestoneIdx
            const isLast = ri === reversed.length - 1
            const nextBelow = ri < reversed.length - 1 ? reversed[ri + 1] : null
            const belowDone = nextBelow ? state.orders >= nextBelow.orders : false
            const circleSize = isCurrent ? 48 : m.isBronze ? 52 : 38

            return (
              <div key={m.orders} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '52px', flexShrink: 0 }}>
                  <div style={{
                    width: `${circleSize}px`, height: `${circleSize}px`, borderRadius: '50%',
                    backgroundColor: done ? '#8BAA3D' : m.isBronze ? 'transparent' : '#F4F3EC',
                    border: m.isBronze && !done ? '2.5px dashed #8BAA3D' : done ? '3px solid #6B9F2D' : '2px solid #D4D1C8',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, zIndex: 2,
                    boxShadow: isCurrent ? '0 3px 12px rgba(139,170,61,0.35)' : 'none',
                    transition: 'all 0.5s ease',
                  }}>
                    {m.isBronze && !done ? (
                      <>
                        <span style={{ fontSize: '8px', fontWeight: 800, color: '#8BAA3D', textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: 1 }}>BRONZE</span>
                        <span style={{ fontSize: '9px', color: '#8A8F84', marginTop: '1px' }}>{m.orders} orders</span>
                      </>
                    ) : (
                      <span style={{ fontSize: isCurrent ? '18px' : '15px', fontWeight: 700, color: done ? 'white' : '#8A8F84', lineHeight: 1 }}>{m.orders}</span>
                    )}
                  </div>
                  {!isLast && (
                    <div style={{
                      width: '3px', flex: 1, minHeight: '28px',
                      backgroundColor: belowDone && done ? '#8BAA3D' : belowDone ? '#8BAA3D' : '#E8EDDA',
                      transition: 'background-color 0.5s',
                    }} />
                  )}
                </div>
                <div style={{ paddingBottom: isLast ? 0 : '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `${circleSize}px` }}>
                  {m.isBronze && !done ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px' }}>🏆</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1B3C2A' }}>Badge unlocked</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#5A7A5A', display: 'block', marginTop: '2px' }}>{m.journeyLabel}</span>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: done ? '#1B3C2A' : '#8A8F84', fontWeight: 500 }}>{m.orders} orders</span>
                        {isCurrent && (
                          <span style={{ fontSize: '10px', fontWeight: 600, color: '#8BAA3D', backgroundColor: '#F0F5E6', borderRadius: '999px', padding: '2px 10px', border: '1px solid #D4E8B0' }}>You are here</span>
                        )}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: done ? '#1B3C2A' : '#8A8F84', display: 'block', marginTop: '2px' }}>{m.journeyLabel}</span>
                      {isCurrent && done && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#F0F5E6', borderRadius: '8px', padding: '3px 10px', marginTop: '6px', border: '1px solid #D4E8B0' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8BAA3D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#5A7A3A' }}>Unlocked</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #E8EDDA' }}>
            <span style={{ fontSize: '11px', color: '#8A8F84', fontWeight: 500 }}>{state.orders} / {topMilestone.orders} to Bronze</span>
            <span style={{ fontSize: '11px', color: '#8A8F84', fontWeight: 500 }}>{Math.max(0, topMilestone.orders - state.orders)} left</span>
          </div>
        </div>
      </div>
    )
  }

  /* ── Demo nav ── */
  const DemoNav = () => (
    <div style={{ padding: '16px 24px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
      <button onClick={prev} disabled={si === 0 || animating} style={{
        width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #E8EDDA',
        backgroundColor: si === 0 ? '#F0EFE8' : 'white', cursor: si === 0 ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: si === 0 ? 0.4 : 1,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <span style={{ fontSize: '11px', color: '#8A8F84', fontWeight: 500, minWidth: '80px', textAlign: 'center' }}>
        State {si + 1} / {demoStates.length}
      </span>
      <button onClick={next} disabled={si === demoStates.length - 1 || animating} style={{
        width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #E8EDDA',
        backgroundColor: si === demoStates.length - 1 ? '#F0EFE8' : 'white',
        cursor: si === demoStates.length - 1 ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: si === demoStates.length - 1 ? 0.4 : 1,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
      </button>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      {/* Animations */}
      <style>{`
        @keyframes rewardFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rewardFadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); } }
        @keyframes milestoneSlideUp { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes milestonePulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
        @keyframes celebrateBadge { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes confettiDrop { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(60px) rotate(360deg); opacity: 0; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes qrSlideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes qrSlideDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(40px); } }
      `}</style>

      {/* ══════ MILESTONE CELEBRATION POPUP ══════ */}
      {milestonePopup && (
        <div style={{
          position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '393px', height: '100vh',
          backgroundColor: 'rgba(26,43,26,0.92)', zIndex: 100,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          animation: 'rewardFadeIn 0.4s ease-out',
        }}>
          {/* Confetti particles */}
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${10 + Math.random() * 30}%`,
              left: `${10 + Math.random() * 80}%`,
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              backgroundColor: ['#8BAA3D', '#D4E8B0', '#FFD700', '#FFA500', '#6B9F2D', '#E8EDDA'][i % 6],
              animation: `confettiDrop ${1.2 + Math.random() * 1}s ease-out ${Math.random() * 0.5}s forwards`,
              opacity: 0.8,
            }} />
          ))}

          {/* Badge */}
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            backgroundColor: '#8BAA3D', border: '4px solid #6B9F2D',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            animation: 'celebrateBadge 0.6s ease-out 0.2s both',
            boxShadow: '0 8px 32px rgba(139,170,61,0.5)',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '30px', fontWeight: 700, color: 'white', lineHeight: 1 }}>{milestonePopup.orders}</span>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>orders</span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '26px', fontWeight: 700,
            color: 'white', margin: '0 0 8px', textAlign: 'center',
            animation: 'milestoneSlideUp 0.5s ease-out 0.3s both',
          }}>{milestonePopup.title}</h2>
          <p style={{
            fontSize: '14px', color: '#A8C07A', margin: '0 0 28px', textAlign: 'center',
            animation: 'milestoneSlideUp 0.5s ease-out 0.4s both',
          }}>{milestonePopup.sub}</p>

          {/* Discount card */}
          <div style={{
            animation: 'milestoneSlideUp 0.5s ease-out 0.5s both',
            width: '80%', maxWidth: '300px',
          }}>
            {milestonePopup.isMax ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { label: '-12%', sub: 'Every order', emoji: '🏷️' },
                  { label: 'Free dish', sub: 'Every 10 orders', emoji: '🍽️' },
                ].map((c) => (
                  <div key={c.label} style={{
                    flex: 1, backgroundColor: '#2D4A1E', borderRadius: '16px',
                    padding: '16px 12px', textAlign: 'center',
                  }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#1A2B1A', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '14px' }}>{c.emoji}</span>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'white', display: 'block' }}>{c.label}</span>
                    <span style={{ fontSize: '10px', color: '#7A8C6E' }}>{c.sub}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                backgroundColor: '#2D4A1E', borderRadius: '16px', padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: '14px',
              }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#1A2B1A', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px' }}>🏷️</span>
                </div>
                <div>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'white', display: 'block' }}>{milestonePopup.discount}</span>
                  <span style={{ fontSize: '12px', color: '#8DC63F', display: 'block', marginTop: '2px' }}>{milestonePopup.discountSub}</span>
                </div>
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button onClick={() => setMilestonePopup(null)} style={{
            marginTop: '32px', padding: '14px 48px', borderRadius: '999px', border: 'none',
            backgroundColor: '#8BAA3D', color: 'white', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            animation: 'milestoneSlideUp 0.5s ease-out 0.6s both',
          }}>Continue</button>
        </div>
      )}

      {/* ══════ MAIN CONTENT ══════ */}
      <div style={{
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', color: '#5A7A5A' }}>Welcome back</span>
                <span style={{ fontSize: '14px' }}>🍃</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Your Rewards</h1>
            </div>
          </div>

          {/* Stat chips */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '14px', padding: '10px 14px', border: '1.5px solid #E8EDDA', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#1B3C2A' }}>{state.orders}</span>
              <span style={{ fontSize: '14px' }}>🔥</span>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '14px', padding: '10px 14px', border: '1.5px solid #E8EDDA', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#8BAA3D' }}>-{state.discount}%</span>
            </div>
            <div style={{ backgroundColor: '#E8EDDA', borderRadius: '14px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8BAA3D' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#5A7A3A' }}>active</span>
            </div>
          </div>
        </div>

        {/* Current reward / Next reward card */}
        <div style={{ padding: '0 24px' }}>
          {currentMs ? (
            <div style={{
              backgroundColor: '#1A2B1A', borderRadius: '20px', padding: '20px',
              display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(139,170,61,0.15) 0%, transparent 70%)' }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                backgroundColor: '#8BAA3D', border: '2px solid #6B9F2D', flexShrink: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'white', lineHeight: 1 }}>{currentMs.orders}</span>
                <span style={{ fontSize: '7px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>orders</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'white', display: 'block' }}>{currentMs.journeyLabel}</span>
                <span style={{ fontSize: '12px', color: '#7A8C6E', display: 'block', marginTop: '2px' }}>
                  {ordersToNext > 0 ? `${ordersToNext} more to next reward` : 'Max level reached!'}
                </span>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #8BAA3D, #6B9F2D)',
                backgroundSize: '200% 200%', animation: 'shimmer 3s linear infinite',
                borderRadius: '10px', padding: '8px 12px',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>-{state.discount}%</span>
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#1A2B1A', borderRadius: '20px', padding: '20px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '14px', color: '#7A8C6E' }}>
                {ordersToNext} more order{ordersToNext !== 1 ? 's' : ''} to your first reward!
              </span>
            </div>
          )}
        </div>

        {/* Journey timeline */}
        <Journey />

        {/* Scan QR CTA */}
        <div style={{ padding: '24px 24px 0' }}>
          <button onClick={() => setShowQR(true)} style={{
            width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
            backgroundColor: '#1B3C2A', color: 'white', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            Scan my QR code
          </button>
        </div>

        <DemoNav />
      </div>

      {/* ══════ QR CODE OVERLAY ══════ */}
      {showQR && (
        <div style={{
          position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '393px', height: '100vh',
          backgroundColor: '#F4F3EC', zIndex: 90,
          display: 'flex', flexDirection: 'column',
          animation: 'qrSlideUp 0.35s ease-out',
        }}>
          {/* Close button */}
          <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setShowQR(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Scan & Earn</h2>
            <div style={{ width: '24px' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
            {/* QR card */}
            <div style={{
              backgroundColor: '#1A2B1A', borderRadius: '24px', padding: '28px 28px 24px',
              textAlign: 'center', width: '100%', maxWidth: '320px',
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px',
                fontWeight: 600, color: 'white', fontStyle: 'italic', margin: '0 0 4px',
              }}>Show this at the counter</p>
              <p style={{ fontSize: '11px', color: '#7A8C6E', margin: '0 0 20px' }}>Scan once per order to add points</p>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', display: 'inline-block' }}>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${QR}, 1fr)`, gap: '1px', width: '200px', height: '200px' }}>
                  {qrData.map((v, i) => (
                    <div key={i} style={{ backgroundColor: v ? '#1A2B1A' : 'white', borderRadius: '1px' }} />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '10px', color: '#5A6B4E', margin: '14px 0 0', letterSpacing: '0.5px' }}>
                FT-001-ABCD · FitFork Loyalty
              </p>
            </div>

            {/* How it works */}
            <div style={{ width: '100%', marginTop: '28px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#8A8F84', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>How it works</p>
              {[
                { step: '1', title: 'Order your meal', sub: 'In-app or in-store' },
                { step: '2', title: 'Show your QR code', sub: 'At the counter when you pick up' },
                { step: '3', title: 'Points added instantly', sub: 'Watch your streak grow' },
              ].map((s) => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#E8EDDA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 700, color: '#5A7A3A', flexShrink: 0,
                  }}>{s.step}</div>
                  <div>
                    <span style={{ fontSize: '13px', color: '#1B3C2A', fontWeight: 600, display: 'block' }}>{s.title}</span>
                    <span style={{ fontSize: '11px', color: '#8A8F84' }}>{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Close bar */}
          <div style={{ padding: '20px 24px 40px' }}>
            <button onClick={() => setShowQR(false)} style={{
              width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
              backgroundColor: '#8BAA3D', color: 'white', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            }}>Back to rewards</button>
          </div>
        </div>
      )}
    </div>
  )
}
