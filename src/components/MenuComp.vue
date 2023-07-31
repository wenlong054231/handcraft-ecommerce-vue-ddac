<script lang="ts">
  import { defineComponent } from 'vue'
  import { MenuItem } from '@/types/models'

  export default defineComponent({
    name: 'MenuComp',
    props: {
      menuItems: {
        type: Array as () => MenuItem[],
        default: () => [],
      },
      goDetail: {
        type: Function,
        require: true,
        default: () => {},
      },
    },
    methods: {
      handleClick(item: MenuItem): void {
        this.goDetail(item)
      },
    },
  })
</script>

<template>
  <div class="flex flex-wrap p-3 gap-6">
    <div class="card" v-for="item in menuItems">
      <div class="flex place-content-center">
        <el-image style="width: 10rem; height: 10rem" :src="item.img" alt="Item Picture" />
      </div>
      <p class="font-bold">{{ item.title }}</p>
      <p>Price: RM {{ item.price }}</p>
      <el-button @click="handleClick(item)">Add to Cart</el-button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .card {
    height: 18rem;
    width: 12rem;
    @apply border-2 border-primary-400 rounded-lg;
    @apply p-2;
    @apply flex flex-col gap-2;
  }

  img {
    height: 10rem;
    width: 10rem;
  }
</style>
