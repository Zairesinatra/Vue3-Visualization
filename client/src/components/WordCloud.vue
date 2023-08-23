<template>
    <div>
        <div> Tag Cloud </div>
        <div ref="echartsRef" class="w-full h-full"></div>
    </div>
</template>
<script lang="ts" setup>
import {ref, onMounted,watch} from "vue"
import * as echarts from "echarts"
import 'echarts-wordcloud'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

console.log("wordCloudData",props.data);
const echartsRef = ref<HTMLElement>();
let mChart: echarts.ECharts | null = null
onMounted(() =>{
    mChart = echarts.init(echartsRef.value);
    renderChart()
})
watch(()=>{
    props.data
},() => {renderChart()})
const randomRGB = () => {
    const r = Math.floor(Math.random()*255),
        g = Math.floor(Math.random()*255),
        b = Math.floor(Math.random()*255);
        return `rgb(${r},${g},${b})`
}
const renderChart = () => {
    const options = {
        series:[
            {
                type:"wordCloud",
                top:10,
                // bottom:5,
                width: '70%',
                height: '80%',
                sizeRange:[10,50],
                rotationRange: [0,0],
                gridSize: 5,
                layoutAnimation:true,
                textStyle:{
                    color:randomRGB
                },
                emphasis:{
                    textStyle:{
                        fontWeight:"bold",
                        color: "#000"
                    }
                },
                data: props.data
            }
        ]
        
    }
    mChart?.setOption(options)
}
</script>
<style lang="">
    
</style>