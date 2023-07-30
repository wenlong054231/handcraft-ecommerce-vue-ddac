<script lang='ts'>
  import { defineComponent } from 'vue'
  import FooterComp from '@/components/FooterComp.vue'

  export default defineComponent({
    name: 'Root',
    components: { FooterComp }
  })
</script>

<template>
  <header>
    <div class='header-left'>
      <nav><p>Home</p></nav>
      <nav><p>Old History</p></nav>
    </div>
    <div class='header-right'>
      <nav><p>Cart</p></nav>
      <nav><p>Welcome Back</p></nav>
      <el-button type='danger'>Log Out</el-button>
    </div>
  </header>
  <div class='page'>
    <router-view></router-view>
  </div>
  <footer-comp></footer-comp>
</template>

<style scoped lang='postcss'>
  header {
    position: relative;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    background: #e8eaed;
    box-shadow: 1px 1px 5px 1px rgba(128, 128, 128, 0.4);
    @apply flex flex-row
  }

  .header-left {
    padding-left: 3rem;
    @apply flex flex-row gap-3 grow place-items-center;
  }

  .header-right {
    padding-right: 3rem;
    @apply flex flex-row gap-3 place-items-center;
  }

  nav {
    cursor: pointer;
    padding-left: 5px;
    padding-right: 5px;
    transition: all 0.3s;
  }

  nav:hover{
    @apply text-red-600;
  }

  .page{
    min-height: 100vh;
  }
</style>