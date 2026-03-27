import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import logoPng from '../assets/logo.png'

const activityOptions = [
  { label: 'Sedentary', sub: 'Little or no exercise', factor: 1.2 },
  { label: 'Lightly active', sub: '1-2 workouts per week', factor: 1.375 },
  { label: 'Moderately active', sub: '3-5 workouts per week', factor: 1.55 },
  { label: 'Very active', sub: '6-7 workouts per week', factor: 1.725 },
  { label: 'Athlete', sub: 'Twice a day / professional training', factor: 1.9 },
]

const goalOptions = [
  { label: 'Lose weight', sub: 'Burn more calories to reach your target weight', icon: '🔥', offset: -300 },
  { label: 'Build muscle', sub: 'High protein for muscle growth', icon: '💪', offset: 300 },
  { label: 'Maintain weight', sub: 'We change your goals to maintenance', icon: '⚖️', offset: 0 },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { login, updateProfile } = useStore()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', gender: '' })
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [activity, setActivity] = useState('')
  const [goal, setGoal] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)

  const totalSteps = 6

  // Compute BMI
  const bmi = weight > 0 && height > 0 ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null
  const bmiLabel = bmi ? (bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese') : ''

  // Compute calories & macros
  const computePlan = () => {
    const w = weight || 70
    const h = height || 170
    const a = parseInt(form.age) || 25
    const isMale = form.gender !== 'Female'
    // Mifflin-St Jeor
    const bmr = isMale ? (10 * w + 6.25 * h - 5 * a + 5) : (10 * w + 6.25 * h - 5 * a - 161)
    const actObj = activityOptions.find((o) => o.label === activity) || { factor: 1.2 }
    const goalObj = goalOptions.find((o) => o.label === goal) || { offset: 0 }
    const tdee = Math.round(bmr * actObj.factor + goalObj.offset)
    const protein = Math.round(w * (goal === 'Build muscle' ? 2.2 : 1.6))
    const fats = Math.round(tdee * 0.25 / 9)
    const carbs = Math.round((tdee - protein * 4 - fats * 9) / 4)
    return { calories: Math.max(tdee, 1200), protein, carbs: Math.max(carbs, 50), fats }
  }

  const plan = computePlan()

  const handleFinish = () => {
    login({ name: `${form.firstName} ${form.lastName}`.trim(), email: '', phone: '', dob: '' })
    updateProfile({
      calories: String(plan.calories), protein: String(plan.protein),
      carbs: String(plan.carbs), fats: String(plan.fats),
      goal, activity, weight: String(weight), height: String(height), age: form.age, gender: form.gender,
    })
    navigate('/rewards')
  }

  const progress = ((step) / (totalSteps - 1)) * 100

  const canNext = () => {
    if (step === 0) return true
    if (step === 1) return form.firstName.trim().length > 0 && form.age.length > 0
    if (step === 2) return weight > 0 && height > 0
    if (step === 3) return activity.length > 0
    if (step === 4) return goal.length > 0
    if (step === 5) return true
    return true
  }

  const nextStep = () => {
    if (step === 5) handleFinish()
    else setStep(step + 1)
  }

  const fieldStyle = (key) => ({
    width: '100%', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    border: focusedInput === key ? '1.5px solid rgba(139,170,61,0.5)' : '1px solid rgba(255,255,255,0.5)',
    borderRadius: '16px', padding: '16px', fontSize: '15px', color: '#1B3C2A',
    outline: 'none', boxSizing: 'border-box', fontFamily: "'Bricolage Grotesque', sans-serif",
    transition: 'border-color 0.2s',
    boxShadow: focusedInput === key ? '0 0 0 3px rgba(139,170,61,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
  })

  const renderStep = () => {
    // Step 0: Welcome
    if (step === 0) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px 0', textAlign: 'center' }}>
        <div style={{
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #E8EDDA 0%, #D4E8B0 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '32px', position: 'relative',
          boxShadow: '0 8px 32px rgba(139,170,61,0.15)', animation: 'float 4s ease-in-out infinite',
        }}>
          <img src={logoPng} alt="FitFork" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 12px' }}>
          Bienvenue chez<br /><span style={{ background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FitFork</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#7A8A6A', lineHeight: 1.5, maxWidth: '280px' }}>
          Let's set up your profile to personalize your experience
        </p>
      </div>
    )

    // Step 1: Tell us about you
    if (step === 1) return (
      <div style={{ padding: '0 24px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 6px', background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tell us about you</h2>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 24px' }}>We'll use this to personalize your experience</p>

        <label style={{ fontSize: '12px', color: '#7A8A6A', fontWeight: 600, display: 'block', marginBottom: '6px' }}>First name</label>
        <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          onFocus={() => setFocusedInput('firstName')} onBlur={() => setFocusedInput(null)}
          placeholder="First name" style={fieldStyle('firstName')} autoFocus />

        <label style={{ fontSize: '12px', color: '#7A8A6A', fontWeight: 600, display: 'block', marginBottom: '6px', marginTop: '14px' }}>Last name</label>
        <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          onFocus={() => setFocusedInput('lastName')} onBlur={() => setFocusedInput(null)}
          placeholder="Last name" style={fieldStyle('lastName')} />

        <label style={{ fontSize: '12px', color: '#7A8A6A', fontWeight: 600, display: 'block', marginBottom: '6px', marginTop: '14px' }}>Age</label>
        <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
          onFocus={() => setFocusedInput('age')} onBlur={() => setFocusedInput(null)}
          placeholder="25" style={fieldStyle('age')} />

        <label style={{ fontSize: '12px', color: '#7A8A6A', fontWeight: 600, display: 'block', marginBottom: '8px', marginTop: '14px' }}>Gender</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Male', 'Female', 'Other'].map((g) => {
            const sel = form.gender === g
            return (
              <button key={g} onClick={() => setForm({ ...form, gender: g })} style={{
                flex: 1, padding: '12px 0', borderRadius: '14px', cursor: 'pointer',
                border: sel ? '1.5px solid rgba(139,170,61,0.5)' : '1px solid rgba(255,255,255,0.5)',
                background: sel ? 'rgba(139,170,61,0.1)' : 'rgba(255,255,255,0.6)',
                fontSize: '14px', fontWeight: sel ? 600 : 400,
                color: sel ? '#1B3C2A' : '#8A8F84',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                transition: 'all 0.2s',
              }}>{g}</button>
            )
          })}
        </div>
      </div>
    )

    // Step 2: Body metrics
    if (step === 2) {
      const sliderThumbStyle = `
        input[type=range].metric-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; outline: none; }
        input[type=range].metric-slider::-webkit-slider-track { height: 6px; border-radius: 3px; background: rgba(139,170,61,0.1); }
        input[type=range].metric-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #8BAA3D, #A0C044); border: 3px solid white; box-shadow: 0 2px 8px rgba(139,170,61,0.3); cursor: pointer; margin-top: -9px; }
        input[type=range].metric-slider::-moz-range-track { height: 6px; border-radius: 3px; background: rgba(139,170,61,0.1); border: none; }
        input[type=range].metric-slider::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #8BAA3D, #A0C044); border: 3px solid white; box-shadow: 0 2px 8px rgba(139,170,61,0.3); cursor: pointer; }
        input[type=range].metric-slider::-moz-range-progress { background: #8BAA3D; height: 6px; border-radius: 3px; }
      `
      const btnStyle = {
        width: '40px', height: '40px', borderRadius: '14px', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700,
      }
      return (
        <div style={{ padding: '0 24px' }}>
          <style>{sliderThumbStyle}</style>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 6px', background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your body metrics</h2>
          <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 28px' }}>This helps us calculate your daily needs</p>

          {/* Weight */}
          <label style={{ fontSize: '12px', color: '#7A8A6A', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Weight</label>
          <div style={{
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.5)',
            padding: '18px 20px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '42px', fontWeight: 700, color: '#1B3C2A', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{weight}</span>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#B0ADA4', alignSelf: 'flex-end', paddingBottom: '4px' }}>kg</span>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
                <button onClick={() => setWeight(Math.max(20, weight - 0.5))} style={{ ...btnStyle, background: 'rgba(139,170,61,0.1)', color: '#1B3C2A' }}>−</button>
                <button onClick={() => setWeight(Math.min(200, weight + 0.5))} style={{ ...btnStyle, background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)', color: 'white' }}>+</button>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0, height: '6px', borderRadius: '3px',
                background: `linear-gradient(to right, #8BAA3D ${((weight - 20) / 180) * 100}%, #E8EDDA ${((weight - 20) / 180) * 100}%)`,
                transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0,
              }} />
              <input type="range" className="metric-slider" min="20" max="200" step="0.5"
                value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))}
                style={{ width: '100%', position: 'relative', zIndex: 1, background: 'transparent' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', color: '#B0ADA4' }}>20 kg</span>
              <span style={{ fontSize: '11px', color: '#B0ADA4' }}>200 kg</span>
            </div>
          </div>

          {/* Height */}
          <label style={{ fontSize: '12px', color: '#7A8A6A', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Height</label>
          <div style={{
            background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.5)',
            padding: '18px 20px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '42px', fontWeight: 700, color: '#1B3C2A', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{height}</span>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#B0ADA4', alignSelf: 'flex-end', paddingBottom: '4px' }}>cm</span>
              <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
                <button onClick={() => setHeight(Math.max(100, height - 1))} style={{ ...btnStyle, background: 'rgba(139,170,61,0.1)', color: '#1B3C2A' }}>−</button>
                <button onClick={() => setHeight(Math.min(230, height + 1))} style={{ ...btnStyle, background: 'linear-gradient(135deg, #1B3C2A, #2D5A3F)', color: 'white' }}>+</button>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0, height: '6px', borderRadius: '3px',
                background: `linear-gradient(to right, #8BAA3D ${((height - 100) / 130) * 100}%, #E8EDDA ${((height - 100) / 130) * 100}%)`,
                transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0,
              }} />
              <input type="range" className="metric-slider" min="100" max="230" step="1"
                value={height} onChange={(e) => setHeight(parseInt(e.target.value))}
                style={{ width: '100%', position: 'relative', zIndex: 1, background: 'transparent' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', color: '#B0ADA4' }}>100 cm</span>
              <span style={{ fontSize: '11px', color: '#B0ADA4' }}>230 cm</span>
            </div>
          </div>

          {/* BMI */}
          {bmi && (
            <div style={{
              background: 'rgba(139,170,61,0.1)', border: '1px solid rgba(139,170,61,0.15)', borderRadius: '16px', padding: '14px 18px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '14px', color: '#1B3C2A', fontWeight: 600 }}>
                Your BMI: {bmi} — {bmiLabel}
              </span>
            </div>
          )}
        </div>
      )
    }

    // Step 3: Activity level
    if (step === 3) return (
      <div style={{ padding: '0 24px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 6px', background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>How active are you?</h2>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 24px' }}>This adjusts your recommended calorie intake</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activityOptions.map((opt) => {
            const selected = activity === opt.label
            return (
              <div key={opt.label} onClick={() => setActivity(opt.label)} style={{
                background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderRadius: '18px',
                padding: '16px 18px', cursor: 'pointer',
                border: selected ? '1.5px solid rgba(139,170,61,0.5)' : '1px solid rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', gap: '14px',
                transition: 'all 0.2s ease',
                boxShadow: selected ? '0 4px 16px rgba(139,170,61,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '14px', flexShrink: 0,
                  background: selected ? 'linear-gradient(135deg, #8BAA3D, #A0C044)' : 'rgba(139,170,61,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selected ? 'white' : '#5A7A3A'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block',
                  }}>{opt.label}</span>
                  <span style={{ fontSize: '12px', color: '#7A8A6A' }}>{opt.sub}</span>
                </div>
                {selected && (
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 2px 6px rgba(139,170,61,0.3)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )

    // Step 4: Goal
    if (step === 4) return (
      <div style={{ padding: '0 24px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 6px', background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>What's your goal?</h2>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 24px' }}>We'll tailor your daily calorie targets</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {goalOptions.map((opt) => {
            const selected = goal === opt.label
            return (
              <div key={opt.label} onClick={() => setGoal(opt.label)} style={{
                background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderRadius: '18px',
                padding: '16px 18px', cursor: 'pointer',
                border: selected ? '1.5px solid rgba(139,170,61,0.5)' : '1px solid rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', gap: '14px',
                transition: 'all 0.2s ease',
                boxShadow: selected ? '0 4px 16px rgba(139,170,61,0.1)' : '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '14px', flexShrink: 0,
                  background: selected ? 'linear-gradient(135deg, #8BAA3D, #A0C044)' : 'rgba(139,170,61,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', transition: 'background-color 0.2s',
                }}>
                  {opt.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block',
                  }}>{opt.label}</span>
                  <span style={{ fontSize: '12px', color: '#7A8A6A' }}>{opt.sub}</span>
                </div>
                {selected && (
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', boxShadow: '0 2px 6px rgba(139,170,61,0.3)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )

    // Step 5: Plan ready
    if (step === 5) return (
      <div style={{ padding: '0 24px', textAlign: 'center' }}>
        {/* Checkmark */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #8BAA3D, #A0C044)', margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(139,170,61,0.3)',
          animation: 'scaleIn 0.4s ease-out both',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 6px', background: 'linear-gradient(135deg, #1B3C2A 0%, #2D5A3F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your plan is ready!</h2>
        <p style={{ fontSize: '13px', color: '#7A8A6A', margin: '0 0 28px' }}>Here's your personalized daily target</p>

        {/* Calories circle */}
        <div style={{
          width: '140px', height: '140px', borderRadius: '50%',
          border: '4px solid rgba(139,170,61,0.4)', margin: '0 auto 8px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)',
          boxShadow: '0 0 0 8px rgba(139,170,61,0.08)',
        }}>
          <span style={{ fontSize: '38px', fontWeight: 700, color: '#1B3C2A', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>{plan.calories}</span>
          <span style={{ fontSize: '11px', color: '#7A8A6A', fontWeight: 500 }}>kcal / day</span>
        </div>
        <p style={{ fontSize: '12px', color: '#7A8A6A', margin: '4px 0 24px' }}>Total estimated daily</p>

        {/* Macro targets */}
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#B0ADA4', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px', textAlign: 'left' }}>Your macro targets</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: 'Protein', value: `${plan.protein}g`, color: '#8BAA3D' },
            { label: 'Carbs', value: `${plan.carbs}g`, color: '#5A7A3A' },
            { label: 'Fats', value: `${plan.fats}g`, color: '#1B3C2A' },
          ].map((m) => (
            <div key={m.label} style={{
              flex: 1, background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', borderRadius: '16px',
              padding: '14px 8px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center',
            }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: m.color, display: 'block', fontFamily: "'Space Grotesk', sans-serif" }}>{m.value}</span>
              <span style={{ fontSize: '11px', color: '#7A8A6A' }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Profile summary */}
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#B0ADA4', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px', textAlign: 'left' }}>Your profile</p>
        <div style={{
          background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          padding: '14px 18px', textAlign: 'left',
        }}>
          {[
            { label: 'Goal', value: goal },
            { label: 'Activity', value: activity },
          ].map((r, i) => (
            <div key={r.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0',
              borderBottom: i === 0 ? '1px solid rgba(139,170,61,0.1)' : 'none',
            }}>
              <span style={{ fontSize: '13px', color: '#7A8A6A' }}>{r.label}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B3C2A' }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar with progress */}
      {step > 0 && (
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <button onClick={() => setStep(step - 1)} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '14px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', padding: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <div style={{ flex: 1, height: '4px', background: 'rgba(139,170,61,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #8BAA3D, #A0C044)',
                width: `${progress}%`, transition: 'width 0.3s ease',
              }} />
            </div>
            <span style={{ fontSize: '11px', color: '#B0ADA4', fontWeight: 500 }}>{step}/{totalSteps - 1}</span>
          </div>
        </div>
      )}

      {/* Step content */}
      <div style={{ flex: 1, paddingTop: step === 0 ? 0 : '8px', overflowY: 'auto' }}>
        {renderStep()}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '20px 24px 40px' }}>
        <button onClick={nextStep} disabled={!canNext()} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          background: canNext() ? 'linear-gradient(135deg, #8BAA3D, #A0C044)' : 'rgba(139,170,61,0.08)',
          color: canNext() ? 'white' : '#B0ADA4', fontSize: '15px', fontWeight: 600, cursor: canNext() ? 'pointer' : 'default',
          fontFamily: "'Space Grotesk', sans-serif",
          transition: 'background-color 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: canNext() ? '0 4px 16px rgba(139,170,61,0.3)' : 'none',
        }}>
          {step === 0 ? "Let's go" : step === 5 ? 'Start exploring FitFork' : 'Continue'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={canNext() ? 'white' : '#B0ADA4'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
        {step === 5 && (
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#7A8A6A', marginTop: '10px' }}>
            Adjust your plan later in settings
          </p>
        )}
      </div>
    </div>
  )
}
