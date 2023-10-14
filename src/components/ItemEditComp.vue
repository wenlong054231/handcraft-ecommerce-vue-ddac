<template>
  <div class="flex place-content-center">
    <div class="content">
      <div class="grid grid-cols-2">
        <div>
          <input type="file" ref="fileInput" @change="handleImageChange" />
          <!-- Display the current image -->
          <img :src="item.img" alt="Item Image" />
        </div>
        <div>
          <el-form label-width="6rem">
            <el-form-item label="Name">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="Price">
              <el-input v-model="item.price" @input="validatePrice"></el-input>
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

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { MenuItemData } from '@/types/models'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'ItemEditComp',
  props: {
    item: {
      type: Object as PropType<MenuItemData>,
      default: () => ({}),
    },
    fileInputRef: {
      type: Object as PropType<HTMLInputElement | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const itemStatus = [
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
    ];
    const selectedFile = ref<File | null>(null);
    const handleImageChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {          
        emit('selected-file', fileInput.files[0]);
        console.log('fileInputRef in child (handleImageChange):', fileInput.files[0]);
        
      }      
    };

    const emitSelectedFile = () => {
      emit('selected-file', selectedFile.value);
    };
    const validatePrice = () => {
      // Remove non-numeric characters from the input value
      const numericValue = parseFloat(props.item.price.toString().replace(/[^0-9.]/g, ''));
      
      // Check if the numeric value is not NaN
      if (!isNaN(numericValue)) {
        props.item.price = numericValue;
      } else {
        props.item.price = 0; // Set a default value or any other appropriate action
        ElMessage.error('Invalid price. Please enter a valid numeric value.');
      }
    };

    return {
      itemStatus,
      handleImageChange,
      emitSelectedFile,
      validatePrice,
    };
  },
})
</script>

<style scoped lang="postcss">
.content {
  width: 100%;
}
</style>
