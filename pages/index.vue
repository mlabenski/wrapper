<template>
  <section id="hero">
      <v-row align="center" justify="center" style="height: 650px">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <h1 class="font-weight-light">
                A Quick solution to generate a<br />
                shopping cart. Without hosting<br />
                expenses, maintenance, or vulnerabilties!
              </h1>
              <client-only>
                <v-btn
                v-if="user"
                rounded
                large
                class="mt-5"
                @click="nav"
              >
                Build a Shop
                <v-icon class="ml-2">mdi-chart-box</v-icon>
              </v-btn>
              <v-btn
                rounded
                white
                large
                class="mt-5"
                @click.prevent="openSignup"
              >
                Use Wrapper
                <v-icon class="ml-2">mdi-chart-box</v-icon>
              </v-btn>
              <v-btn
                rounded
                large
                class="mt-5 v-btn-two"
                @click.prevent="openSignup"
              >
                WooCommerce
                <v-icon class="ml-2">mdi-sitemap</v-icon>
              </v-btn>
              </client-only>
              <div class="video d-flex align-center py-4">
                <a class="playBut" @click.stop="dialog = true">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px"
                    y="0px"
                    width="60px"
                    height="60px"
                    viewBox="0 0 213.7 213.7"
                    enable-background="new 0 0 213.7 213.7"
                    xml:space="preserve"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xsi:schemaLocation="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/ ">
                    <polygon
                      id="XMLID_18_"
                      class="triangle"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      points="73.5,62.5 148.5,105.8 73.5,149.1 "
                    />

                    <circle
                      id="XMLID_17_"
                      class="circle"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      cx="106.8"
                      cy="106.8"
                      r="103.3"
                    />
                  </svg>
                </a>
                <p class="subheading ml-2 mb-0">Sign up</p>
              </div>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/img/borderWaves.svg" />
      </div>
    <v-container id="features" fluid class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <!-- <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> -->
            <Features :features="features" />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="svg-border-waves">
      <img src="~@/assets/img/wave2.svg" />
      <nuxt-link to="/product-entry" class="button--green">
        Protected Page
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Features from "~/components/Features.vue";

export default {
  name: 'IndexPage',
  name: 'HomePage',
  head: {
    title: 'Wrapper Landing page',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Landing page to generate payment links to the top processors, including CardPointe HPP.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '../assets/wrapper-logo-small.png' }]
  },
  components: {
    Features,
  },
  data() {
    return {
      currentUser: null,
      // eslint-disable-next-line object-shorthand
      dialog: false,
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
    })
  },
  methods: {
    ...mapActions({
      openLogin: 'auth/openLogin',
      openSignup: 'auth/openSignup',
      logout: 'auth/logout'
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
  },
}
</script>

<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}
v-btn {
  color: black !important;
  background-color: white !important;
  &:hover {
    background-color: grey !important;
    color: white !important;
  }
}
.v-btn-two {
  color: black !important;
  background-color: rgba(255, 255, 255, 0.603) !important;
  &:hover {
    background-color: grey !important;
    color: white !important;
  }
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
