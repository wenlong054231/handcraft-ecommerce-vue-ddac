/// <reference types="vite/client" />
import { Store } from 'vuex'

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
        role: string[]
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
