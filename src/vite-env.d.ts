/// <reference types="vite/client" />
import { Store } from 'vuex'
import { CartItem, Profile } from '@/types/models'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.jpg'
declare module '*.png'
declare module '*.css'

declare module '@vue/runtime-core' {
  export interface State {
    isLogin: boolean
    cartItems: CartItem[]
    profile: Profile
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
