import { create } from 'zustand'
import { proteins, carbs, vegetables, extras } from '../data/ingredients'

export const useStore = create((set, get) => ({
  // Custom Bowl Builder
  selectedProteins: [],
  selectedCarbs: [],
  selectedVegetables: [],
  selectedExtras: [],

  toggleProtein: (id) => set((s) => {
    const has = s.selectedProteins.includes(id)
    if (has) return { selectedProteins: s.selectedProteins.filter((i) => i !== id) }
    if (s.selectedProteins.length >= 2) return s
    return { selectedProteins: [...s.selectedProteins, id] }
  }),

  toggleCarb: (id) => set((s) => {
    const has = s.selectedCarbs.includes(id)
    if (has) return { selectedCarbs: s.selectedCarbs.filter((i) => i !== id) }
    if (s.selectedCarbs.length >= 2) return s
    return { selectedCarbs: [...s.selectedCarbs, id] }
  }),

  toggleVegetable: (id) => set((s) => {
    const has = s.selectedVegetables.includes(id)
    if (has) return { selectedVegetables: s.selectedVegetables.filter((i) => i !== id) }
    if (s.selectedVegetables.length >= 2) return s
    return { selectedVegetables: [...s.selectedVegetables, id] }
  }),

  toggleExtra: (id) => set((s) => {
    const has = s.selectedExtras.includes(id)
    if (has) return { selectedExtras: s.selectedExtras.filter((i) => i !== id) }
    if (s.selectedExtras.length >= 2) return s
    return { selectedExtras: [...s.selectedExtras, id] }
  }),

  resetCustomBowl: () => set({ selectedProteins: [], selectedCarbs: [], selectedVegetables: [], selectedExtras: [] }),

  getCustomNutrition: () => {
    const s = get()
    const items = [
      ...s.selectedProteins.map((id) => proteins.find((p) => p.id === id)),
      ...s.selectedCarbs.map((id) => carbs.find((c) => c.id === id)),
      ...s.selectedVegetables.map((id) => vegetables.find((v) => v.id === id)),
      ...s.selectedExtras.map((id) => extras.find((e) => e.id === id)),
    ].filter(Boolean)
    return items.reduce(
      (acc, i) => ({
        kcal: acc.kcal + i.kcal,
        protein: acc.protein + i.protein,
        carbs: acc.carbs + (i.carbs || 0),
        fat: acc.fat,
        price: acc.price + i.price,
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 20, price: 0 }
    )
  },

  getSelectedItems: () => {
    const s = get()
    return [
      ...s.selectedProteins.map((id) => ({ ...proteins.find((p) => p.id === id), cat: 'Protein' })),
      ...s.selectedCarbs.map((id) => ({ ...carbs.find((c) => c.id === id), cat: 'Carbs' })),
      ...s.selectedVegetables.map((id) => ({ ...vegetables.find((v) => v.id === id), cat: 'Vegetable' })),
      ...s.selectedExtras.map((id) => ({ ...extras.find((e) => e.id === id), cat: 'Extra' })),
    ].filter(Boolean)
  },

  // Cart / Basket
  cart: [],
  addPresetToCart: (bowl) => set((s) => ({ cart: [...s.cart, { ...bowl, type: 'preset' }] })),
  addCustomToCart: () => set((s) => {
    const nutrition = get().getCustomNutrition()
    return {
      cart: [...s.cart, {
        id: 'custom-' + Date.now(),
        name: 'My Custom Bowl',
        type: 'custom',
        ...nutrition,
      }],
    }
  }),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),
  removeOneFromCart: (id) => set((s) => {
    const idx = s.cart.findIndex((i) => i.id === id)
    if (idx === -1) return s
    const next = [...s.cart]
    next.splice(idx, 1)
    return { cart: next }
  }),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => get().cart.reduce((sum, i) => sum + i.price, 0),

  // Order tracking
  currentOrder: null,
  orderStep: 0,
  paymentMethod: 'apple_pay',
  setPaymentMethod: (m) => set({ paymentMethod: m }),
  placeOrder: () => set((s) => ({
    currentOrder: {
      id: '#' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0'),
      items: [...s.cart],
      total: get().getCartTotal(),
      payment: s.paymentMethod,
      deliveryInfo: { ...s.deliveryInfo },
    },
    orderStep: 0,
    cart: [],
  })),
  advanceOrderStep: () => set((s) => ({ orderStep: Math.min(s.orderStep + 1, 3) })),

  // Delivery info
  deliveryInfo: { firstName: '', lastName: '', company: '', address: '', houseNumber: '', postalCode: '', city: '' },
  setDeliveryInfo: (info) => set({ deliveryInfo: info }),
  deliveryTime: null,
  setDeliveryTime: (t) => set({ deliveryTime: t }),

  // Rewards / Streak
  totalOrders: 4,
  streakActive: true,
  setTotalOrders: (n) => set({ totalOrders: n }),
  unlockStreak: () => set({ streakActive: true }),

  // User
  isLoggedIn: false,
  user: { name: '', email: '', phone: '', dob: '' },
  profile: {
    calories: '2000', protein: '120', carbs: '250', fats: '65',
    goal: 'Lose weight', activity: 'Sedentary',
    gender: '', age: '', weight: '70', height: '170',
  },
  login: (userData) => set({ isLoggedIn: true, user: userData }),
  logout: () => set({ isLoggedIn: false, user: { name: '', email: '', phone: '', dob: '' } }),
  updateUser: (data) => set((s) => ({ user: { ...s.user, ...data } })),
  updateProfile: (data) => set((s) => ({ profile: { ...s.profile, ...data } })),
}))
