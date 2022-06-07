<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="pk"
      :items="items"
      :successUrl="successUrl"
      :cancelUrl="cancelUrl"
      @loading="v => loading = v"
    />
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
    name: 'StripeCheckout',
    components: {
    },
    data() {
      this.pk = process.env.STRIPE_PK;
    return {
      complete: false,
      stripeOptions: {
        // you can configure that cc element. I liked the default, but you can
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      lineItems: [
        {
          price: 'price_1L51OHA4pxHCRAWEbe60I34U',
          quantity: 1
        }
      ],
      token: null,
      successURL: process.client && `${window.location.origin}${window.location.pathname}?state=success`,
      cancelURL: process.client && `${window.location.origin}${window.location.pathname}?state=error`,
      stripeEmail: "",
      redirectState: '',
      error: "",
      loading: false
    };
  },
    computed: {
    queryState () {
      return process.client && (new URLSearchParams(window.location.search).get('state') || '');
    },
  },
  mounted () {
    if (this.queryState === 'success') {
      this.redirectState = 'success';
    }
    if (this.queryState === 'error') {
      this.redirectState = 'error';
    }
  },
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
    tokenCreated (token) {
      this.token = token;
    },
  }
}
</script>

<style lang="scss" scoped>
input,
button {
  width: 100%;
}
button {
  margin-top: 20px;
}
.payment {
  margin-top: 20px;
}
.stripe-card {
  margin-top: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px 10px;
}
.stripe-card.complete {
  border-color: green;
}
</style> 