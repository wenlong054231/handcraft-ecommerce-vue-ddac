<script lang="ts">
  import { defineComponent } from 'vue'
  import { Order } from '@/types/models'
  import { fetchHistory, OrderStatus } from '@/assets/scripts/order-requests'
  import OrderHistoryComp from '@/components/OrderHistoryComp.vue'

  export default defineComponent({
    name: 'OrderHistory',
    components: { OrderHistoryComp },

    data() {
      return {
        orders: [] as Order[],
      }
    },
    methods: {
      fetchOrders() {
        this.orders = fetchHistory()
      },
    },
    mounted() {
      this.fetchOrders()
    },
    computed: {
      completedOrder() {
        return this.orders.filter((order) => order.status === OrderStatus.complete)
      },
      pendingOrder() {
        return this.orders.filter((order) => order.status === OrderStatus.pending)
      },
      canceledOrder() {
        return this.orders.filter((order) => order.status === OrderStatus.canceled)
      },
    },
  })
</script>

<template>
  <h3>Order History</h3>
  <el-divider />
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon></el-icon>
          <span>On Going</span>
        </span>
      </template>
      <order-history-comp :orders="pendingOrder"></order-history-comp>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon></el-icon>
          <span>Completed</span>
        </span>
      </template>
      <order-history-comp :orders="completedOrder"></order-history-comp>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon></el-icon>
          <span>Canceled</span>
        </span>
      </template>
      <order-history-comp :orders="canceledOrder"></order-history-comp>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="postcss"></style>
