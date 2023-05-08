<template>
  <section id="hero">
    <products-save-message :save-i-d="saveID"></products-save-message>
      <v-row align="center" justify="center"  style="height: 600px" v-if="rows">
            <vue-good-table
              :columns="columns"
              :rows="rows"
              ref="myTable"
              @on-row-click="editProduct"
            >
              <template #table="{ rows }">
                <div class="table-wrap" style="max-height: 400px; overflow-y: auto;">
                  <table>
                    <thead>
                      <tr>
                      <th v-for="column in columns" :key="column.field">
                        {{ column.label }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in rows" :key="row.id">
                        <td>{{ row.name }}</td>
                        <td>{{ row.price }}</td>
                        <td>{{ row.descShort }}</td>
                        <td>{{ row.descLong }}</td>
                        <td>{{ row.image }}</td>
                        <td>{{ row.visible }}</td>
                        <td>{{ row.featuredProduct }}</td>
                        <td>{{ row.stock }}</td>
                        <td>{{ row.categories }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </vue-good-table>
</v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsSaveMessage from '~/components/ProductsSaveMessage.vue'

export default {
  name: 'ProductEntry',
  components: { ProductsSaveMessage },
  data(){
    return {
      valid: true,
      importCodeInput : null,
      rules: [
        value => !!value || 'Required.',
        value => {
        const pattern = /^[0-9]+$/
          return pattern.test(value) || 'Must be numbers'
        }
      ],
      isDisabled: false,
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'price',
          field: 'price',
          type: 'number',
        },
        {
          label: 'Short Desc',
          field: 'descShort'
        },
        {
          label: 'Desc',
          field: 'descLong'
        },
        {
          label: 'image',
          field: 'image',
        },
        {
          label: 'Visible',
          field: 'visible',
        },
        {
          label: 'Featured',
          field: 'featuredProduct',
        },
        {
          label: 'Stock',
          field: 'stock',
        },
        {
          label: 'category',
          field: 'categories',
        }
      ],
    };
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
    await this.$store.dispatch('loadProductData', this.$route.query.storeID);
},
updated() {
  const tableBody = this.$refs.myTable.$el.querySelector(".vgt-wrap");
  if (tableBody) {
    tableBody.style.maxHeight = '400px'; // Adjust the value based on your preferred height
    tableBody.style.overflowY = 'auto';
  }
},
  methods: {
    rowStyleClassFn(row) {
      return 'white'
    },
    exportStore() {
      this.isDisabled = true
      this.$store.dispatch('exportData')
    },
    validate () {
      this.$store.dispatch('importData', this.importCodeInput)
    },
    editProduct(params) {
    const product = params.row;
    this.$store.dispatch('updateNewInput', product);
  },
  },
  computed: {
    rows() {
      return this.$store.getters.getUserEnteredProducts
    },
    saveID() {
      return this.$store.getters.getSaveID
    },
    ...mapGetters({
      user: 'auth/user'
    }),
    storeID() {
      return this.$route.query.storeID
    }
  }
};
</script>

<style lang="scss">

.filter-icons {
  position: fixed;
  left: 80%;
  top: 15%;
  height: 55px;
}
@media screen and (max-width: 1020px) {
  .filter-icons {
    position: fixed;
    left: 35%;
    top: 6%;
    height: 55px;
  }
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
.limited-height-table .vgt-wrap {
  max-height: 769px; /* Adjust the value based on your preferred height */
  overflow-y: auto;
}

section {
  position: relative;
}
</style>
