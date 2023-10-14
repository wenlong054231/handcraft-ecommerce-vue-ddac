import { Menu, MenuItem } from '@/types/models'
import axios from 'axios';

export async function fetchMenu(): Promise<Menu> {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/products/all');
    console.log('Raw menu data:', response.data);

    if (Array.isArray(response.data)) {
      const bestSeller: MenuItem[] = [];
      const availableItems: MenuItem[] = [];

      response.data.forEach((item: any) => {
        const menuItem: MenuItem = {
          id: item.id.toString(),
          title: item.title,
          price: parseFloat(item.price),
          img: item.image || '',
        };

        if (item.bestSeller) {
          bestSeller.push(menuItem);
        }
        availableItems.push(menuItem);
      });

      const menu: Menu = {
        bestSeller,
        availableItems,
      };

      console.log('Transformed menu:', menu);
      return menu;
    } else {
      console.error('Invalid menu data format:', response.data);
      return {
        bestSeller: [],
        availableItems: [],
      };
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return {
      bestSeller: [],
      availableItems: [],
    };
  }
}


export function getItemDetail() {

}
