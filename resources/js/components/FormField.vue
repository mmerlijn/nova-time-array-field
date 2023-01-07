<template>
  <DefaultField
    :field="field"
    :errors="errors"
    :show-help-text="showHelpText"
    :full-width-content="fullWidthContent"
  >
    <template #field>
        <div class="flex gap-2">
        <input class="form-control form-input form-input-bordered w-20" type="text" v-model="van" ref="van" placeholder="08:00"
               @change="van=toTime(van)" tabindex="1"/>


        <input class="form-control form-input form-input-bordered w-20" type="text" v-model="tot" placeholder="17:00"
               @change="tot=toTime(tot)" tabindex="2"/>
            <button type="button" class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900" @click.prevent="add" tabindex="3">&nbsp;+&nbsp;</button>
            <button type="button" class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900" @click.prevent="sub" tabindex="4">&nbsp;-&nbsp;</button>
            <button type="button" class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900" @click.prevent="day" tabindex="5">&nbsp;Hele dag&nbsp;</button>
            <button type="button" class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900" @click.prevent="trash" tabindex="6">&nbsp;Wis&nbsp;</button>
        </div>
        <p class="p-4">Op tijden: {{timeArray.humanReadable()}}</p>
    </template>
  </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'
import TimeArray from "../TimeArray"

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ['resourceName', 'resourceId', 'field'],
    data(){
        return {
            van:'',
            tot:'',
            timeArray: new TimeArray(),
        }
    },
    watch:{
        timeArray:{
            handler: function (val,oldVal) {
                this.value = this.timeArray.array;
            },
            deep: true
        }
    },


  methods: {
      toTime(value) {
          value = value.replace(/^[0]?/, '');
          if (value.split(':').length === 1) {
              if (value.length === 4) {
                  return value.substring(0, 2) + ':' + value.substring(2, 4);
              } else if (value.length === 3) {
                  return value.substring(0, 1) + ':' + value.substring(1, 3);
              } else if (value.length === 2 || value.length === 1) {
                  return value + ':00';
              }
          }
          return value;
      },
      time2int(val){
          return  parseInt(val.split(':')[0])*60+parseInt(val.split(':')[1]);
      },
      trash(){
          this.value=[];
          this.timeArray.array=[];
      },
      day(){
          this.timeArray.add([0,1439]);
          this.van='';
          this.tot='';
          this.$refs.van.focus();
      },
      add(){
          this.timeArray.add([this.time2int(this.van),this.time2int(this.tot)]);
          //this.value = this.timeArray.array;
          this.van='';
          this.tot='';
          this.$refs.van.focus();
      },
      sub(){
          this.timeArray.sub([this.time2int(this.van),this.time2int(this.tot)]);
          //this.value = this.timeArray.array;
          this.van='';
          this.tot='';
          this.$refs.van.focus();
      },





    /*
     * Set the initial, internal value for the field.
     */
    setInitialValue() {
        this.timeArray.add(this.field.value || []);
        //this.value = this.field.value || ''
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      //formData.append(this.field.attribute, this.value || '')
      formData.append(this.field.attribute, JSON.stringify(this.value || []))
    },
  },
}
</script>
