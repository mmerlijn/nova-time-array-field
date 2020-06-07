<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">

                <input class="form-control form-input form-input-bordered" type="text" v-model="van" ref="van" placeholder="08:00"
                       @change="van=toTime(van)" tabindex="1"></input>


                <input class="form-control form-input form-input-bordered" type="text" v-model="tot" placeholder="17:00"
                       @change="tot=toTime(tot)" tabindex="2"></input>
            <button class="bg-primary hover:bg-primary-dark font-bold text-white p-2 rounded focus:shadow-outline" @click.prevent="add" tabindex="3"> + </button>
            <button class="bg-primary hover:bg-primary-dark font-bold text-white p-2 rounded focus:shadow-outline" @click.prevent="sub" tabindex="4"> - </button>
            <button class="bg-primary hover:bg-primary-dark font-bold text-white p-2 rounded focus:shadow-outline" @click.prevent="day" tabindex="5">Hele dag</button>
            <button class="bg-primary hover:bg-primary-dark font-bold text-white p-2 rounded focus:shadow-outline" @click.prevent="trash" tabindex="6">Wis</button>
            <p class="p-4">Op tijden: {{timeArray.humanReadable()}}</p>
        </template>
    </default-field>
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
        min: {
            handler: function (val, oldVal) {
                this.countFactor();
            },
            deep: true
        },
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
            //this.value = this.timeArray.array;
        },

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, JSON.stringify(this.value || []))
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value
        },
    },
}
</script>
