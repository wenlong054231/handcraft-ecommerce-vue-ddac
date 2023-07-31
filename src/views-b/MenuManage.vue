<script lang="ts">
  import { defineComponent } from 'vue'
  import { MenuItemData } from '@/types/models'
  import { fetchMenuData } from '@/assets/scripts/admin-requests'
  import { Search } from '@element-plus/icons-vue'
  import ItemComp from '@/components/ItemComp.vue'
  import ItemEditComp from '@/components/ItemEditComp.vue'
  import { ElMessage } from 'element-plus'

  export default defineComponent({
    name: 'MenuManage',
    components: { ItemEditComp, ItemComp, Search },
    data() {
      return {
        pageInfo: {
          page: 1,
          size: 10,
          keywords: '',
        },
        menu: [] as MenuItemData[],
        showAddDialog: false,
        showEditDialog: false,
        editItem: {} as MenuItemData,
      }
    },
    methods: {
      fetchMenu() {
        this.menu = fetchMenuData()
      },
      filterStatus(value: string, row: MenuItemData) {
        return row.status === value
      },
      handleEdit(index: number, row: MenuItemData) {
        this.editItem = row
        this.showEditDialog = true
      },
      handleDelete(index: number, row: MenuItemData) {
        ElMessage.warning('Item Deleted: ' + JSON.stringify(row))
      },
      addItem() {
        this.editItem = {} as MenuItemData
        this.showAddDialog = true
      },
      submit() {},
    },
    mounted() {
      this.fetchMenu()
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
      <item-edit-comp :item="editItem"></item-edit-comp>
      <template #footer>
        <span class="dialog-footer"><el-button @click="submit">Submit</el-button></span>
      </template>
    </el-dialog>
    <el-dialog class="px-10" v-model="showEditDialog" title="Edit Item" width="50rem">
      <item-edit-comp :item="editItem"></item-edit-comp>
      <template #footer>
        <span class="dialog-footer"><el-button @click="submit">Submit</el-button></span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="postcss"></style>
