<template>
  <v-row>
    <v-col cols="12" sm="6">
      <div class="suggestions mb-2">
        <v-chip 
          v-for="(suggestion, index) in suggestions" 
          :key="index" 
          class="mr-2 mb-2" 
          color="primary" 
          text-color="white"
          :disabled="!typedText && suggestion !== 'the website title is'" 
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
                <v-card-title class="headline">Information</v-card-title>
                <v-card-text>
                  <p>This chat expects a sentence describing a payment link you wish to send your customer. Our system will translate the input to a payment URL, the only step left is to message the link to them.</p>
                  <p>While the system is programmed to recognize valid input, an example is: "The website name is DaveNBusters the customer name is John Doe and his customer id is 39991. He is buying the item two hundred tickets package, which costs in total $200, the quantity of this order is 1. He is also buying two skittles family sized for $4.99 each."</p>
                  <p>Expected answer: <a href="https://DaveNBusters.securepayments.cardpointe.com/pay?total=209.98&customerId=39991&billFName=John&billLName=Doe&details=200%20Tickets%20Package%7C1%7C200%3C%3ESkittles%20Family%20Sized%7C2%7C4.99">Example Payment Link</a></p>
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
    </v-col>
    <v-col cols="12" sm="6">
      <v-textarea
        label="Output"
        auto-grow
        v-model="outputText"
        outlined
        readonly
        class="white--text"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      typedText: '',
      outputText: '',
      dialog: false,
      suggestions: [
        'the website title is',
        'the customers name is',
        'the item name is',
        'the price of this item is',
        'the quantity of this item is'
      ]
    }
  },
  methods: {
    async generatePaymentLink() {
      try {
        const response = await axios.post('https://genhppurl.mlabenski.repl.co/generate', { input_text: this.typedText });
        this.outputText = response.data.generated_text;
      } catch (error) {
        console.error('Error generating payment link:', error);
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
      this.typedText = 'The website name is DaveNBusters the customer name is John Doe and his customer id is 39991. He is buying the item two hundred tickets package, which costs in total $200, the quantity of this order is 1. He is also buying two skittles family sized for $4.99 each.';
      this.dialog = false;
    }
  },
  computed: {
    isInputValid() {
      return this.typedText.trim().length > 0;
    }
  }
}
</script>
