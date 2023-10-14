import { ItemStatus } from '@/assets/scripts/admin-requests'
import { OrderStatus } from '@/assets/scripts/order-requests'

declare interface Menu {
  bestSeller: MenuItem[]
  availableItems: MenuItem[]
}

declare interface MenuItem {
  id: string
  title: string
  price: number
  img: string
}

declare interface MenuItemData extends MenuItem {
  isBestSeller: boolean
  status: ItemStatus
}

declare interface UserDetail {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  passwordConfirm: string
}

declare interface CartItem extends MenuItem {
  mount: number
  totalPrice: string
  note: string
}

declare interface Order {
  id: string
  store: string
  totalPrice: string
  status: OrderStatus
  placedDate: string
  completedDate: string
}

declare interface OrderData extends Order {
  customerName: string
  progress: string
}

declare interface Profile {
  id: string
  username: string
  email: string
  avatar: string
  mobile: string
  address: string
}
