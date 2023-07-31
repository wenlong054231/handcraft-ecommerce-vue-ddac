<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElMessage } from 'element-plus'
  import { ArrowLeft } from '@element-plus/icons-vue'
  import { UserDetail } from '@/types/models'
  import background from '@/assets/images/register.jpg'

  export default defineComponent({
    name: 'SignUp',
    computed: {
      ArrowLeft() {
        return ArrowLeft
      },
    },
    data() {
      return {
        userDetail: {} as UserDetail,
        background: background,
      }
    },
    methods: {
      register(): void {
        ElMessage.success({
          message: 'Sign-up Success!',
        })
      },
    },
  })
</script>

<template>
  <div class="page grid grid-cols-2">
    <el-image style="overflow: hidden" :fit="'cover'" alt="background" :src="background" />
    <div class="content">
      <el-page-header :icon="ArrowLeft" @back="$router.push('/login')">
        <template #content>
          <h5 class="uppercase">Sign Up</h5>
        </template>
      </el-page-header>
      <div class="form">
        <el-form :model="userDetail" label-width="10rem" size="large">
          <el-form-item label="Full Name">
            <div class="flex flex-row gap-6">
              <el-input v-model="userDetail.firstName" />
              <el-input v-model="userDetail.lastName" />
            </div>
          </el-form-item>
          <el-form-item label="Username">
            <el-input v-model="userDetail.username" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input type="email" v-model="userDetail.email" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="userDetail.password" />
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input type="password" v-model="userDetail.passwordConfirm" />
          </el-form-item>
          <el-form-item>
            <el-button @click="register">Sign Up</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
  .form {
    @apply mt-12;
    width: 30rem;
  }
  .page {
    height: 100vh;
  }
  .content {
    padding: 6rem;
  }
</style>
