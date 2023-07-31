<script lang="ts">
  import { defineComponent } from 'vue'
  import { Order } from '@/types/models'

  export default defineComponent({
    name: 'OrderHistoryComp',
    props: {
      orders: {
        type: Array as () => Order[],
        default: () => [],
      },
    },
    methods: {
      view(id: string) {
        this.$router.push('/order-detail/' + id)
      },
    },
  })
</script>

<template>
  <ul>
    <li v-for="order in orders">
      <div class="border-2 border-primary-500 rounded-md p-6">
        <el-descriptions :title="'Order ID ' + order.id" direction="horizontal" :column="1">
          <template #extra>
            <el-button type="primary" @click="view(order.id)">View Detail</el-button>
          </template>
          <el-descriptions-item label="Store:">
            {{ order.store }}
          </el-descriptions-item>
          <el-descriptions-item label="Total Price:">
            {{ order.totalPrice }}
          </el-descriptions-item>
          <el-descriptions-item label="Placed Date:">
            {{ order.placedDate }}
          </el-descriptions-item>
          <el-descriptions-item label="Completed Date:">
            {{ order.completedDate }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="postcss"></style>
