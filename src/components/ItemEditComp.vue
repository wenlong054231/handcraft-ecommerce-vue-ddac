<script lang="ts">
  import { defineComponent } from 'vue'
  import { MenuItemData } from '@/types/models'

  export default defineComponent({
    name: 'ItemEditComp',
    data() {
      return {
        itemStatus: [
          {
            value: 'Available',
            label: 'Available',
          },
          {
            value: 'Sold Out',
            label: 'Sold Out',
          },
          {
            value: 'Disabled',
            label: 'Disabled',
          },
        ],
      }
    },
    props: {
      item: {
        type: Object as () => MenuItemData,
        default: () => {},
      },
    },
  })
</script>

<template>
  <div class="flex place-content-center">
    <div class="content">
      <div class="grid grid-cols-2">
        <div>
          <input type="file" :src="item.img" />
        </div>
        <div>
          <el-form label-width="6rem">
            <el-form-item label="Name">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="Price">
              <el-input v-model="item.price"></el-input>
            </el-form-item>
            <el-form-item label="Best Seller">
              <el-switch v-model="item.isBestSeller"></el-switch>
            </el-form-item>
            <el-form-item label="Status">
              <el-select v-model="item.status">
                <el-option v-for="item in itemStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
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
