<template>
    <v-data-table
      :headers="headers"
      :items="invoices"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "GenerateLinkInvoice",
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
        headers: [
          { text: 'Unique ID', value: 'unique_id' },
          { text: 'Customer ID', value: 'customer_id' },
          { text: 'Store ID', value: 'store_id' },
          { text: 'URL', value: 'url' },
          { text: 'Invoice Data', value: 'data' },
          { text: 'Products', value: 'products' },
          { text: 'Paid', value: 'paid' },
          { text: 'Actions', value: 'action', sortable: false }
        ],
        invoices: [],
      }
    },
    async created() {
        try {
            const response = await axios.get(`https://usewrapper.herokuapp.com/invoices?user_id=${this.user.id}`); // Adjust this URL to match your API
            this.invoices = response.data;
        } catch (error) {
            console.error('Error retrieving invoices:', error);
        }
    },
    methods: {
      async deleteItem(item) {
        try {
          await axios.delete(`https://usewrapper.herokuapp.com/invoice/${item.unique_id}`); // Adjust this URL to match your API
          this.invoices = this.invoices.filter(i => i.unique_id !== item.unique_id);
        } catch (error) {
          console.error('Error deleting invoice:', error);
        }
      },
    }
  }
  </script>
  