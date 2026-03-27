import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from './components/NavBar'
import FloatingBars from './components/FloatingBars'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import MapsPage from './pages/MapsPage'
import DeliveryFeesPage from './pages/DeliveryFeesPage'
import OpeningHoursPage from './pages/OpeningHoursPage'
import CustomBowlProteinPage from './pages/CustomBowlProteinPage'
import CustomBowlCarbsPage from './pages/CustomBowlCarbsPage'
import CustomBowlVegPage from './pages/CustomBowlVegPage'
import CustomBowlExtrasPage from './pages/CustomBowlExtrasPage'
import CustomBowlRecapPage from './pages/CustomBowlRecapPage'
import BasketPage from './pages/BasketPage'
import DeliveryPage from './pages/DeliveryPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmPage from './pages/OrderConfirmPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import RewardsPage from './pages/RewardsPage'
import StreakRegisterPage from './pages/StreakRegisterPage'
import StreakQRCodePage from './pages/StreakQRCodePage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PreferencesPage from './pages/PreferencesPage'
import HelpSupportPage from './pages/HelpSupportPage'
import LoginPage from './pages/LoginPage'
import LoginPage2 from './pages/LoginPage2'
import OnboardingPage from './pages/OnboardingPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div style={{ maxWidth: '393px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#F4F3EC', position: 'relative' }}>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-2" element={<LoginPage2 />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/maps" element={<MapsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/preferences" element={<PreferencesPage />} />
        <Route path="/profile/help" element={<HelpSupportPage />} />
        <Route path="/maps/delivery-fees" element={<DeliveryFeesPage />} />
        <Route path="/maps/opening-hours" element={<OpeningHoursPage />} />
        <Route path="/custom/protein" element={<CustomBowlProteinPage />} />
        <Route path="/custom/carbs" element={<CustomBowlCarbsPage />} />
        <Route path="/custom/veg" element={<CustomBowlVegPage />} />
        <Route path="/custom/extras" element={<CustomBowlExtrasPage />} />
        <Route path="/custom/recap" element={<CustomBowlRecapPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} />
        <Route path="/rewards/register" element={<StreakRegisterPage />} />
        <Route path="/rewards/qrcode" element={<StreakQRCodePage />} />
      </Routes>
      <FloatingBars />
      <NavBar />
    </div>
  )
}
