<script lang="ts">
  import { defineComponent } from 'vue'
  import MenuComp from '@/components/MenuComp.vue'
  import ItemComp from '@/components/ItemComp.vue'
  import { CartItem, Menu, MenuItem } from '@/types/models'
  import { fetchMenu } from '@/assets/scripts/menu-requests'

  export default defineComponent({
    name: 'CustomerHome',
    components: { ItemComp, MenuComp },
    data() {
      return {
        menu: {} as Menu,
        showItemDialog: false,
        detailItem: {} as CartItem,
      }
    },
    methods: {
      goDetail(item: MenuItem): void {
        this.detailItem = Object.assign(item)
        this.detailItem.mount = 1
        this.detailItem.totalPrice = item.price.toFixed(2)
        this.showItemDialog = true
      },
      add(): void {
        this.$store.commit('addCartItem', this.detailItem)
        this.showItemDialog = false
      },
      fetchMenu() {
        this.menu = fetchMenu()
      },
    },
    mounted() {
      this.fetchMenu()
    },
  })
</script>

<template>
  <div>
    <h3>Handicraft Store</h3>
    <el-divider />
    <p class="text-lg text-gray-400">Location: Klang</p>
    <p class="text-lg text-gray-400">Operation Hour: 8:00am to 6:00pm</p>
  </div>
  <div class="p-12">
    <h4>Best Seller</h4>
    <el-divider />
    <menu-comp :menu-items="menu.bestSeller" :go-detail="goDetail"></menu-comp>
  </div>
  <div class="p-12">
    <h4>Available Menu Items</h4>
    <el-divider />
    <menu-comp :menu-items="menu.availableItems" :go-detail="goDetail"></menu-comp>
  </div>
  <el-dialog class="px-10" v-model="showItemDialog" title="Add Item" width="50rem">
    <item-comp :item="detailItem"></item-comp>
    <template #footer>
      <span class="dialog-footer"><el-button @click="add">Add to Cart</el-button></span>
    </template>
  </el-dialog>
</template>

<style scoped lang="postcss"></style>
