<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fetchMenuData } from '@/assets/scripts/admin-requests' 
import { MenuItemData } from '@/types/models'
import { Search } from '@element-plus/icons-vue'
import ItemComp from '@/components/ItemComp.vue'
import ItemEditComp from '@/components/ItemEditComp.vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default defineComponent({
  name: 'MenuManage',
  components: { ItemEditComp, ItemComp, Search },
  setup() {
    const pageInfo = ref({
      page: 1,
      size: 10,
      keywords: '',
    })

    const menu = ref([] as MenuItemData[])
    const showAddDialog = ref(false)
    const showEditDialog = ref(false)
    const editItem = ref({} as MenuItemData)
    const fileInputRef = ref<HTMLInputElement | null>(null); // Define the type of fileInputRef

    const fetchMenu = async () => {
      try {
        const response = await fetchMenuData()
        menu.value = response
      } catch (error) {
        console.error('Error fetching menu data:', error)
      }
    }

    const filterStatus = (value: string, row: MenuItemData) => {
      return row.status === value
    }

    const handleEdit = (index: number, row: MenuItemData) => {
      editItem.value = row
      showEditDialog.value = true
    }

    const handleDelete = async (index: number, row: MenuItemData) => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/products/delete/${row.id}`);
        if (response.status === 204) {
          ElMessage.success('Item deleted successfully');
          fetchMenu();
        } else {
          // console.error('Failed to delete item:', response.data.error);
          ElMessage.error('Failed to delete item');
        }
      } catch (error) {
        // console.error('Error deleting item:', error);
        ElMessage.error('An error occurred while deleting the item');
      }
    }

    const addItem = () => {
      editItem.value = {} as MenuItemData
      showAddDialog.value = true
    }

    const selectedFile = ref<File | null>(null); // Declare selectedFile

    const handleSelectedFile = (file: File | null) => {
      selectedFile.value = file;

      console.log(selectedFile.value);
    };
    const submit = async () => {
      try {
        
        const payload = {
          title: editItem.value.title,
          price: editItem.value.price,
          isBestSeller: editItem.value.isBestSeller,
          status: editItem.value.status,
          image: editItem.value.img, // If the image URL is being used, pass it here
        }
        console.log(selectedFile.value);
        
        if (selectedFile.value) {
          const formData = new FormData();
          formData.append('file', selectedFile.value);

          // Upload image to backend
          const response = await axios.post(
            'http://localhost:8080/api/v1/images/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          if (response.status === 200) {
            payload.image = response.data; // Set the image URL to the response data from the backend
          } else {
            console.error('Failed to upload image:', response.data);
            ElMessage.error('Failed to upload image');
            return;
          }
        }

        const response = await axios.post(
          'http://localhost:8080/api/v1/products/add',
          payload
        )

        if (response.status === 201) {
          // Check if the status code is CREATED (201)
          showAddDialog.value = false
          ElMessage.success('Item added successfully')
          fetchMenu()
        } else {
          console.error('Failed to add item:', response.data.error)
          ElMessage.error('Failed to add item')
        }
      } catch (error) {
        console.error('Error adding item:', error)
        ElMessage.error('An error occurred while adding the item')
      }
    }
    
    const edit = async () => {
      try {
        const payload = {
          title: editItem.value.title,
          price: editItem.value.price,
          bestSeller: editItem.value.isBestSeller,
          status: editItem.value.status,
          image: editItem.value.img,
        }

        const response = await axios.put(
          `http://localhost:8080/api/v1/products/update/${editItem.value.id}`, // Add the correct endpoint for updating
          payload
        )
        console.log('Edit Payload:', payload); 
        if (response.status === 200) {
          showEditDialog.value = false
          ElMessage.success('Item updated successfully')
          fetchMenu()
        } else {
          // console.error('Failed to update item:', response.data.error)
          ElMessage.error('Failed to update item')
        }
      } catch (error) {
        // console.error('Error updating item:', error)
        ElMessage.error('An error occurred while updating the item')
      }
    }


    fetchMenu()

    return {
      pageInfo,
      menu,
      showAddDialog,
      showEditDialog,
      editItem,
      fetchMenu,
      filterStatus,
      handleEdit,
      handleDelete,
      addItem,
      submit,
      edit,
      fileInputRef,
      selectedFile,
    }
  },
})
</script>

<template>
  <div>
    <h3>Menu Management</h3>
    <el-divider />
    <div class="flex flex-row mb-6">
      <div class="w-96 mr-3">
        <el-input v-model="pageInfo.keywords">
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
      <el-button @click="fetchMenu">Search</el-button>
      <div class="flex-grow"></div>
      <el-button type="primary" @click="addItem">Add Item</el-button>
    </div>
    <div class="border border-primary-200 p-3 rounded-md">
      <el-table :data="menu" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="img" label="Image" width="180" />
        <el-table-column prop="title" label="Name" width="200" />
        <el-table-column prop="price" label="Price" width="150" />
        <el-table-column prop="isBestSeller" label="BestSeller" width="150">
          <template #default="scope">
            <el-switch v-model="scope.row.isBestSeller" />
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          :filters="[
            { text: 'Available', value: 'Available' },
            { text: 'Sold Out', value: 'Sold Out' },
            { text: 'Disabled', value: 'Disabled' },
          ]"
          :filter-method="filterStatus"
          label="Status"
          width="150">
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Available' ? '' : 'success'" disable-transitions>{{ scope.row.status }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog class="px-10" v-model="showAddDialog" title="Add Item" width="50rem">
      <item-edit-comp :item="editItem" @selected-file="selectedFile = $event"></item-edit-comp>
      <template #footer>
        <span class="dialog-footer"><el-button @click="submit">Submit</el-button></span>
      </template>
    </el-dialog>
    <el-dialog class="px-10" v-model="showEditDialog" title="Edit Item" width="50rem">
      <item-edit-comp :item="editItem" @selected-file="selectedFile = $event"></item-edit-comp>
      <template #footer>
        <span class="dialog-footer"><el-button @click="edit">Submit</el-button></span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="postcss"></style>
