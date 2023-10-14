<script lang='ts'>
  import { Profile } from '@/types/models'
  import { defineComponent, onMounted, ref } from 'vue'
  import axios from 'axios'

  export default defineComponent({
    name: 'Profile',
    setup() {
      const profile = ref<Profile>({
        id: '',
        username: '',
        email: '',
        avatar: '',
        mobile: '',
        address: ''
      })

      const fetchProfile = async () => {
        try {

          
          // Retrieve the username from session storage or wherever it is stored
          const username = sessionStorage.getItem('username') || ''; // Modify this line

          if (username.trim() !== '') {
            // Username is not empty
            console.log('Username is not empty:', username);
          } else {
            // Username is empty
            console.log('Username is empty');
          }
          const response = await axios.get('http://localhost:8080/api/v1/profile', {
            params: {
              username: username // Pass the retrieved username to the API
            }
          })

          if (response.data) {
            profile.value = response.data
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }

      onMounted(() => {
        fetchProfile()
      })

      return {
        profile
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