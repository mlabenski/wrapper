<template>
  <v-row>
    <v-col cols="12" sm="6">
      <div class="suggestions mb-2">
        <v-btn v-for="(suggestion, index) in suggestions" :key="index" class="mr-2 mb-2" small color="primary" @click="addSuggestion(suggestion)">
          {{ suggestion }}
        </v-btn>
      </div>
      <form @submit.prevent="handleSubmit">
        <v-textarea
          label="Input"
          auto-grow
          v-model="typedText"
          outlined
          class="white--text"
        ></v-textarea>
        <v-btn :disabled="!isInputValid" color="primary" class="mt-2" @click="handleSubmit">
          Generate Payment Link
        </v-btn>
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
  },
  computed: {
    isInputValid() {
      return this.typedText.trim().length > 0;
    }
  }
}
</script>
