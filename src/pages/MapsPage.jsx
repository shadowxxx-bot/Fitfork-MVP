import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/* Custom green marker icon */
const markerIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:32px;height:32px;border-radius:50%;background:#8BAA3D;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
    <div style="width:10px;height:10px;border-radius:50%;background:white"></div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

/* FitFork location: Rue de la Croix-Rouge 12, 1205 Genève */
const FITFORK_LAT = 46.1983
const FITFORK_LNG = 6.1423

export default function MapsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F4F3EC', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Title bar */}
      <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 4px' }}>Our Restaurant</h1>
          <p style={{ fontSize: '13px', color: '#5A7A5A', margin: 0 }}>Find us or order for delivery</p>
        </div>
        <button onClick={() => navigate('/basket')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B3C2A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>

      {/* Real interactive map */}
      <div style={{ position: 'relative' }}>
        <div style={{ height: '267px', overflow: 'hidden' }}>
          <MapContainer
            center={[FITFORK_LAT, FITFORK_LNG]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[FITFORK_LAT, FITFORK_LNG]} icon={markerIcon}>
              <Popup>
                <strong>FitFork Restaurant</strong><br />
                Rue de la Croix-Rouge 12, 1205 Genève
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Restaurant info card */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#E8EDDA', color: '#5A7A3A', borderRadius: '999px', padding: '4px 12px' }}>Open</span>
          <span style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#E8EDDA', color: '#5A7A3A', borderRadius: '999px', padding: '4px 12px' }}>Delivery</span>
        </div>

        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1B3C2A', margin: '0 0 4px' }}>FitFork Restaurant</h2>
        <p style={{ fontSize: '13px', color: '#7A7F74', margin: '0 0 16px' }}>Rue de la Croix-Rouge 12, 1205 Genève</p>

        <p style={{ fontSize: '12px', color: '#8A8F84', margin: '0 0 16px' }}>Informations</p>
      </div>

      {/* Info rows */}
      <div style={{ padding: '0 24px' }}>
        {[
          { icon: '📞', title: '+41 22 123 45 67', sub: 'Call the restaurant', action: 'tel:+41221234567' },
          { icon: '🚚', title: 'Free delivery from CHF 25', sub: '3 km radius · approx. 30 min', action: '/maps/delivery-fees' },
          { icon: '🕐', title: 'Opening hours', sub: 'View all hours', action: '/maps/opening-hours' },
        ].map((item, i) => (
          <div key={i}
            onClick={() => item.action.startsWith('/') ? navigate(item.action) : window.open(item.action)}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '14px 0', borderBottom: '1px solid #E8EDDA',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#E8EDDA',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0,
            }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1B3C2A', display: 'block' }}>{item.title}</span>
              <span style={{ fontSize: '12px', color: '#7A7F74' }}>{item.sub}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8F84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>

      {/* Order Now CTA */}
      <div style={{ padding: '24px 24px 0' }}>
        <button onClick={() => navigate('/menu')} style={{
          width: '100%', padding: '16px', borderRadius: '999px', border: 'none',
          backgroundColor: '#8BAA3D', color: 'white',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>Order Now</button>
      </div>
    </div>
  )
}
