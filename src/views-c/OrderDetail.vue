<script lang="ts">
  import { defineComponent } from 'vue'
  import OrderComp from '@/components/OrderComp.vue'

  export default defineComponent({
    name: 'OrderDetail',
    components: { OrderComp },
    props: {
      id: {
        type: String,
        default: '',
      },
    },
  })
</script>

<template>
  <h3>Order Detail</h3>
  <el-divider />
  <order-comp :id="id"></order-comp>
</template>

<style scoped lang="postcss"></style>
