export const state = () => ({
  hppLink: '',
  linkValid: true,
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
  setValid (state)  {
    state.linkValid = true
    console.log(state.linkValid)
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
    console.log(data)
    state.userEnteredData.push(data)
  },
  setFormCompleted(state) {
    state.formCompleted = true
  }
}

export const actions = {
  setProducts (vuexContext, hpp) {
    vuexContext.commit('setHPPValue', vuexContext, hpp)
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
    await this.$axios.$post(`http://192.168.1.215:5000/wrapper/save`, data)
      .then(function (res) {
        console.log(res);
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
  }
}
