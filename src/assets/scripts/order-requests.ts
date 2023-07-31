import { Order } from '@/types/models'

export enum OrderStatus {
  complete = 'Completed',
  pending = 'Pending',
  paid = 'Paid',
  canceled = 'Canceled',
}

export function checkout() {}

export function fetchHistory() {
  const orders: Order[] = [
    {
      id: '1',
      store: 'Klang',
      totalPrice: '35.00',
      status: OrderStatus.canceled,
      placedDate: '11-01-2023 12:00',
      completedDate: '11-01-2023 13:00',
    },
    {
      id: '2',
      store: 'Klang',
      totalPrice: '35.00',
      status: OrderStatus.complete,
      placedDate: '11-01-2023 12:00',
      completedDate: '11-01-2023 13:00',
    },
    {
      id: '3',
      store: 'Klang',
      totalPrice: '35.00',
      status: OrderStatus.pending,
      placedDate: '11-01-2023 12:00',
      completedDate: '11-01-2023 13:00',
    },
  ]
  return orders
}

export function getOrderDetail() {}
