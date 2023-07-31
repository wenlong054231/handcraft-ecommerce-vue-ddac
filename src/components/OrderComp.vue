<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'OrderComp',
    props: {
      id: {
        type: String,
        default: '',
      },
    },
  })
</script>

<template>
  <div>
    <p class="mb-6">Order ID: {{ id }}</p>
    <el-timeline>
      <el-timeline-item timestamp="2023/4/12" placement="top">
        <el-card>
          <h4>Start Crafting</h4>
          <p>In Factory 2023/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023/4/3" placement="top">
        <el-card>
          <h4>Start Shipping</h4>
          <p>From Factory 2023/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023/4/2" placement="top">
        <el-card>
          <h4>Received</h4>
          <p>To Address test 2023/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped lang="postcss"></style>
