<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <client-only>
              <div class="flex justify-center mt-10">
                <template v-if="user">
                  <a
                    href="#"
                    class="button button--primary lg:w-1/2"
                    @click.prevent="onDashboard"
                  >
                    View Dashboard
                  </a>
                  <a
                    href="#"
                    class="button button--primary lg:w-1/2"
                    @click.prevent="onLogout"
                  >
                    Logout
                  </a>
                </template>
                <template v-else>
                  <a
                    href="#"
                    class="button button--primary mr-2 lg:w-1/2 lg:ml-10"
                    @click.prevent="openLogin"
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    class="button button--primary lg:w-1/2 lg:mr-10"
                    @click.prevent="openSignup"
                  >
                    Sign up
                  </a>
                </template>
              </div>
      </client-only>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
              <nuxt-link to="/" class="link mr-2">

              </nuxt-link>
              <nuxt-link to="/dashboard" class="link">

              </nuxt-link>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app v-if="step!==4">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-footer :absolute="!fixed" v-if="showInput" app style="height: 125px;" v-bind:class="{'errors-warning': (errors.length > 0)}">
      <v-container>
        <v-row no-gutters class="mb-8">
          <v-col>
            <input v-model="newInput.name" placeholder="Product name:" type='text' class="form-control" id="name">
          </v-col>
          <v-col>
            <input v-model="newInput.price" placeholder="Price: " type='number' class="form-control" id="price">
          </v-col>
          <v-col>
            <input v-model="newInput.description" placeholder="Description: " type='text' class="form-control" id="description">
          </v-col>
          <v-col>
            <input v-model="newInput.image" placeholder="Picture URl: " type='text' class="form-control" id="image">
          </v-col>
          <v-col>
            <input v-model="newInput.visible" placeholder="Visible: " type='number' class="form-control" id="visible">
          </v-col>
          <v-col>
            <input v-model="newInput.featuredProduct" placeholder="Featured: " type='number' class="form-control" id="featuredProduct">
          </v-col>
          <v-col>
            <input v-model="newInput.category" placeholder="Category: " type='text' class="form-control" id="category">
          </v-col>
          <v-col>
            <input v-model="newInput.stock" placeholder="Stock #: " type='number' class="form-control" id="stock">
          </v-col>
        </v-row>
        <v-row  align="center" justify="center">
            <v-btn medium style="padding-bottom: 15px; padding-top: 15px" color="green" @click="validateInput()">Add Product</v-btn>
          <v-btn  :disabled="disableBtn" medium style="padding-bottom: 15px; padding-top: 15px ; margin-left: 20px" color="purple" @click="exportStore()">Export Store</v-btn>

        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
        image: '',
        category: '',
        visible: null,
        featuredProduct: null,
        stock: null
      },
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    step() {
      return this.$store.getters.getCurrentStep
    },
    showInput() {
      return this.$store.getters.getShowInput
    },
    storeID() {
      return this.$route.query.storeID
    }
  },
  methods: {
    onLogout() {
      this.logout()
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
    ...mapActions({
      openLogin: 'auth/openLogin',
      openSignup: 'auth/openSignup',
      logout: 'auth/logout'
    }),
    onDashboard() {
      this.$router.push('/dashboard')
    },
    validateInput() {
      const newEntry = {
        name: this.newInput.name,
        productID: 0,
        price: this.newInput.price,
        description: this.newInput.description,
        image: this.newInput.image,
        categories: this.newInput.category,
        visible: this.newInput.visible,
        featuredProduct: this.newInput.featuredProduct,
        stock: this.newInput.stock
      }
      if (newEntry.name && newEntry.price && newEntry.description && newEntry.image && newEntry.categories && newEntry.visible && newEntry.featuredProduct && newEntry.stock ) {
        // all the fields are filled out. so lets make sure its the correct value
        if (typeof(newEntry.name) !== 'string' || typeof(newEntry.description) !== 'string' || typeof(newEntry.image) !== 'string' || typeof(newEntry.categories) !== 'string') {
          // not a string
          this.errors.push('Name, description, image, and category must consist of a string')
          return false;
        }
        if (newEntry.name.length < 3) {
          // name isn't longer than 3 characters
          this.errors.push('Name must be more than 3 letters')
          return false;
        }
        if (!(/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(newEntry.image))){
          this.errors.push('Image location must contain jpg, gif, or png for a valid picture')
          return false;
        }
        else {
          if(this.errors.length > 0) {
            alert('there are too many errors!')
            this.errors.splice(0, this.errors.length)
          }
          this.addField(newEntry)
        }
      }
      else {
        this.errors.push('There is a field that is not filled out!')
        return false;
      }
    },
    addField(newEntry) {
        this.$store.dispatch('setProductData', {'product': newEntry, 'storeID': this.storeID})
        // this.$store.dispatch('setUserEnteredData', newEntry)
        this.newInput.name = '';
        this.newInput.price = null;
        this.newInput.description = '';
        this.newInput.image = '';
        this.newInput.category = '';
        this.newInput.featuredProduct= null;
        this.newInput.stock = null;
        this.newInput.visible = '';
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
.errors-warning {
  border-style: solid;
  border-width: 5px;
  border-color: darkred;
}
</style>
