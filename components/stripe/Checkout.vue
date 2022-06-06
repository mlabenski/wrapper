<template>
  <div id='app'>
    <h1>Please give us your payment details:</h1>
    <card class='stripe-card'
      :class='{ complete }'
      stripe='pk_test_51L4FSXA4pxHCRAWExxSd0bOKLxtqTVRjpadp1Nfw0FjDvb7XFXtQ5OXHYwtU9mBohw9IpNqrpu6N4pqQTnicBGUR00uop1F8zW'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <small class="card-error">{{error}}</small>
    <button class='pay-with-stripe' @click='newpay' :disabled='!complete'>Pay with credit card</button>
  </div>
</template>

<script>
import { Card, createToken } from "vue-stripe-elements-plus";
import { mapState } from "vuex"
export default {
    name: 'StripeCheckout',
    components: {
        Card
    },
    data() {
    return {
      complete: false,
      stripeOptions: {
        // you can configure that cc element. I liked the default, but you can
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      stripeEmail: "",
      error: "",
      loading: false
    };
  },
    computed: {
        ...mapState(['cartUIStatus'])
    },

  methods: {
    newPay() {
      createToken().then(data => {
        const stripeData = {data, stripeEmail: this.stripeEmail };
        this.$store.dispatch("postStripeFunction", stripeData);
      })
    }
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