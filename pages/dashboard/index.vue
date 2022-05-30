<template>
  <section id="hero">
      <v-row align="center" justify="center" style="height: 650px">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <client-only>
              <h1 class="display-2 font-weight-bold mb-4">Welcome back, {{user.username}}</h1>
              </client-only>
              <br />
              <pre>
                {{ user }}
              </pre>
              <h1 class="font-weight-light">
                View your saved stores on the<br />
                right side, or start creating<br />
                a new one.
              </h1>
              <v-btn
                rounded
                outlined
                large
                dark
                @click="nav()"
                class="mt-5"
              >
                Generate One
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn
                rounded
                outlined
                large
                dark
                @click="handlePayment"
                class="mt-5"
              >
                Subscription Deals
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
              <div class="video d-flex align-center py-4">
                <p class="subheading ml-2 mb-0">Welcome back loyal merchant</p>
              </div>
            </v-col>
            <v-col v-if="userStoreData" cols="12" md="6" xl="4" class="hidden-sm-and-down" style="background-color: #283E79;"> 
            <store-list
            :store-data="userStoreData"
            @edit-store="editStore"></store-list>
              
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <v-img src="@/assets/img/borderWaves.svg" />
      </div>
    <v-container fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <!-- <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> -->
            <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  shaped
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-img
                    :src="feature.img"
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 class="font-weight-regular subtitle-1">
                    {{ feature.text }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="svg-border-waves">
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StoreList from '~/components/dashboard/StoreList.vue';

export default {
  name: 'DashboardPage',
  components: { StoreList },
  auth: false,
  data() {
    return {
      dialog: false,
      userStoreData: [],
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
  created() {
    if (process.browser) {
      if(!this.user) {
        this.$router.push('/')
        this.$toast.show(`Sorry! You'll need to be logged in.`)
      }
    }
  },
  async mounted() {
      this.userStoreData = await this.$axios.$get('https://usewrapper.herokuapp.com/wrapper/user/'+this.user.uuid+'/stores/all')
   },
  methods: {
    ...mapActions({
      setUser: 'handleUpdateUser'
    }),
    handlePayment() {

    },
    editStore(storeID) {
      // we should navigate to the edit store feature
      // this is when the product-entry page would appear with those values already loaded
      // So we'll need to run a store call 
    },
    
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
