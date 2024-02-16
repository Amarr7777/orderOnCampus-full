import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice'
import canteenSlice from './slices/canteenSlice'

export const store = configureStore({
  reducer: {
    cart : CartSlice,
    canteen : canteenSlice
  },
})

