import Vue from 'vue';
import { StripeCheckout, StripePlugin } from '@vue-stripe/vue-stripe';

export default () => {
  Vue.component('StripeCheckout', StripeCheckout);
  Vue.use(StripePlugin, { pk: process.env.STRIPE_PK });
};