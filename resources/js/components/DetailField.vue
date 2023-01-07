<template>
    <PanelItem :index="index" :field="field" >
        <template #value>
            <div>{{timeArray.humanReadable()}}</div>
        </template>


    </PanelItem>
</template>

<script>
import TimeArray from "../TimeArray";
export default {
  props: ['index', 'resource', 'resourceName', 'resourceId', 'field'],

    data(){
        return {
            timeArray: new TimeArray()
        }
    },
    mounted() {
        this.timeArray.add(this.field.value);
    },
}
</script>
