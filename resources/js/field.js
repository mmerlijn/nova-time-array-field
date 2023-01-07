import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-nova-time-array-field', IndexField)
  app.component('detail-nova-time-array-field', DetailField)
  app.component('form-nova-time-array-field', FormField)
})
