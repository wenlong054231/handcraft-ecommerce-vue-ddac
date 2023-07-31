import { Menu, MenuItem } from '@/types/models'

export function fetchMenu(){
  const menu: Menu  = {
    bestSeller: [
      {
        id: '1',
        title: 'Wood Fan',
        price: 20.00,
        img: ''
      },
      {
        id: '2',
        title: 'Puppets',
        price: 50.00,
        img: ''
      }
    ] as MenuItem[],
    availableItems: [
      {
        id: '1',
        title: 'Wood Fan',
        price: 20.00,
        img: ''
      },
      {
        id: '2',
        title: 'Puppets',
        price: 50.00,
        img: ''
      }
    ] as MenuItem[]
  }
  return menu
}

export function getItemDetail() {

}
