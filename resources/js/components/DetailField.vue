<template>
    <div class="flex border-b border-40">
        <div class="w-1/4 py-4">
            <h4 class="font-normal text-80">
                {{ field.name }}
            </h4>
        </div>
        <div class="w-3/4 pt-4">
            {{timeArray.humanReadable()}}
        </div>
    </div>
</template>

<script>
    import TimeArray from "../TimeArray";
export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],
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
