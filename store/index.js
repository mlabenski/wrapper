export const state = () => ({
  // eslint-disable-next-line object-shorthand
  hppLink: '',
  linkValid: false,
  saveID: null,
  formCompleted: false,
  storeID: null,
  showInput: false,
  formData: {userID: null, storeID: null, hppName: '', title:'', theme:null, dataFields: {}},
  dataFields: {required: ['title', 'price', 'description', 'picture'], optional: ['']},
  userEnteredData: [
    { id:1, name:"Pizza", price: 20, description: 'the finest crust around',picture: 'https://jpg.com/jpg.jpg', size: '[XS,M,L,XL]', color: '[BBQ, Tomato]', category: 'pizza', gender: '[M,F]'},
  ]
})
export const mutations = {
  async setHPPValue (state, vuexContext, hpp) {
    state.hppLink = `https://${hpp}.securepayments.cardpointe.com/pay?`
    await this.$axios.$get('/api/').then((data) => {
      const checkHTML =  RegExp('\\b'+ 'line-items'+'\\b').test(data)
      if(checkHTML === true){
        vuexContext.commit('setValid')
      }
    })
  },
  setHPPValuee (state, hpp) {
    state.formData.hppName = `https://${hpp}.securepayments.cardpointe.com/pay?`
  },
  setValid (state)  {
    state.linkValid = true
  },
  setTitle (state, title) {
    state.formData.title = title
  },
  setTheme (state, template) {
    state.formData.theme = template
  },
  setDataFields (state, optionalFields) {
    for (const field in optionalFields) {
      state.dataFields.optional.push(optionalFields[field].field)
    }
  },
  setUserEnteredData(state, data) {
    state.userEnteredData.push(data)
  },
  setFormCompleted(state) {
    state.formCompleted = true
  },
  setSaveID(state, id) {
    state.saveID = id
  },
  setImportedData(state, importedData) {
    state.userEnteredData = []
    for (const key in importedData) {
      state.userEnteredData.push({'id':importedData[key].itemID,'storeID': state.storeID,'name': importedData[key].name, 'price':importedData[key].price,'description':importedData[key].description, 'picture':importedData[key].picture, 'size':importedData[key].size, 'color': importedData[key].color, 'category': importedData[key].category, 'gender': importedData[key].gender})
    }
    state.userEnteredData = importedData
  },
  setProductData(state, payload) {
    state.userEnteredData.push({'name': payload.product.name, 'price': payload.product.price, 'description': payload.product.description, 'picture': payload.product.picture, 'size': payload.product.size, 'color': payload.product.color, 'category': payload.product.category, 'gender': payload.product.gender})
    this.$axios.post(`https://usewrapper.herokuapp.com/wrapper/store/save?storeID=${payload.storeID}&name=${payload.product.name}&price=${payload.product.price}&descShort=${payload.product.description}&descLong=${payload.product.description}&image=${payload.product.picture}&stock=1&visible=1&categories=${payload.product.category}&featuredProduct=1`)
    .then((data) => {
      console.log(data)
    })
  },
  loadProductData(state, payload) {
    for(const key in payload) {
      state.userEnteredData.push(...payload[key])
    }
  },
  saveStore(state, userID) {
    // first we need to figure out the appropriate store id
    // this is the part we determine if they have less than 5 stores too
    if( !state.formData.hppName || !state.formData.title || !state.formData.theme ) {
      return 'there is missing information'
    } else {
      this.$axios.$post(`https://usewrapper.herokuapp.com/wrapper/user/addStore?userID=${userID}&hppName=${state.formData.title}&template=${state.formData.theme}&logo=${state.formData.title}`)
      .then((data) => {
        console.log(data)
        console.log(data.storeid)
        state.formData.storeID = data.storeid
      })
    }
  },
  setStoreID(state, storeID) {
    state.storeID = storeID
  },
  setShowInput(state, showInput) {
    state.showInput = showInput
  }
}

export const actions = {
  async setProducts (vuexContext, hpp) {
    await vuexContext.commit('setHPPValuee', hpp)
    vuexContext.commit('setValid')
  },
  setTitle (vuexContext, title) {
    vuexContext.commit('setTitle',  title)
  },
  setTheme (vuexContext, template) {
    if(template === 'standard') {
      vuexContext.commit('setTheme', 1)
    }
    if(template === 'food_order') {
      vuexContext.commit('setTheme', 2)
    }
    if(template === 'event_ticket') {
      vuexContext.commit('setTheme', 3)
    }
  },
  setDataFields (vuexContext, optionalFields) {
    vuexContext.commit('setDataFields', optionalFields)
  },
  setProductData (vuexContext, payload) {
    vuexContext.commit('setProductData', payload)
  },
  setUserEnteredData (vuexContext, data) {
    vuexContext.commit('setUserEnteredData', data)
  },
  setFormCompleted(vuexContext) {
    vuexContext.commit('setFormCompleted')
  },
  saveStore(vuexContext, userID) {
    vuexContext.commit('saveStore', userID)
  },
  setStoreID(vuexContext, storeID) {
    vuexContext.commit('setStoreID', storeID)
  },
  setShowInput(vuexContext, showInput) {
    vuexContext.commit('setShowInput', showInput)
  },
  async loadProductData(vuexContext, storeID) {
    const productData = []
    const products = await this.$axios.get(`https://usewrapper.herokuapp.com/wrapper/store/load/${storeID}`)
    for (const key in products) {
      productData.push({id: key, 'storeID': products[key].storeID, 'name': products[key].name, 'price': products[key].price, 'description':products[key].description, 'image':products[key].image,'size': 'red', 'color': 'red', 'category':products[key].categories, 'gender':'M' })
      }
      vuexContext.commit('loadProductData', productData)
  },
  async exportData(vuexContext) {
    const data = (JSON.stringify(vuexContext.state.userEnteredData))
    await this.$axios.$post(`https://usewrapper.herokuapp.com/wrapper/save`, data)
      .then(function (res) {
        vuexContext.commit('setSaveID', res.saveID)
      })
  },
  async importData(vuexContext, id) {
    await this.$axios.$get(`https://usewrapper.herokuapp.com/wrapper/retrieve/id/${id}`)
      .then(function (res) {
        vuexContext.commit('setImportedData', res)
      })
  }
}

export const getters = {
  getCurrentStep : (state) => {
    if (state.formCompleted === true) {
      return 4
    }
    if (state.formData.theme) {
      return 3
    }
    else if (state.formData.title) {
      return 2
    }
    else if(state.linkValid ) {
      return 1
    }
    else {
      return 0
    }
  },
  getFormData : (state) => {
    return state.formData
  },
  getDataFields : (state) => {
    return state.dataFields
  },
  getUserEnteredProducts: (state) => {
    return state.userEnteredData
  },
  getSaveID: (state) => {
    return state.saveID
  },
  getStoreID: (state) => {
    return state.storeID
  },
  getShowInput: (state) => {
    return state.showInput
  }
}
