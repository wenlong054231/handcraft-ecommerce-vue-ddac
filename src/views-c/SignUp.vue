<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElMessage } from 'element-plus'
  import { ArrowLeft } from '@element-plus/icons-vue'
  import { UserDetail } from '@/types/models'
  import background from '@/assets/images/register.jpg'
  import axios from 'axios'
  import { AxiosError } from 'axios';
  
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
        const validationErrors = [
          this.validateName(),
          this.validateUsername(),
          this.validateEmail(),
          this.validatePassword(),
          this.validateConfirmPassword(),
        ];

        // Check if there are any validation errors
        const hasErrors = validationErrors.some((error) => !!error);

        if (!hasErrors) {
          // All fields are valid, proceed to saveData
          this.saveData();
        } else {
          // Join all the error messages and show an error message
          const errorMessage = validationErrors.filter((error) => !!error).join(' ');
          ElMessage.error(errorMessage || 'Please fill in all fields correctly.');
        }
      },
        async saveData() {
          try {
            const response = await axios.post('http://localhost:8080/api/v1/user/save', this.userDetail, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // console.log('userDetail:', this.userDetail);
            // console.log('response:', response.data);
            if (response.data.success) {
              // Handle successful response here, you can also show a success message
              ElMessage.success({
                message: 'Sign-up Success!',
              });
            } else {
              // Handle unsuccessful response here, show an error message
              ElMessage.error({
                message: response.data.message,
              });
              
            }
          } catch (error) {
            const axiosError = error as AxiosError;
            // Handle any error that occurs during the API request
            if (axiosError.response && axiosError.response.status === 409) {
              // Special handling for Conflict status (Username already exists)
              ElMessage.warning({
                message:  'Username or email already exists.',
              });
            } else {
              // General error handling
              ElMessage.error({
                message: 'Error occurred while signing up.',
              });
            }
          }
        },
      validateName(): string | undefined {
        if (!this.userDetail.firstname || !this.userDetail.lastname) {
          return 'Please provide both first and last name.';
        }
        return undefined;
      },

      validateUsername(): string | undefined {
        if (!this.userDetail.username) {
          return 'Please enter a username.';
        }
        return undefined;
      },

      validateEmail(): string | undefined {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.userDetail.email || !emailRegex.test(this.userDetail.email)) {
          return 'Please enter a valid email address.';
        }
        return undefined;
      },

      validatePassword(): string | undefined {
        if (!this.userDetail.password || this.userDetail.password.length < 6) {
          return 'Password must be at least 6 characters long.';
        }
        return undefined;
      },

      validateConfirmPassword(): string | undefined {
        if (this.userDetail.password !== this.userDetail.passwordConfirm) {
          return 'Passwords do not match.';
        }
        return undefined;
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
          <el-form-item label="Full Name" :error="validateName()">
            <div class="flex flex-row gap-6">
              <el-input v-model="userDetail.firstname" />
              <el-input v-model="userDetail.lastname" />
            </div>
          </el-form-item>
          <el-form-item label="Username" :error="validateUsername()">
            <el-input v-model="userDetail.username" />
          </el-form-item>
          <el-form-item label="Email" :error="validateEmail()">
            <el-input type="email" v-model="userDetail.email" />
          </el-form-item>
          <el-form-item label="Password" :error="validatePassword()">
            <el-input type="password" v-model="userDetail.password" />
          </el-form-item>
          <el-form-item label="Confirm Password" :error="validateConfirmPassword()">
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
