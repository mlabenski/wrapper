<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app v-if="step!==4">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-footer :absolute="!fixed" app v-if="step===4" style="height: 125px;">
      <v-container>
        <v-row no-gutters class="mb-8">
          <v-col>
            <input v-model="newInput.name" placeholder="Product name:" type='text' class="form-control" id="name">
          </v-col>
          <v-col>
            <input v-model="newInput.price" placeholder="Price: " type='text' class="form-control" id="price">
          </v-col>
          <v-col>
            <input v-model="newInput.description" placeholder="Description: " type='text' class="form-control" id="description">
          </v-col>
          <v-col>
            <input v-model="newInput.picture" placeholder="Picture URl: " type='text' class="form-control" id="picture">
          </v-col>
          <v-col>
            <input v-model="newInput.size" placeholder="Size: " type='text' class="form-control" id="size">
          </v-col>
          <v-col>
            <input v-model="newInput.color" placeholder="Color: " type='text' class="form-control" id="color">
          </v-col>
          <v-col>
            <input v-model="newInput.category" placeholder="Category: " type='text' class="form-control" id="category">
          </v-col>
          <v-col>
            <input v-model="newInput.gender" placeholder="Gender: " type='text' class="form-control" id="gender">
          </v-col>
        </v-row>
        <v-row  align="center" justify="center">
            <v-btn medium style="padding-bottom: 15px; padding-top: 15px" color="green" @click="addField()">Add Product</v-btn>
          <v-btn  :disabled="disableBtn" medium style="padding-bottom: 15px; padding-top: 15px ; margin-left: 20px" color="purple" @click="exportStore()">Export Store</v-btn>

        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      disableBtn: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ``,
      newInput: {
        name: '',
        price: null,
        description: '',
        picture: '',
        size: '',
        color: '',
        category: '',
        gender: ''
      }
    }
  },
  computed: {
    step() {
      return this.$store.getters.getCurrentStep
    }
  },
  methods: {
    addField() {
      const newEntry = {
        name: this.newInput.name,
        price: this.newInput.price,
        description: this.newInput.description,
        picture: this.newInput.picture,
        size: this.newInput.size,
        color: this.newInput.color,
        category: this.newInput.category,
        gender: this.newInput.gender
      }
      this.$store.dispatch('setUserEnteredData', newEntry)
      this.newInput.name = '';
      this.newInput.price = null;
      this.newInput.description = '';
      this.newInput.picture = '';
      this.newInput.size = '';
      this.newInput.color = '';
      this.newInput.category = '';
      this.newInput.gender = '';
    },
    exportStore() {
      this.disableBtn = true
      this.$store.dispatch('exportData')
    }
  }
}
</script>

<style>
.v-main {
  z-index: 0;
  background-image: url("~@/assets/img/bgMain.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
.form-control {
  color: white;
}
form-control.input{
  color: white;
}
</style>
