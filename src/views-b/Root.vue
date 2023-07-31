<script lang="ts">
  import { defineComponent } from 'vue'
  import FooterComp from '@/components/FooterComp.vue'

  export default defineComponent({
    name: 'Root',
    components: { FooterComp },
  })
</script>

<template>
  <el-menu mode="horizontal" :ellipsis="false" :router="true" menu-trigger="click">
    <el-menu-item index="/admin/home">
      <span
        ><el-icon><img src="@/assets/images/logo.svg" alt="logo" /></el-icon
      ></span>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="/login">
      <span>Log Out</span>
    </el-menu-item>
  </el-menu>

  <div class="page">
    <el-menu class="sidebar" :router="true">
      <el-menu-item index="/admin/home">
        <span>Home</span>
      </el-menu-item>
      <el-menu-item index="/admin/menu">
        <span>Menu Manage</span>
      </el-menu-item>
      <el-menu-item index="/admin/order">
        <span>Order Manage</span>
      </el-menu-item>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  <footer-comp></footer-comp>
</template>

<style scoped lang="postcss">
  .page {
    min-height: 100vh;
    width: 100%;
    @apply flex flex-row;
  }

  .sidebar {
    width: 12rem;
    height: 100vh;
  }

  .content {
    width: 100%;
    @apply p-12 flex place-content-center;
  }

  .content > * {
    width: 70rem;
  }
</style>
