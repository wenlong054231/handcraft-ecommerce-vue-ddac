<script lang='ts'>
  import { defineComponent } from 'vue'
  import MenuItemsComp from '@/components/MenuItemsComp.vue'

  export default defineComponent({
    name: 'CustomerHome',
    components: { MenuItemsComp },
    data() {
      return {
        bestSeller: [
          {
            title: 'Apple Puff',
            price: '5.00',
            img: ''
          },
          {
            title: 'Apple Puff',
            price: '5.00',
            img: ''
          },
          {
            title: 'Apple Puff',
            price: '5.00',
            img: ''
          },
          {
            title: 'Apple Puff',
            price: '5.00',
            img: ''
          },
          {
            title: 'Apple Puff',
            price: '5.00',
            img: ''
          }
        ] as MenuItem[]
      }
    }
  })
</script>

<template>
  <div class='flex place-content-center'>
    <div class='content'>
      <div>
        <h5 class='text-2xl '>Rong Sheng's Famous Pastries and Cake</h5>
        <div class='divider'></div>
        <p class='text-lg text-gray-400 '>Location: Klang</p>
        <p class='text-lg text-gray-400 '>Operation Hour: 8:00am to 6:00pm</p>
      </div>
      <div class='p-12'>
        <h5 class='text-xl'>Best Seller</h5>
        <div class='divider'></div>
        <menu-items-comp :menu-items='bestSeller'></menu-items-comp>
      </div>
      <div class='p-12'>
        <h5 class='text-xl'>Available Menu Items</h5>
        <div class='divider'></div>
        <menu-items-comp :menu-items='bestSeller'></menu-items-comp>
      </div>
    </div>
  </div>
</template>

<style scoped lang='postcss'>
  .content {
    width: 60rem;
    @apply pt-20
  }

  .divider {
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    @apply my-1
  }

  h5 {
    @apply font-bold;
  }
</style>