<script lang="ts">
  import { defineComponent } from 'vue'
  import cover from '@/assets/images/admin-home.jfif'

  export default defineComponent({
    name: 'Home',
    data() {
      return {
        cover: cover,
      }
    },
  })
</script>

<template>
  <div>
    <h3>Store Information</h3>
    <el-divider />
    <div class="border border-primary-500 rounded-md">
      <div class="grid grid-cols-3">
        <div class="p-6">
          <el-image :src="cover"></el-image>
        </div>
        <div class="col-span-2 p-6">
          <h4>Information</h4>
          <el-divider />
          <el-descriptions :column="2">
            <el-descriptions-item label="Location">Klang</el-descriptions-item>
            <el-descriptions-item label="Operation Time">8:00 to 17:00</el-descriptions-item>
            <el-descriptions-item label="Owner">Test</el-descriptions-item>
            <el-descriptions-item label="Contact">016231090</el-descriptions-item>
            <el-descriptions-item label="Email">handicraft@hand.com</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
