<template>
  <v-row>
    <v-col cols="12" sm="6" class="pb-3 pt-6">
      <v-card class="pa-4">
        <div class="suggestions mb-2">
          <v-chip 
            v-for="(suggestion, index) in suggestions" 
            :key="index" 
            class="mr-2 mb-2" 
            color="gold" 
            text-color="black"
            :disabled="!typedText && suggestion !== 'the hpp url is'" 
            @click="addSuggestion(suggestion)"
          >
            {{ suggestion }}
          </v-chip>
        </div>
        <form @submit.prevent="handleSubmit">
          <v-textarea
            label="Input"
            auto-grow
            v-model="typedText"
            outlined
            class="white--text"
          ></v-textarea>
        </form>
          <v-row align="center" class="mt-2">
            <v-col cols="8">
              <v-btn :disabled="!isInputValid" color="primary" class="mr-2" @click="handleSubmit">
                Generate Payment Link
              </v-btn>
              <v-btn icon @click="dialog = true">
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title class="headline">
                  <div class="d-flex align-center">
                    <span>What's this?</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-card-title>
                <v-card-text class="text-body-1">
                  <p class="mb-4">This chat expects a sentence describing a payment link you wish to send your customer. Our system will translate the input to a payment URL, the only step left is to message the link to them.</p>
                  <v-divider></v-divider>
                  <p class="mt-4">While the system is programmed to recognize valid input, an example is: "The HPP URL is DaveNBusters the customer name is John Doe and his customer id is 39991. He is buying the item two hundred tickets package, which costs in total $200, the quantity of this order is 1. He is also buying two skittles family sized for $4.99 each."</p>
                  <p>Expected answer: <a href="https://cpswoo.securepayments.cardpointe.com/pay?total=209.98&customerId=39991&billFName=John&billLName=Doe&details=200%20Tickets%20Package%7C1%7C200%3C%3ESkittles%20Family%20Sized%7C2%7C4.99">Example Payment Link</a></p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="tryPrompt">
                    Try this prompt
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </v-col>
          </v-row>
        
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" class="pt-6">
      <v-card class="pa-4">
        <v-textarea
          label="Output"
          :value="outputText"
          class="copyField"
          readonly
          outlined
          :color="isOutputHovered ? 'blue' : ''"
          @mouseover="isOutputHovered = true"
          @mouseleave="isOutputHovered = false"
          @click="copyAndSaveOutput"
        ></v-textarea>
        <v-divider class="my-3"></v-divider>
      <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold text-h5">Recent Messages</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item v-for="(item, index) in recentMessages" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
    <v-expansion-panel-header class="font-weight-bold text-h5">Premium Features</v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" sm="4">
              <v-checkbox
                v-model="saveInvoiceChecked"
                :disabled="!user"
                class="white--text"
                label="Save Invoice"
                @change="user && $event && saveInvoice()"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox
                v-model="emailInvoiceChecked"
                :disabled="!user"
                class="white--text"
                label="Email Invoice"
                @change="user && $event && emailInvoice()"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox
                v-model="emailInvoiceChecked"
                :disabled="!user"
                class="white--text"
                label="Text Invoice"
                @change="user && $event && textInvoice()"
              ></v-checkbox>
            </v-col>
          </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
  <v-snackbar
        v-model="copiedToClipboard"
        timeout="3000"
        >
          Copied to clipboard
          <v-btn
            color="blue"
            text
            @click="copiedToClipboard = false"
          >
            Close
          </v-btn>
        </v-snackbar>
  </v-col>
    <v-col cols="12" style="padding-top: 19%">
      <GenerateLinkInvoice :user="user"/>
  </v-col>
  <v-col cols="12">
      <Features :features="features" />
  </v-col>
  </v-row>
</template>


<script>
import axios from 'axios'
import { mapGetters } from "vuex";
import Clipboard from 'clipboard';
import Features from "~/components/Features.vue";
import GenerateLinkInvoice from '~/components/GenerateLinkInvoice.vue'; 

export default {
  name: 'GenerateLink',
  head: {
    title: 'Generate with AI',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Generate payment links with AI, just type your sentence and the customers order.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '~/assets/wrapper-logo-small.png' }]
  },
  data() {
    return {
      typedText: '',
      outputText: '',
      dialog: false,
      isAuthenticated: true,
      rateLimiting: false,
      saveInvoiceChecked: false,
      emailInvoiceChecked: false,
      textInvoice: false,
      suggestions: [
        'the hpp url is',
        'the customers name is',
        'the item name is',
        'the price of this item is',
        'the quantity of this item is'
      ],
      isOutputHovered: false,
      copiedToClipboard: false,
      features: [
        {
          img: require("@/assets/img/icon1-gold.png"),
          title: "Saved Responses",
          text: "Recall past notes and future invoice saving.",
        },
        {
          img: require("@/assets/img/icon2-gold.png"),
          title: "Add Preset Items",
          text: "Quick insert the following text. The item is x the price per unit is y the quantity is n",
        },
        {
          img: require("@/assets/img/icon3-gold.png"),
          title: "Settings",
          text: "Settings feature, provide your shop URL to your customers and url customization",
        },
      ],
      recentMessages: []
    }
  },
  mounted() {
    // Implements saving the output messages
    const savedMessages = localStorage.getItem('recentMessages');
    if (savedMessages) {
      this.recentMessages = JSON.parse(savedMessages);
    }
    // Initalize Clipboard
    new Clipboard('.copyField', {
      text: () => this.outputText,
    });
  },
  methods: {
    async generatePaymentLink() {
      try {
        this.rateLimiting = true; // disable the button
        const response = await axios.post('https://genhppurl.mlabenski.repl.co/generate', { input_text: this.typedText });
        this.outputText = response.data.generated_text;
        this.recentMessages.push(this.outputText);
        localStorage.setItem('recentMessages', JSON.stringify(this.recentMessages));
        if (this.saveInvoiceChecked && this.user) {
          const invoiceData = {
            unique_id: this.user.id, // replace this with actual unique id of the user
            customer_id: '123', // replace this with actual customer id
            store_id: '11', // replace this with actual store id
            url: this.outputText,
            data: 'invoice data', // replace this with actual invoice data
            products: 'products', // replace thi  s with actual products
          };

          const invoiceResponse = await axios.post('https://usewrapper.herokuapp.com/invoice', invoiceData);
          console.log(invoiceResponse.data);
        }
        setTimeout(() => {
        this.rateLimiting = false;
      }, 5000);
      } catch (error) {
        console.error('Error generating payment link:', error);
        this.rateLimiting = false;
      }
    },
    handleSubmit() {
      if (this.isInputValid) {
        console.log('sending event');
        this.generatePaymentLink();
      }
    },
    emailInvoice() {
      this.$toast.show('Feature isnt implemented yet')
    },
    textInvoice() {
      this.$toast.show('Feature isnt implemented yet')
    },
    async saveInvoice() {
      try {
        if(this.outputText && this.user) {
          console.log('saving invoice:');
          const maxNumber = 999;
          const randomId = Math.floor(Math.random() * maxNumber).toString();
          const invoiceData = {
            unique_id: randomId, // replace this with actual unique id of the user
            customer_id: 123, // replace this with actual customer id
            store_id: 11, // replace this with actual store id
            url: this.outputText,
            data: this.user.id, // replace this with actual invoice data
            products: 'products', // replace this with actual products
          };
  
          const response = await axios.post('https://usewrapper.herokuapp.com/invoice', invoiceData);
          console.log(response.data);
          this.$toast.show('Invoice saved successfully');
        }
      } catch (error) {
        console.error('Error saving invoice:', error);
        this.$toast.show('Error saving invoice');
      }
    },
    addSuggestion(suggestion) {
      this.typedText += ` ${suggestion} `;
    },
    tryPrompt() {
      this.typedText = 'The hpp URL is DaveNBusters the customer name is John Doe and his customer id is 39991. He is buying the item two hundred tickets package, which costs in total $200, the quantity of this order is 1. He is also buying two skittles family sized for $4.99 each.';
      this.dialog = false;
    },
    copyAndSaveOutput() {
      this.copiedToClipboard = true;
    }
  },
  computed: {
    isInputValid() {
    return this.typedText.trim().length > 0 && !this.rateLimiting;
  },
  ...mapGetters({
      user: 'auth/user'
    }),
  }
}
</script>
