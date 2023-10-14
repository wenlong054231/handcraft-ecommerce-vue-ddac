<script lang="ts">
import { defineComponent } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CartItem } from '@/types/models';

export default defineComponent({
  name: 'Cart',
  components: {},
  data() {
    return {
      cartItems: this.$store.getters.getCart as CartItem[],
    };
  },
  methods: {
    
  },
  computed: {
    // ... your computed properties
  },
});
</script>
