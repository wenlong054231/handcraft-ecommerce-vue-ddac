import { MenuItemData, OrderData } from '@/types/models'
import { OrderStatus } from '@/assets/scripts/order-requests'

export enum ItemStatus {
  available = 'Available',
  soldOut = 'Sold Out',
  disabled = 'Disabled',
}

export function fetchMenuData() {
  const menu: MenuItemData[] = [
    {
      id: '1',
      title: 'Wood Fan',
      price: 20.0,
      img: '',
      isBestSeller: false,
      status: ItemStatus.available,
    },
  ]
  return menu
}

export function fetchOrders() {
  const orders: OrderData[] = [
    {
      id: '1',
      store: '',
      totalPrice: 'RM 35.00',
      status: OrderStatus.complete,
      placedDate: '11-01-2023 12:00',
      completedDate: '11-01-2023 13:00',
      customerName: 'customer 1',
      progress: '2',
    },
    {
      id: '2',
      store: '',
      totalPrice: 'RM 35.00',
      status: OrderStatus.pending,
      placedDate: '11-01-2023 12:00',
      completedDate: '11-01-2023 13:00',
      customerName: 'customer 1',
      progress: '2',
    },
  ]
  return orders
}
