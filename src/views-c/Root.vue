<script lang="ts">
  import { defineComponent } from 'vue'
  import FooterComp from '@/components/FooterComp.vue'

  export default defineComponent({
    name: 'Root',
    components: { FooterComp },
    methods: {
      logout(): void {
        this.$router.push('/login')
      },
    },
  })
</script>

<template>
  <el-menu mode="horizontal" :ellipsis="false" :router="true" menu-trigger="click">
    <el-menu-item index="/home">
      <span
        ><el-icon><img src="../assets/images/logo.svg" alt="logo" /></el-icon>Home</span
      >
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="/cart">
      <span>Cart</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>Menu</template>
      <el-menu-item index="/history">
        <span>Order History</span>
      </el-menu-item>
      <el-menu-item index="/profile">
        <span>Profile</span>
      </el-menu-item>
      <el-menu-item index="/login">
        <span>Log Out</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <div class="page">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  <footer-comp></footer-comp>
</template>

<style scoped lang="postcss">
  .page {
    min-height: 100vh;
    @apply flex place-content-center;
  }

  .content {
    width: 60rem;
    @apply pt-20;
  }
</style>
