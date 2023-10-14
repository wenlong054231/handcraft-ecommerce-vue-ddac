import { MenuItemData, OrderData } from '@/types/models'
import { OrderStatus } from '@/assets/scripts/order-requests'
import axios from 'axios'

export enum ItemStatus {
  available = 'Available',
  soldOut = 'Sold Out',
  disabled = 'Disabled',
}

export async function fetchMenuData(): Promise<MenuItemData[]> {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/products/all');
    console.log('Raw menu data:', response.data);
    
    if (Array.isArray(response.data)) {
      const menuItems = response.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        price: parseFloat(item.price),
        img: item.image || '',
        isBestSeller: item.bestSeller,
        status: item.status as ItemStatus,
      }));

      console.log('Transformed menu items:', menuItems);
      return menuItems;
    } else {
      console.error('Invalid menu data format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return [];
  }
}


export async function fetchOrders() {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/orders/all'); // Update the URL to match your backend endpoint
    const orders = response.data.map((order:any) => {
      return {
        id: order.id,
        store: '',
        totalPrice: `RM ${order.totalPrice.toFixed(2)}`,
        status: order.status,
        placedDate: formatDate(order.placedDate),
        completedDate: order.completedDate ? formatDate(order.completedDate) : '',
        customerName: order.customerName,
        progress: '2', // Replace this with actual progress logic
      };
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return []; // Return an empty array in case of an error
  }
}

function formatDate(dateString:any) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}