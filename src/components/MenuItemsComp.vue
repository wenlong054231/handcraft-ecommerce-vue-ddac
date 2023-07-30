<script lang='ts'>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MenuItemsComp',
    props: {
      menuItems: {
        type: Array as () => MenuItem[],
        default: () => []
      }
    }
  })
</script>

<template>
  <div class='flex flex-wrap p-3 gap-6'>
    <div class='card' v-for='item in menuItems'>
      <div class='flex place-content-center'>
        <img :src='item.img' alt='封面' />
      </div>
      <p class='font-bold'>{{ item.title }}</p>
      <p>Price: RM {{ item.price }}</p>
      <button>Add to Cart</button>
    </div>
  </div>
</template>

<style scoped lang='postcss'>
  .card {
    height: 18rem;
    width: 12rem;
    @apply border-2 border-cyan-400 rounded-lg;
    @apply p-2;
    @apply flex flex-col gap-2;
  }

  button {
    @apply border-2 border-gray-600 rounded-md border-opacity-60;
    @apply px-1 ml-16;
  }

  img {
    height: 10rem;
    width: 10rem;
  }
</style>