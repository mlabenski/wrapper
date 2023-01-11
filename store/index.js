export const state = () => ({
  // eslint-disable-next-line object-shorthand
  hppLink: '',
  linkValid: false,
  saveID: null,
  formCompleted: false,
  storeID: null,
  showInput: false,
  formData: {userID: null, storeID: null, hppName: '', title:'', headerLogo:'',theme:null, dataFields: {}},
  dataFields: {required: ['title', 'price', 'description', 'picture'], optional: ['']},
  userEnteredData: [
    { productID: 10, storeID:1, name:"Pizza", descShort: 'the finest crust around', descLong: 'the finest', visible: 1, stock: 1, price: 20, featuredProduct: 0,categories: 'pizza', image: 'image'},
  ]
})
export const mutations = {
  async setHPPValue (state, vuexContext, hpp) {
    // It's weird to set hppLink to a value as were sending it to the database afterward. 
    // Might want to store {hpp} instead
    // This was a test function to see if the link was valid
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
  setHeaderLogo (state, headerLogo) {
    state.formData.headerLogo = headerLogo
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
    state.userEnteredData.push({'productID': 0, 'storeID' : payload.storeID, 'name': payload.product.name, 'descShort': payload.product.description, 'descLong': payload.product.description, 'visible': payload.product.visible, 'stock': payload.product.stock, 'price': payload.product.price, 'featuredProduct': payload.product.featuredProduct, 'categories': payload.product.categories, 'image': payload.product.image})
    this.$axios.post(`https://usewrapper.herokuapp.com/wrapper/store/save?storeID=${payload.storeID}&name=${payload.product.name}&price=${payload.product.price}&descShort=${payload.product.description}&descLong=${payload.product.description}&image=${payload.product.image}&stock=${payload.product.stock}&visible=${payload.product.visible}&categories=${payload.product.categories}&featuredProduct=${payload.product.featuredProduct}`)
    .then((data) => {
      console.log(data)
    })
  },
  loadProductData(state, data) {
    state.userEnteredData = data
  },
  saveStore(state, userID) {
    // first we need to figure out the appropriate store id
    // this is the part we determine if they have less than 5 stores too
    if( !state.formData.hppName || !state.formData.title || !state.formData.theme || !state.formDate.headerLogo ) {
      return 'there is missing information'
    } else {
      // Can we make a call to a proxy here?
      this.$axios.$post(`https://usewrapper.herokuapp.com/wrapper/user/addStore?userID=${userID}&hppName=${state.formData.hppName}&template=${state.formData.theme}&logo=${state.formData.headerLogo}`)
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
  },
  changeStoreStatus(state, payload) {
    const storeList = state.userEnteredData
    const obj = storeList.find(o => o.storeID === payload.oldStoreID);
    let index = storeList.indexOf(obj);
    state.userEnteredData.fill(obj.status=payload.newStoreID, index, index++)
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
  setHeaderLogo (vuexContext, headerLogo) {
    vuexContext.commit('setHeaderLogo', headerLogo)
  },
  async goLive(vuexContext, storeID) {
    //absolutely needs authentication on this 
    await this.$axios.post(`https://usewrapper.herokuapp.com/wrapper/store/moveData?storeID=${storeID}`)
    .then((response) => {
      const newStoreID = response.data
      vuexContext.dispatch('goLiveStatus', {'oldStoreID': storeID, newStoreID})
    })
    .catch(err => console.log(err))
  },
  goLiveStatus(vuexContext, payload) {
    this.$axios.post(`https://usewrapper.herokuapp.com/wrapper/store/setStatus?oldStoreID=${payload.oldStoreID}&newStoreID=${payload.newStoreID}`).then((response) => {
      vuexContext.commit('changeStoreStatus', payload)
    })
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
  loadProducts(vuexContext, product) {
    vuexContext.commit('loadProducts', product)
  },
  async loadProductData(vuexContext, storeID) {
    const productData = []
    const data = await this.$axios.$get(`https://usewrapper.herokuapp.com/wrapper/store/load/${storeID}`)
    if(data !== 'no data') {
      for (const key in data) {
        productData.push({...data[key]})
      }
        vuexContext.commit('loadProductData', data)
    }
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
    /* i'm gonna try to skip step 4 and go straight from 3 to 5?
    if (state.formCompleted === true) {
      return 5
    } */
    if (state.formData.theme) {
      return 4
    }
    else if (state.formData.headerLogo != '') {
      return 3
    }
    else if (state.formData.title) {
      return 2
    }
    //link is valid once the user has entered a link
    else if(state.linkValid ) {
      return 1
    }
    // once the link is valid, the user can move on to the next step
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
