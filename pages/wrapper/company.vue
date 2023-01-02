<template>
<div>
    <v-parallax class="my-5" src="@/assets/material-parallex.jpg">
    <v-row class="text-center white--text fill-height">
        <v-col cols="12">
        <h1 class="display-1 font-weight-bold">Wrapper</h1>
        <p class="font-weight-light font-italic">A company that offers two different services</p>
        </v-col>
    </v-row>
    </v-parallax>
    <v-row>
    <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="700" style="width: 100%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12);">
        <v-card-title>Use Wrapper</v-card-title>
        <v-card-subtitle>E-commerce</v-card-subtitle>
        <v-card-text>
            Description of Use Wrapper goes here.
        </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="700" style="width: 100%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.12);">
        <v-card-title>Wrapper for Woo</v-card-title>
        <v-card-subtitle>Financial Tech</v-card-subtitle>
        <v-card-text>
            Description of Wrapper for Woo goes here.
        </v-card-text>
        </v-card>
    </v-col>
    </v-row>
</div>
</template>
<script>
  export default {
    name: 'Company'
  }
</script>
  
<style>
  .mx-auto {
    margin: 0 auto;
  }
  .v-card {
    position: relative;
    z-index: 1;
  }
</style>