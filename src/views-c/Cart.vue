<script lang='ts'>
  import { defineComponent } from 'vue'
  import { ArrowLeft } from '@element-plus/icons-vue'
  import CartComp from '@/components/CartComp.vue'
  import { CartItem } from '@/types/models'
  import { loadStripe } from '@stripe/stripe-js';
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  
  export default defineComponent({
    name: 'Cart',
    components: { CartComp },
    data() {
      return {
        cartItems: this.$store.getters.getCart as CartItem[]
      }
    },
    methods: {
      async handleCheckout() {
      const stripe = await loadStripe('pk_test_51NdMMcDbO4mCdKWG1syZJEafkTDYdL5ONFD9TMpMUXGEz804Q9APuRAc5IqWZdVgKQSvWxF6iQUPsMCzjGdmMIPZ00aBFJGn6X');

      try {
        // Create a payment session on the server
        const response = await axios.post('http://localhost:8080/api/v1/checkout/create-session', null, {
    params: {
        amount: parseFloat(this.getTotalPrice), // Make sure to call the function to get the total price
    },
});

          
        if (stripe) {
                  
        // Redirect user to Stripe checkout page
        const result = await stripe.redirectToCheckout({
          sessionId: response.data,
        });
        
           if (result.error) {
             // Handle error
             console.error(result.error.message);
           }else{

            const username = sessionStorage.getItem('username') || '';
            const userResponse = await axios.get('http://localhost:8080/api/v1/profile', {
            params: {
              username: username // Pass the retrieved username to the API
            },
          });

          const userFirstName = userResponse.data.firstName;
          const userLastName = userResponse.data.lastName;
          const userId = userResponse.data.id;
          
            const orderResponse = await axios.post('http://localhost:8080/api/v1/orders/create', {
                customerId: userId,
                totalPrice: this.getTotalPrice,
                placedDate: new Date(), 
                completeDate: null,
                status:'Pending',
                customerName:`${userFirstName} ${userLastName}`,
                itemIds: this.cartItems.map(item => item.id),
              });

              ElMessage.success({
                message: 'Sign-up Success!',
              });

           }
        }         
      
      } catch (error) {
        // Handle error
        console.error('Error during checkout:', error);
      }
    },
    },
    computed: {
      ArrowLeft() {
        return ArrowLeft
      },
      getTotalPrice(): string {
        let totalPrice = 0
        for (const item of this.cartItems) {
          totalPrice += parseFloat(item.totalPrice)
        }
        return totalPrice.toFixed(2)
      }

    }
  })
</script>

<template>
  <h3>Cart</h3>
  <el-divider/>
  <div class='grid grid-cols-3'>
    <div class='col-span-2'>
      <el-descriptions class='p-4' direction='vertical' :column='1' border>
        <el-descriptions-item label='Cart Items'>
          <cart-comp class='p-3' :cart-items='cartItems'></cart-comp>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div>
      <el-descriptions class='p-4' direction='vertical' :column='1' border>
        <el-descriptions-item label='Summary'>
          <ul>
            <li v-for='item in cartItems'>
              <div class='flex flex-row gap-3'>
                <p class='flex-grow'>{{ item.title }}</p>
                <p>---</p>
                <p>RM {{ item.totalPrice }}</p>
              </div>
            </li>
            <li>
              <div class='flex flex-row gap-3 pt-2'>
                <p class='flex-grow font-bold'>Total Price</p>
                <p>---</p>
                <p>RM {{ getTotalPrice }}</p>
              </div>
            </li>
          </ul>
        </el-descriptions-item>
      </el-descriptions>
      <el-button class='float-right m-4' type='primary' @click="handleCheckout()">Check Out</el-button>
    </div>
  </div>
</template>

<style scoped lang='postcss'>

</style>