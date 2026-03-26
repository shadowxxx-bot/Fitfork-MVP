import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

export default function EditProfilePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const focusField = searchParams.get('field')
  const nameRef = useRef(null)
  const ageRef = useRef(null)

  const { user, profile, updateUser, updateProfile } = useStore()
  const [form, setForm] = useState({ name: user.name || '' })
  const [pf, setPf] = useState({ ...profile })
  const [openDropdown, setOpenDropdown] = useState(null)
  const [focusedInput, setFocusedInput] = useState(focusField || null)

  const weightNum = parseFloat(pf.weight) || 70
  const heightNum = parseFloat(pf.height) || 170

  useEffect(() => {
    if (!focusField) return
    const refs = { name: nameRef, age: ageRef }
    if (refs[focusField]?.current) {
      setTimeout(() => refs[focusField].current.focus(), 100)
    }
  }, [focusField])

  // Live nutrition calculation
  const computed = computeNutrition(pf)

  const handleSave = () => {
    updateUser({ ...user, name: form.name })
    updateProfile({
      ...pf,
      calories: String(computed.calories), protein: String(computed.protein),
      carbs: String(computed.carbs), fats: String(computed.fats),
    })
    navigate('/profile')
  }

  const fieldStyle = (key) => ({
    width: '100%', backgroundColor: 'white',
    border: focusedInput === key ? '2px solid #8BAA3D' : '1.5px solid #D4D1C8',
    borderRadius: '10px', padding: '14px 40px 14px 16px', fontSize: '14px', color: '#1B3C2A',
    outline: 'none', boxSizing: 'border-box', fontFamily: "'Bricolage Grotesque', sans-serif",
    transition: 'border-color 0.2s ease',
  })

  const labelStyle = {
    display: 'block', fontSize: '12px', color: '#8A8F84', fontWeight: 500,
    marginBottom: '6px', marginTop: '16px',
  }

  const sliderCSS = `
    input[type=range].edit-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; outline: none; }
    input[type=range].edit-slider::-webkit-slider-track { height: 6px; border-radius: 3px; background: #E8EDDA; }
    input[type=range].edit-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #8BAA3D; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: pointer; margin-top: -8px; }
    input[type=range].edit-slider::-moz-range-track { height: 6px; border-radius: 3px; background: #E8EDDA; border: none; }
    input[type=range].edit-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #8BAA3D; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: pointer; }
  `

  const btnStyle = {
    width: '36px', height: '36px', borderRadius: '10px', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700,
  }

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '40px' }}>
      <style>{sliderCSS}</style>

      {/* Top bar */}
      <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#8A8F84', fontWeight: 500, padding: 0 }}>Cancel</button>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Edit Profile</h1>
        <button onClick={handleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#8BAA3D', fontWeight: 600, padding: 0 }}>Save</button>
      </div>

      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0 8px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#E8EDDA', border: '2px solid #8BAA3D' }} />
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1B3C2A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>
        <span style={{ fontSize: '13px', color: '#8BAA3D', marginTop: '8px', fontWeight: 500 }}>Change photo</span>
      </div>

      <div style={{ padding: '0 24px' }}>
        {/* PERSONAL INFORMATION */}
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A8F84', textTransform: 'uppercase', letterSpacing: '1px', margin: '16px 0 0' }}>Personal information</p>

        <label style={labelStyle}>Full Name</label>
        <input ref={nameRef} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          onFocus={() => setFocusedInput('name')} onBlur={() => setFocusedInput(null)}
          placeholder="Enter your name" style={fieldStyle('name')} />

        <label style={labelStyle}>Age</label>
        <input ref={ageRef} type="number" value={pf.age || ''} onChange={(e) => setPf({ ...pf, age: e.target.value })}
          onFocus={() => setFocusedInput('age')} onBlur={() => setFocusedInput(null)}
          placeholder="25" style={fieldStyle('age')} />

        <label style={labelStyle}>Gender</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Male', 'Female', 'Other'].map((g) => {
            const sel = pf.gender === g
            return (
              <button key={g} onClick={() => setPf({ ...pf, gender: g })} style={{
                flex: 1, padding: '12px 0', borderRadius: '12px', cursor: 'pointer',
                border: sel ? '2px solid #8BAA3D' : '1.5px solid #D4D1C8',
                backgroundColor: sel ? '#F0F5E6' : 'white',
                fontSize: '14px', fontWeight: sel ? 600 : 400,
                color: sel ? '#1B3C2A' : '#8A8F84',
                fontFamily: "'Bricolage Grotesque', sans-serif", transition: 'all 0.2s',
              }}>{g}</button>
            )
          })}
        </div>

        {/* BODY METRICS */}
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A8F84', textTransform: 'uppercase', letterSpacing: '1px', margin: '24px 0 0' }}>Body metrics</p>

        {/* Weight slider */}
        <label style={labelStyle}>Weight</label>
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1.5px solid #E8EDDA', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#1B3C2A', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{weightNum}</span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#8A8F84', alignSelf: 'flex-end', paddingBottom: '3px' }}>kg</span>
            <div style={{ display: 'flex', gap: '6px', marginLeft: '6px' }}>
              <button onClick={() => setPf({ ...pf, weight: String(Math.max(20, weightNum - 0.5)) })} style={{ ...btnStyle, backgroundColor: '#E8EDDA', color: '#1B3C2A' }}>−</button>
              <button onClick={() => setPf({ ...pf, weight: String(Math.min(200, weightNum + 0.5)) })} style={{ ...btnStyle, backgroundColor: '#1B3C2A', color: 'white' }}>+</button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: '6px', borderRadius: '3px',
              background: `linear-gradient(to right, #8BAA3D ${((weightNum - 20) / 180) * 100}%, #E8EDDA ${((weightNum - 20) / 180) * 100}%)`,
              transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0,
            }} />
            <input type="range" className="edit-slider" min="20" max="200" step="0.5"
              value={weightNum} onChange={(e) => setPf({ ...pf, weight: e.target.value })}
              style={{ width: '100%', position: 'relative', zIndex: 1, background: 'transparent' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '10px', color: '#8A8F84' }}>20 kg</span>
            <span style={{ fontSize: '10px', color: '#8A8F84' }}>200 kg</span>
          </div>
        </div>

        {/* Height slider */}
        <label style={labelStyle}>Height</label>
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1.5px solid #E8EDDA', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#1B3C2A', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{heightNum}</span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#8A8F84', alignSelf: 'flex-end', paddingBottom: '3px' }}>cm</span>
            <div style={{ display: 'flex', gap: '6px', marginLeft: '6px' }}>
              <button onClick={() => setPf({ ...pf, height: String(Math.max(100, heightNum - 1)) })} style={{ ...btnStyle, backgroundColor: '#E8EDDA', color: '#1B3C2A' }}>−</button>
              <button onClick={() => setPf({ ...pf, height: String(Math.min(230, heightNum + 1)) })} style={{ ...btnStyle, backgroundColor: '#1B3C2A', color: 'white' }}>+</button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: '6px', borderRadius: '3px',
              background: `linear-gradient(to right, #8BAA3D ${((heightNum - 100) / 130) * 100}%, #E8EDDA ${((heightNum - 100) / 130) * 100}%)`,
              transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0,
            }} />
            <input type="range" className="edit-slider" min="100" max="230" step="1"
              value={heightNum} onChange={(e) => setPf({ ...pf, height: e.target.value })}
              style={{ width: '100%', position: 'relative', zIndex: 1, background: 'transparent' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '10px', color: '#8A8F84' }}>100 cm</span>
            <span style={{ fontSize: '10px', color: '#8A8F84' }}>230 cm</span>
          </div>
        </div>

        {/* BMI */}
        {weightNum > 0 && heightNum > 0 && (() => {
          const bmi = (weightNum / Math.pow(heightNum / 100, 2)).toFixed(1)
          const label = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese'
          return (
            <div style={{ backgroundColor: '#E8EDDA', borderRadius: '12px', padding: '12px 16px', marginTop: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', color: '#1B3C2A', fontWeight: 600 }}>BMI: {bmi} — {label}</span>
            </div>
          )
        })()}

        {/* NUTRITION (auto-computed, read-only display) */}
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A8F84', textTransform: 'uppercase', letterSpacing: '1px', margin: '24px 0 0' }}>Nutrition goals per day</p>
        <p style={{ fontSize: '10px', color: '#B0ADA4', margin: '4px 0 10px' }}>Auto-calculated from your data above</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Calories', value: computed.calories, unit: 'kcal', color: '#8BAA3D' },
            { label: 'Protein', value: computed.protein, unit: 'g', color: '#5A7A3A' },
            { label: 'Carbs', value: computed.carbs, unit: 'g', color: '#1B3C2A' },
            { label: 'Fats', value: computed.fats, unit: 'g', color: '#8A8F84' },
          ].map((n) => (
            <div key={n.label} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '14px', border: '1.5px solid #E8EDDA' }}>
              <span style={{ fontSize: '11px', color: '#8A8F84', display: 'block', marginBottom: '4px' }}>{n.label}</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: n.color, fontFamily: "'Space Grotesk', sans-serif" }}>{n.value}</span>
              <span style={{ fontSize: '12px', color: '#8A8F84', marginLeft: '4px' }}>{n.unit}</span>
            </div>
          ))}
        </div>

        {/* Goal & Activity dropdowns */}
        {[
          {
            key: 'goal', label: 'Goal', value: pf.goal,
            options: ['Lose weight', 'Build muscle', 'Maintain weight'],
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
          },
          {
            key: 'activity', label: 'Activity Level', value: pf.activity,
            options: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Athlete'],
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A7A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
          },
        ].map((dd) => {
          const isOpen = openDropdown === dd.key
          return (
            <div key={dd.key} style={{ marginTop: '8px' }}>
              <div onClick={() => setOpenDropdown(isOpen ? null : dd.key)} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 0', cursor: 'pointer',
                borderBottom: !isOpen ? '1px solid #E5E3D8' : 'none',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E8EDDA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{dd.icon}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{dd.label}</span>
                  <span style={{ fontSize: '12px', color: '#5A7A5A' }}>{dd.value}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8F84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {isOpen && (
                <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1.5px solid #8BAA3D', overflow: 'hidden', marginBottom: '8px' }}>
                  {dd.options.map((opt) => {
                    const selected = dd.value === opt
                    return (
                      <div key={opt} onClick={() => { setPf({ ...pf, [dd.key]: opt }); setOpenDropdown(null) }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid #E8EDDA',
                        backgroundColor: selected ? '#F0F5E6' : 'white',
                      }}>
                        <span style={{ fontSize: '14px', fontWeight: selected ? 600 : 400, color: selected ? '#1B3C2A' : '#5A7A5A' }}>{opt}</span>
                        {selected && (
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#8BAA3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

        {/* Save CTA */}
        <button onClick={handleSave} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(135deg, #8BAA3D 0%, #5A7A3A 100%)',
          color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginTop: '24px',
        }}>Save changes</button>
      </div>
    </div>
  )
}
