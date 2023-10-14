<script lang="ts">
  import { defineComponent } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import { OrderData } from '@/types/models'
  import { fetchOrders } from '@/assets/scripts/admin-requests'
  import ItemEditComp from '@/components/ItemEditComp.vue'
  import OrderComp from '@/components/OrderComp.vue'
  import axios from 'axios'

  export default defineComponent({
    name: 'OrderManage',
    components: { OrderComp, ItemEditComp, Search },
    data() {
      return {
        orders: [] as OrderData[],
        showDetail: false,
        orderId: '',
      }
    },
    methods: {
      async fetchOrders() {
        this.orders = await fetchOrders();
      },
      filterStatus(value: string, row: OrderData) {
        return row.status === value
      },
      handleView(index: number, row: OrderData) {
        this.orderId = row.id
        this.showDetail = true
      },
      async handleRefund(index: number, row: OrderData) {
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/orders/refund/${row.id}`);
        console.log(response.data);
        // Update orders after successful refund
        this.fetchOrders();
      } catch (error) {
        console.error('Error refunding order:', error);
      }
    },
       async handleCancel(index: number, row: OrderData) {
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/orders/cancel/${row.id}`);
        console.log(response.data);
        // Update orders after successful cancel
        this.fetchOrders();
      } catch (error) {
        console.error('Error canceling order:', error);
      }
    },
    },
    mounted() {
      this.fetchOrders()
    },
  })
</script>

<template>
  <div>
    <h3>Order Management</h3>
    <el-divider />
    <div class="flex flex-row mb-6">
      <div class="w-96 mr-3">
        <el-input>
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <el-button>Search</el-button>
      <div class="flex-grow"></div>
    </div>
    <div class="border border-primary-200 p-3 rounded-md">
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="customerName" label="Customer Name" width="200" />
        <el-table-column prop="totalPrice" label="Price" width="150" />
        <el-table-column prop="progress" label="Progress" width="150" />
        <el-table-column
          prop="status"
          :filters="[
            { text: 'Pending', value: 'Pending' },
            { text: 'Complete', value: 'Complete' },
            { text: 'Canceled', value: 'Canceled' },
          ]"
          :filter-method="filterStatus"
          label="Status"
          width="150">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'Completed' ? '' : 'success'" disable-transitions>{{ scope.row.status }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleView(scope.$index, scope.row)">View</el-button>
            <el-button size="small" type="warning" @click="handleRefund(scope.$index, scope.row)">Refund</el-button>
            <el-button size="small" type="danger" @click="handleCancel(scope.$index, scope.row)">Cancel</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog class="px-10" v-model="showDetail" title="Order Detail" width="50rem">
      <order-comp :id="orderId"></order-comp>
    </el-dialog>
  </div>
</template>

<style scoped lang="postcss"></style>
