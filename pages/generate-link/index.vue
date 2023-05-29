<template>
  <v-row>
    <v-col cols="12" sm="6" class="pb-3">
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
    <v-col cols="12" sm="6">
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
          @click="copiedToClipboard = true"
        ></v-textarea>
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
      </v-card>
    </v-col>
    <v-col cols="12">
      <Features :features="features" />
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios'
import Clipboard from 'clipboard';
import Features from "~/components/Features.vue";

export default {
  data() {
    return {
      typedText: '',
      outputText: '',
      dialog: false,
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
    }
  },
  mounted() {
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
    }
  },
  computed: {
    isInputValid() {
    return this.typedText.trim().length > 0 && !this.rateLimiting;
  }
  }
}
</script>
