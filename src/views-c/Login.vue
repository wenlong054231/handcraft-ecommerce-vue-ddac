<script lang="ts">
  import { defineComponent } from 'vue'
  import { ArrowLeft } from '@element-plus/icons-vue'
  import { login, LoginType } from '@/assets/scripts/user-requests'

  export default defineComponent({
    name: 'Login',
    computed: {
      ArrowLeft() {
        return ArrowLeft
      },
    },
    data: function () {
      return {
        loginForm: {
          username: '',
          password: '',
          loginType: LoginType.customer,
        },
      }
    },
    methods: {
      login(): void {
        login()
        if (this.loginForm.loginType === '1') {
          this.$router.push('/admin/home')
        } else {
          this.$router.push('/home')
        }
      },
    },
  })
</script>

<template>
  <img alt="background" class="welcome-bg" src="@/assets/images/login.webp" />
  <div class="login-container">
    <el-page-header :icon="ArrowLeft" @back="$router.push('/home')">
      <template #content>
        <h5 class="uppercase">Login</h5>
      </template>
    </el-page-header>
    <div class="login-form place-self-center">
      <el-form label-width="4rem">
        <el-form-item label="Username">
          <el-input v-model="loginForm.username" autocomplete="on" type="text" @keyup.enter="login">
            <template #prefix>
              <el-icon class="el-input__icon">
                <font-awesome-icon :icon="['fas', 'user']" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" show-password @keyup.enter="login">
            <template #prefix>
              <el-icon class="el-input__icon">
                <font-awesome-icon :icon="['fas', 'key']" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="loginForm.loginType" class="ml-4">
            <el-radio label="0">customer</el-radio>
            <el-radio label="1">admin</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="text-xl" @click="login">Login</el-button>
          <el-button class="text-xl ml-12" @click="$router.push('/sign-up')">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .welcome-bg {
    position: absolute;
    z-index: -1;
    object-fit: cover;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .login-container {
    background: white;
    position: absolute;
    top: 30%;
    left: 60%;
    @apply shadow-primary-500 shadow-lg;
    @apply rounded-lg p-4;
  }

  .login-form {
    width: 24rem;
    @apply px-12 pt-8;
  }
</style>
