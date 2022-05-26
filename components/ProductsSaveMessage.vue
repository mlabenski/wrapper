<!-- Please remove this file from your project -->
<template>
  <v-alert
    v-if="saveID!==null"
    text
    color="deep-orange"
    icon="mdi-fire"
    prominent
    class="white--text"
    elevation="24"
    dismissible
  >
    <v-row align="center">
      <v-col class="grow">
        <span style="color: white">Your product data has been saved, please write down the number
      <span style="font-size: 18px;">{{ saveID }}</span>.
      You'll need this for when you return.</span>
      </v-col>
      <v-col class="shrink">
        <v-btn style="margin-bottom: 10px; margin-right: 15px;" x-large @click.stop.prevent="copyTestingCode">Copy</v-btn>
      </v-col>
    </v-row>
    <input type="hidden" id="testing-code" :value="saveID">
  </v-alert>
</template>

<script>
export default {
  name: 'ProductsSaveMessage',
  props: {
    saveID: Number
  },
  methods: {
    copyTestingCode () {
      const testingCodeToCopy = document.querySelector('#testing-code')
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        alert('Testing code was copied ' + msg);
      } catch (err) {
        alert('Oops, unable to copy');
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
  }
}
</script>
