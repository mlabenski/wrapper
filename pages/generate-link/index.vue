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
          <v-card class="mt-4 pa-4" color="light-grey darken-1">
            <div class="body-2 white--text mt-2">Sign In to unlock these features:</div>
            <v-row>
              <v-col cols="12" sm="4">
                <v-checkbox
                  :disabled="!isAuthenticated"
                  class="white--text"
                  label="Save Invoice"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4">
                <v-checkbox
                  :disabled="!isAuthenticated"
                  class="white--text"
                  label="Email Invoice"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4">
                <v-checkbox
                  :disabled="!isAuthenticated"
                  class="white--text"
                  label="Text Invoice"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card>
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
        </form>
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
    <h2 class="text-h6">Recent Messages</h2>
    <v-list dense>
      <v-list-item v-for="(item, index) in recentMessages" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
  created() {
    if (process.browser) {
      if(!this.user) {
        this.$router.push('/')
        this.$toast.show(`Sorry! You'll need to be logged in.`)
      }
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
