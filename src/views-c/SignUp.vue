<script lang='ts'>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SignUp',
    data() {
      return {
        userDetail: {} as UserDetail
      }
    }
  })
</script>

<template>
  <div class='page'>

    <div class='content'>
      <router-link to='/home'>Back</router-link>
      <div class='border border-neutral-600 border-opacity-60 rounded-lg p-4 grid grid-cols-2'>
        <div class='cover'>
          <img src='' alt='Cover'>
        </div>
        <div>
          <h5>Sign Up</h5>
          <el-form :model='userDetail' label-width='10rem'>
            <el-form-item label='First Name'>
              <el-input v-model='userDetail.firstName' />
            </el-form-item>
            <el-form-item label='Last Name'>
              <el-input v-model='userDetail.lastName' />
            </el-form-item>
            <el-form-item label='Username'>
              <el-input v-model='userDetail.username' />
            </el-form-item>
            <el-form-item label='Email'>
              <el-input type='email' v-model='userDetail.email' />
            </el-form-item>
            <el-form-item label='Password'>
              <el-input type='password' v-model='userDetail.password' />
            </el-form-item>
            <el-form-item label='Confirm Password'>
              <el-input type='password' v-model='userDetail.passwordConfirm' />
            </el-form-item>
            <el-button>Sign Up</el-button>
          </el-form>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped lang='postcss'>
  .content {
    width: 60rem;
    margin-top: 12rem;
  }

  .page {
    height: 100vh;
    width: 100%;
    display: flex;
    place-content: center;
  }
</style>