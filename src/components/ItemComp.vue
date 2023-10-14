<script lang="ts">
  import { defineComponent } from 'vue'
  import { CartItem } from '@/types/models'

  export default defineComponent({
    name: 'ItemComp',
    props: {
      item: {
        type: Object as () => CartItem,
        default: () => {},
      },
    },
    methods: {
      updateCartItem() {
        this.$store.commit('updateCartItem', this.item)
      },
      getImageUrl(imgName: string): string {
       return `https://web-static-handicraft.s3.amazonaws.com/assets/items/${imgName}`;
    },
    },
  })
</script>

<template>
  <div class="flex place-content-center">
    <div class="content">
      <div class="grid grid-cols-2">
        <el-image style="width: 12rem; height: 12rem" :src="getImageUrl(item.img)"></el-image>
        <div class="flex flex-col gap-3 mt-3">
          <h5>{{ item.title }}</h5>
          <div class="flex flex-row items-center gap-4">
            <el-input-number v-model="item.mount" :min="1" :max="10" @change="updateCartItem"></el-input-number>
            <label>RM {{ item.totalPrice }}</label>
          </div>
          <label>Note</label>
          <el-input type="textarea" v-model="item.note" @change="updateCartItem"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .content {
    width: 100%;
  }
</style>
