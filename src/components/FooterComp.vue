<script lang='ts'>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'FooterComp'
  })
</script>

<template>
<footer>
  <p>@Group A</p>
</footer>
</template>

<style scoped lang='postcss'>
footer{
  background: #278f5f ;
  color: white;
  height: 2rem;
  width: 100%;
  @apply p-1
}
</style>