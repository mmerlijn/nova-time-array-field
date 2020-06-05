Nova.booting((Vue, router, store) => {
  Vue.component('index-time-array', require('./components/IndexField'))
  Vue.component('detail-time-array', require('./components/DetailField'))
  Vue.component('form-time-array', require('./components/FormField'))
})
