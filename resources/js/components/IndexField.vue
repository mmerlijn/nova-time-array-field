<template>
    <span>{{ field.value }}</span>
</template>

<script>
import TimeArray from "../TimeArray";

export default {
    props: ['resourceName', 'field'],
    data(){
        return {
            timeArray: new TimeArray()
        }
    },
    mounted() {
        this.formatString();
    },
    methods:{
        formatString(){
            this.timeArray.add(this.field.value);
            this.field.value = this.timeArray.humanReadable();
        }
    }
}
</script>
