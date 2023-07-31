<script lang='ts'>
  import { defineComponent } from 'vue'
  import { Profile } from '@/types/models'

  export default defineComponent({
    name: 'Profile',
    data() {
      return {
        profile: this.$store.getters.getProfile as Profile
      }
    }
  })
</script>

<template>
  <h3>Profile</h3>
  <el-divider />
  <div class='border border-primary-500 rounded-md mx-32 p-12'>
    <div class='grid grid-cols-3'>
      <el-avatar :src='profile.avatar' size='large'></el-avatar>
      <div class='col-span-2'>
        <h4>Information</h4>
        <el-divider />
        <el-descriptions :column='2'>
          <el-descriptions-item label='Username'>{{ profile.username }}</el-descriptions-item>
          <el-descriptions-item label='Email'>{{ profile.email }}</el-descriptions-item>
          <el-descriptions-item :span='2' label='Mobile'>{{ profile.mobile }}</el-descriptions-item>
          <el-descriptions-item label='Address'>{{ profile.address }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<style scoped lang='postcss'>

</style>