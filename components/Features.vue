<template>
    <v-container fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
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
  </template>
  
  <script>
  export default {
    props: {
      features: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style>
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
  