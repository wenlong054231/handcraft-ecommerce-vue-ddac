import { createStore } from 'vuex'
import { State } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { CartItem, Profile } from '@/types/models'

const store = createStore<State>({
  state() {
    return {
      isLogin: sessionStorage.getItem('token') !== null,
      cartItems: [],
      profile: {
        id: '1',
        username: 'user',
        email: 'user@gmail.com',
        avatar: '',
        mobile: '601234567',
        address: 'test',
      },
    }
  },
  mutations: {
    loadLoginStatue(state) {
      state.isLogin = sessionStorage.getItem('token') !== null
    },
    addCartItem(state, item: CartItem) {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id)
      if (existingItemIndex !== -1) {
        // If item with same ID already exists, increase the quantity
        const total = state.cartItems[existingItemIndex].mount + item.mount
        if (total > 10) {
          ElMessage.warning('Maximum 10 per item')
          return
        }
        state.cartItems[existingItemIndex].mount = total
        state.cartItems[existingItemIndex].totalPrice = (state.cartItems[existingItemIndex].price * state.cartItems[existingItemIndex].mount).toFixed(2)
      } else {
        // If item with same ID does not exist, add it to the cart
        state.cartItems.push(item)
      }
    },
    updateCartItem(state, item: CartItem) {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id)
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] = item
        state.cartItems[existingItemIndex].totalPrice = (state.cartItems[existingItemIndex].price * state.cartItems[existingItemIndex].mount).toFixed(2)
      }
    },
    removeCartItem(state, item: CartItem) {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id)
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1)
      }
    },
    clearCart(state) {
      state.cartItems = []
    },
    updateProfile(state, profile: Profile) {
      state.profile = profile
    },
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin
    },
    getCart(state) {
      return state.cartItems
    },
    getProfile(state) {
      return state.profile
    },
  },
})

export default store
