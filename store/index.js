export const state = () => ({
  // eslint-disable-next-line object-shorthand
  hppLink: '',
  linkValid: false,
  saveID: null,
  formCompleted: false,
  formData: {hppLink: '', title:'', theme:'', products: []},
  dataFields: {required: ['title', 'price', 'description', 'picture'], optional: ['']},
  userEnteredData: [
    { id:1, name:"Pizza", price: 20, description: 'the finest crust around',picture: 'https://jpg.com/jpg.jpg', size: '[XS,M,L,XL]', color: '[BBQ, Tomato]', category: 'pizza', gender: '[M,F]'},
  ],
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
  setHPPValuee (state, vuexContext, hpp) {
    state.hppLink = `https://${hpp}.securepayments.cardpointe.com/pay?`
    vuexContext.commit('setValid')
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
      state.userEnteredData.push({'id':importedData[key].itemID,'name': importedData[key].name, 'price':importedData[key].price,'description':importedData[key].description, 'picture':importedData[key].picture, 'size':importedData[key].size, 'color': importedData[key].color, 'category': importedData[key].category, 'gender': importedData[key].gender})
    }
    state.userEnteredData = importedData
  }
}

export const actions = {
  setProducts (vuexContext, hpp) {
    vuexContext.commit('setHPPValuee', vuexContext, hpp)
  },
  setTitle (vuexContext, title) {
    vuexContext.commit('setTitle',  title)
  },
  setTheme (vuexContext, template) {
    vuexContext.commit('setTheme',  template)
  },
  setDataFields (vuexContext, optionalFields) {
    vuexContext.commit('setDataFields', optionalFields)
  },
  setUserEnteredData (vuexContext, data) {
    vuexContext.commit('setUserEnteredData', data)
  },
  setFormCompleted(vuexContext) {
    vuexContext.commit('setFormCompleted')
  },
  async exportData(vuexContext) {
    const data = (JSON.stringify(vuexContext.state.userEnteredData))
    await this.$axios.$post(`https://usewrapper.herokuapp.com//wrapper/save`, data)
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
  }
}
