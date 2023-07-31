<script lang="ts">
  import { defineComponent } from 'vue'
  import ItemComp from '@/components/ItemComp.vue'
  import { CartItem } from '@/types/models'

  export default defineComponent({
    name: 'CartComp',
    components: { ItemComp },
    props: {
      cartItems: {
        type: Array as () => CartItem[],
        default: () => [],
      },
    },
    methods: {
      remove(item: CartItem) {
        this.$store.commit('removeCartItem', item)
      },
    },
  })
</script>

<template>
  <ul>
    <li v-for="item in cartItems">
      <item-comp :item="item"></item-comp>
      <div class="flex flex-row">
        <div class="flex-grow"></div>
        <el-button @click="remove(item)" type="danger">Remove</el-button>
      </div>
      <el-divider />
    </li>
  </ul>
</template>

<style scoped lang="postcss"></style>
