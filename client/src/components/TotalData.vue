<template>
   <div class="p-6">
    <div class="text-slate-300 text-center">
        数据总量
        <span ref="totalCountTarget" class="text-gradient font-[LetsGoDigitalRegular] text-7xl ml-2 mr-2 font-bold">
            678,473,929
        </span>
        条记录
    </div>
    <div class="mt-3 flex flex-wrap">
        <div class="w-1/3 text-center text-slate-400 text-sm">
            华北：
            <span ref="areaRef1" class="font-[LetsGoDigitalRegular] text-[#5DC5EF] text-3xl">
                8,778,988
            </span>
        </div>
        <div class="w-1/3 text-center text-slate-400 text-sm">
            东北：
            <span ref="areaRef2" class="font-[LetsGoDigitalRegular] text-[#5DC5EF] text-3xl">
                8,778,988
            </span>
        </div>
        <div class="w-1/3 text-center text-slate-400 text-sm">
            华东：
            <span ref="areaRef3" class="font-[LetsGoDigitalRegular] text-[#5DC5EF] text-3xl">
                8,778,988
            </span>
        </div>
        <div class="w-1/3 text-center text-slate-400 text-sm">
            中南：
            <span ref="areaRef4" class="font-[LetsGoDigitalRegular] text-[#5DC5EF] text-3xl">
                8,778,988
            </span>
        </div>
        <div class="w-1/3 text-center text-slate-400 text-sm">
            西南：
            <span ref="areaRef5" class="font-[LetsGoDigitalRegular] text-[#5DC5EF] text-3xl">
                8,778,988
            </span>
        </div>
        <div class="w-1/3 text-center text-slate-400 text-sm">
            西北：
            <span ref="areaRef6" class="font-[LetsGoDigitalRegular] text-[#5DC5EF] text-3xl">
                8,778,988
            </span>
        </div>
    </div>
</div>
</template>
<script lang="ts" setup>
import {CountUp} from "countup.js"
import {ref, onMounted} from "vue"
const props = defineProps({
    data:{
        type:Object,
        required:true
    }
})
const totalCountTarget = ref()
const areaRef1 = ref()
const areaRef2 = ref()
const areaRef3 = ref()
const areaRef4 = ref()
const areaRef5 = ref()
const areaRef6 = ref()
onMounted(()=>{
    new CountUp(totalCountTarget.value, props.data.total).start()
    new CountUp(areaRef1.value, props.data.hb).start()
    new CountUp(areaRef2.value, props.data.db).start()
    new CountUp(areaRef3.value, props.data.hd).start()
    new CountUp(areaRef4.value, props.data.hz).start()
    new CountUp(areaRef5.value, props.data.hn).start()
    new CountUp(areaRef6.value, props.data.xn).start()
})
</script>
<style lang="">
    
</style>