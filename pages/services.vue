<template>
  <div>
    <v-parallax class="my-5" src="path/to/image.jpg">
      <v-row class="text-center white--text fill-height" style="max-height: 520px;">
        <v-col cols="12">
          <h1 class="display-1 font-weight-bold">Wrapper</h1>
          <p class="font-weight-light font-italic">A company that offers two different services</p>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="700" style="width: 100%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12);" @click="goToUseWrapperPage" :to="{ name: 'use-wrapper' }" :elevation="hovering1 ? 12 : 2" @mouseover="hovering1 = true" @mouseleave="hovering1 = false" v-transition:scale="{ origin: 'center center' }">
          <v-card-title class="text-center">Use Wrapper</v-card-title>
          <v-card-subtitle class="text-center">E-commerce</v-card-subtitle>
          <v-card-text>
            <p>Use Wrapper is a full-service shopping cart solution that makes it easy for businesses to sell their products online. With our user dashboard, you can easily manage your store data and customize the look and feel of your online store. We also provide a dedicated website URL for your customers to purchase products from. With Use Wrapper, you'll have everything you need to succeed in the e-commerce world.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="700" style="width: 100%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12);" @click="goToWrapperForWooPage" :to="{ name: 'wrapper-for-woo' }" :elevation="hovering2 ? 12 : 2" @mouseover="hovering2 = true" @mouseleave="hovering2 = false" v-transition:scale="{ origin: 'center center' }">
          <v-card-title class="text-center">Wrapper for Woo</v-card-title>
          <v-card-subtitle class="text-center">Financial Tech</v-card-subtitle>
          <v-card-text>
            <p>Wrapper for Woo is an extension to the popular WooCommerce plugin for WordPress. It adds an additional payment method to your online store, allowing you to accept payments from additional payment processors. With Wrapper for Woo, you can expand your payment options and provide an even better shopping experience for your customers.
            </p>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  export default {
    name: 'Services',
  
  data() {
    return {
      hovering1: false,
      hovering2: false
    }
  },
  methods: {
    goToUseWrapperPage() {
      this.$router.push({ name: 'use-wrapper' })
    },
    goToWrapperForWooPage() {
      window.location.href = "https://wordpress.org/plugins/wrapper-checkout-for-cardpointe-and-hpp/"
    },
    nav() {
      this.$router.push('/step-one')
    },
  }
}
</script>
  
<style>
  .mx-auto {
    margin: 0 auto;
  }
  .v-card {
    position: relative;
    z-index: 1;
  }
</style>