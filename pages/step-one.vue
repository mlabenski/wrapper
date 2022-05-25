<template>
  <section id="hero">
    <v-parallax dark src="@/assets/img/bgHero.jpg" height="400">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <h1 class="display-2 font-weight-bold mb-4">{{ features[step].title }}</h1>
              <h1 class="font-weight-light">
                {{ features[step].text }}
              </h1>
              <span class="input input--haruki" v-if="step===0">
                <input v-model="hpp_link" placeholder="Enter HPP Link" class="input__field input__field--haruki"/>
              </span>
              <span class="input input--haruki" v-if="step===1">
                <input v-model="store_title" placeholder="Enter store title" class="input__field input__field--haruki"/>
              </span>
              <span class="input input--haruki" v-if="step===2">
                <v-radio-group v-model="store_theme">
                  <v-radio value="standard"  style="padding-top:7px">
                    <template v-slot:label>
                      <div> <strong class="success--text">Standard Display</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="food_order"  style="padding-top:7px">
                    <template v-slot:label>
                      <div> <strong class="primary--text">Online Food Ordering</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="event_ticket" style="padding-top:7px">
                    <template v-slot:label>
                      <div> <strong class="warning--text">Event Tickets</strong></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </span>
              <span class="input input--haruki" v-if="step===3">
                <v-radio-group v-model="input_method"  @change="selectedInput(input_method)">
                  <v-radio value="manual"  style="padding-top:7px">
                    <template v-slot:label>
                      <div> <strong class="success--text">Manual Input</strong></div>
                    </template>
                  </v-radio>
                  <v-radio value="import"  style="padding-top:7px">
                    <template v-slot:label>
                      <div> <strong class="primary--text">Import Woocommerce .CSV</strong></div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </span>
              <p class="font-weight-light" v-if="step===0">https://{{hpp_link}}.securepayments.cardpointe.com/</p>
              <v-btn
                rounded
                v-if="step!==3"
                outlined
                large
                dark
                @click="goNext(step)"
                class="mt-5"
              >
                Go Next
                <v-icon class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn
                v-if="step===3"
                rounded
                outlined
                large
                dark
                @click="completedForm()"
                class="mt-5"
              >
                Go Next
                <v-icon class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>

            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down" v-if="step!==3"></v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down" v-if="step===3 && show_fields === true">
              <h1 class="font-weight-light">
                Required Fields <br>
                <v-chip v-for="(field, index) in required_fields" :key="field.field" class="ma-2" :color="getColor(index)">{{field.field}}</v-chip>
              </h1>
              <h1 class="font-weight-light">
                Optional Fields <br>
                <v-chip v-for="(field, index) in optional_fields"  :key="field.field" class="ma-2" :color="getColor(index)" close @click:close="optional_fields[index].use = false" >{{field.field}}</v-chip>
              </h1>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-parallax>
  </section>
</template>

<script>
export default {
  name: 'step-one',
  data() {
    return {
      dialog: false,
      features: [
        {
          img: require("@/assets/img/icon2.png"),
          title: "Step 1",
          text: "Provide us your unique HPP name",
        },
        {
          img: require("@/assets/img/icon1.png"),
          title: "Step 2",
          text: "What is the name of your store?",
        },
        {
          img: require("@/assets/img/icon3.png"),
          title: "Step 3",
          text: "Choose a theme to match the pathos of your store!.",
        },
        {
          title: "Step 4",
          text: "How would you like to enter your product information?"
        }
      ],
      hpp_link : '',
      linkValid : false,
      title: 'Step 1',
      text: 'Provide us your unique HPP name',
      store_title : '',
      store_theme :'',
      input_method :'',
      show_fields : false,
      required_fields : [{'field':'title', "use": true}, {'field':'price', "use": true}, {'field':'description', "use": true}, {'field':'picture', "use": true},],
      optional_fields : [{'field':'size', "use": true}, {'field':'color', "use": true}, {'field':'category', "use": true}, {'field':'gender', "use": true}, {'field':'extra info', "use": true}],
    };
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.pause();
      }
    },
    linkValid(value) {
      if(value === false){
        this.step = 1
      }
      if(value === true){
        this.step = 2
      }
    },
    step(value){
      if(value === 1){
        this.title = this.features[0].title
        this.text = this.features[0].text
      }
      else if(value === 2){
        this.title = this.features[1].title
        this.text = this.features[1].text
      }
    }
  },
  methods: {
    selectedInput(val) {
      if(val === 'manual') {
        this.show_fields = true
      }
      else if(val === 'import') {
        this.show_fields = false
      }
    },
    getColor (index) {
     if(index === 0) {
       return 'green'
     }
      if(index === 1) {
        return 'orange'
      }
      if(index === 2) {
        return 'red'
      }
      if(index === 3) {
        return 'green'
      }
      if(index === 4) {
        return 'orange'
      }
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
    goNext() {
      if(this.step === 0) {
        this.$store.dispatch('setProducts', this.hpp_link)
      }
      if(this.step === 1){
        this.$store.dispatch('setTitle', this.store_title)
      }
      if(this.step === 2){
        this.$store.dispatch('setTheme', this.store_theme)
      }
      if(this.step === 3){
        // why not filter all the fields and find out which ones are set to false?
        this.$store.dispatch('setDataFields', this.optional_fields)
      }
      if(this.step === 4) {
        this.$router.push('/product-entry')
      }
    },
    setTitle() {
      this.$store.dispatch('setTitle', this.store_title)
    },
    completedForm() {
      this.$store.dispatch('setFormCompleted')
      this.$router.push('/product-entry')
    }
  },
  computed: {
    step() {
      return this.$store.getters.getCurrentStep
    }
  }
};
</script>

<style lang="scss">
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
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2rem;
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
.input--haruki {
  margin: 4em 1em 1em;
}

.input__field--haruki {
  padding: 0.4em 0.25em;
  width: 100%;
  background: transparent;
  color: #FFF;
  font-size: 1.55em;
}

.input__label--haruki {
  position: absolute;
  width: 100%;
  text-align: left;
  pointer-events: none;
}

.input__label-content--haruki {
  transition: transform 0.3s;
}

.input__label--haruki::before,
.input__label--haruki::after {
  content: '';
  position: absolute;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 4px;
  background: #FFF;
  transition: transform 0.3s;
}

.input__label--haruki::before {
  top: 0;
}

.input__label--haruki::after {
  bottom: 0;
}

.input__field--haruki:focus + .input__label--haruki .input__label-content--haruki,
.input--filled .input__label-content--haruki {
  transform: translate3d(0, -90%, 0);
}

.input__field--haruki:focus + .input__label--haruki::before,
.input--filled .input__label--haruki::before {
  transform: translate3d(0, -0.5em, 0);
}

.input__field--haruki:focus + .input__label--haruki::after,
.input--filled .input__label--haruki::after {
  transform: translate3d(0, 0.5em, 0);
}
</style>

<style>
section {
  position: relative;
}
</style>
