<script lang='ts'>
  import { defineComponent } from 'vue'
  import { ArrowLeft } from '@element-plus/icons-vue'
  import CartComp from '@/components/CartComp.vue'
  import { CartItem } from '@/types/models'

  export default defineComponent({
    name: 'Cart',
    components: { CartComp },
    data() {
      return {
        cartItems: this.$store.getters.getCart as CartItem[]
      }
    },
    methods: {},
    computed: {
      ArrowLeft() {
        return ArrowLeft
      },
      getTotalPrice(): string {
        let totalPrice = 0
        for (const item of this.cartItems) {
          totalPrice += parseFloat(item.totalPrice)
        }
        return totalPrice.toFixed(2)
      }

    }
  })
</script>

<template>
  <h3>Cart</h3>
  <el-divider/>
  <div class='grid grid-cols-3'>
    <div class='col-span-2'>
      <el-descriptions class='p-4' direction='vertical' :column='1' border>
        <el-descriptions-item label='Cart Items'>
          <cart-comp class='p-3' :cart-items='cartItems'></cart-comp>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div>
      <el-descriptions class='p-4' direction='vertical' :column='1' border>
        <el-descriptions-item label='Summary'>
          <ul>
            <li v-for='item in cartItems'>
              <div class='flex flex-row gap-3'>
                <p class='flex-grow'>{{ item.title }}</p>
                <p>---</p>
                <p>RM {{ item.totalPrice }}</p>
              </div>
            </li>
            <li>
              <div class='flex flex-row gap-3 pt-2'>
                <p class='flex-grow font-bold'>Total Price</p>
                <p>---</p>
                <p>RM {{ getTotalPrice }}</p>
              </div>
            </li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
      <el-button class='float-right m-4' type='primary'>Check Out</el-button>
    </div>
  </div>
</template>

<style scoped lang='postcss'>

</style>