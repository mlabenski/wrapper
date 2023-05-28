<template>
  <div class="grid">
    <div class="grid-item">
      <form @submit.prevent="handleSubmit">
        <textarea
          v-model="inputText"
          rows="6"
          placeholder="Input"
          class="input-area"
        ></textarea>
        <button type="submit" :disabled="!isInputValid">Generate Payment Link</button>
      </form>
    </div>
    <div class="grid-item">
      <textarea
        v-model="outputText"
        rows="6"
        placeholder="Output"
        readonly
        class="input-area"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      inputText: '',
      outputText: '',
      features: [
        {
          img: require("@/assets/img/icon2.png"),
          title: "Step 1",
          text: "Import the products you wish to sell online.",
        },
        {
          img: require("@/assets/img/icon1.png"),
          title: "Step 2",
          text: "Choose between retail, restaurant, or digital shop templates.",
        },
        {
          img: require("@/assets/img/icon3.png"),
          title: "Step 3",
          text: "Provide your shop URL to customers and wait for transactions!.",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    isInputValid() {
      return this.inputText.trim().length > 0;
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
  methods: {
    ...mapActions({
      setUser: 'handleUpdateUser'
    }),
    
    nav() {
      this.$router.push('/step-one')
    },
    ready(event) {
      this.player = event.target;
    },
    playing(event) {
      // The player is playing a video.
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = "another video id";
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
    async generatePaymentLink() {
      try {
        const response = await axios.post('https://genhppurl.mlabenski.repl.co/generate', { input_text: this.inputText });
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
  }
};
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
}
.grid-item {
  width: 100%;
}
.input-area {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  resize: none;
}
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}
.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;
  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }
  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;
      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.btn-play {
  transition: 0.2s;
}
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}
.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}
.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}
.card h1 {
  margin-bottom: 10px;
}
.zoom-efect {
  transform: scale(1.1);
}
.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}
</style>
