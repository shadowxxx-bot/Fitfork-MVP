import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* FitFork location */
const FITFORK_LAT = 46.1983
const FITFORK_LNG = 6.1423

const markerIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#8BAA3D;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const deliveryOptions = [
  { price: null, label: 'Free delivery', sub: 'Orders above CHF 25', detail: 'Within 3 km radius', badge: 'FREE', badgeColor: '#A0C044' },
  { price: '3.50', label: 'Standard delivery', sub: 'Orders under CHF 25', detail: 'Within 3 km radius', badge: 'CHF 3.50', badgeColor: '#1B3C2A' },
  { price: '7.50', label: 'Standard delivery', sub: 'Orders over CHF 25', detail: 'Within 5-10 km radius', badge: 'CHF 7.50', badgeColor: '#1B3C2A' },
]

const timeOptions = [
  { value: '15', unit: 'Minutes', sub: '0 - 3km' },
  { value: '20', unit: 'Minutes', sub: '3 - 5km' },
  { value: '30', unit: 'Minutes', sub: '5 - 8km' },
]

export default function DeliveryFeesPage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Title bar above map */}
      <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => navigate('/maps')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1B3C2A', margin: 0 }}>Delivery</h1>
            <p style={{ fontSize: '12px', color: '#5A7A5A', margin: 0 }}>Zone & fees</p>
          </div>
        </div>
        <button onClick={() => navigate('/basket')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>

      {/* Real map with delivery zone circles */}
      <div style={{ height: '240px', overflow: 'hidden' }}>
        <MapContainer
          center={[FITFORK_LAT, FITFORK_LNG]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* 5km circle - dark green */}
          <Circle
            center={[FITFORK_LAT, FITFORK_LNG]}
            radius={5000}
            pathOptions={{
              color: '#1B3C2A',
              weight: 2,
              dashArray: '8 6',
              fillColor: '#1B3C2A',
              fillOpacity: 0.06,
            }}
          />
          {/* 3km circle - light green */}
          <Circle
            center={[FITFORK_LAT, FITFORK_LNG]}
            radius={3000}
            pathOptions={{
              color: '#8BAA3D',
              weight: 2,
              dashArray: '8 6',
              fillColor: '#8BAA3D',
              fillOpacity: 0.1,
            }}
          />
          <Marker position={[FITFORK_LAT, FITFORK_LNG]} icon={markerIcon}>
            <Popup>
              <strong>FitFork Restaurant</strong><br />
              Genève
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Delivery options */}
      <div style={{ padding: '16px 24px 0' }}>
        {deliveryOptions.map((opt, i) => (
          <div key={i} style={{
            backgroundColor: 'white', borderRadius: '16px', padding: '16px',
            marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            {/* Price circle */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '2px solid #E8EDDA', backgroundColor: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {opt.price ? (
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#8A8F84' }}>{opt.price}</span>
              ) : (
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#5A7A3A' }}>0.-</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{opt.label}</span>
              <span style={{ fontSize: '11px', color: '#7A7F74', display: 'block' }}>{opt.sub}</span>
              <span style={{ fontSize: '11px', color: '#5A7A5A' }}>{opt.detail}</span>
            </div>

            <span style={{
              fontSize: '11px', fontWeight: 700, color: 'white',
              backgroundColor: opt.badgeColor, borderRadius: '6px',
              padding: '4px 10px', flexShrink: 0,
            }}>{opt.badge}</span>
          </div>
        ))}
      </div>

      {/* Estimated delivery time */}
      <div style={{ padding: '16px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', margin: '0 0 10px' }}>Estimated delivery time</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {timeOptions.map((t) => (
            <div key={t.value} style={{
              flex: 1, backgroundColor: 'white', borderRadius: '16px',
              padding: '14px 8px', textAlign: 'center',
            }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#1B3C2A', display: 'block' }}>{t.value}</span>
              <span style={{ fontSize: '11px', color: '#5A7A5A', display: 'block' }}>{t.unit}</span>
              <span style={{ fontSize: '10px', color: '#5A7A3A', display: 'block', marginTop: '4px' }}>{t.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery condition */}
      <div style={{ padding: '16px 24px 0' }}>
        <p style={{ fontSize: '12px', color: '#8A8F84', margin: '0 0 10px' }}>Delivery condition</p>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px' }}>💳</span>
          <span style={{ fontSize: '13px', color: '#1B3C2A', fontWeight: 500 }}>Pay in advance via app</span>
        </div>
      </div>

      {/* Order Now CTA */}
      <div style={{ padding: '20px 24px 0' }}>
        <button onClick={() => navigate('/menu')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          backgroundColor: '#8BAA3D', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>Order Now</button>
      </div>
    </div>
  )
}
