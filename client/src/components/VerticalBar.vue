<template>
    <div>
        <div>服务资源占用比</div>
        <div ref="echartsRef" class="w-full h-full"></div>
    </div>
</template>
<script lang="ts" setup>
import {ref, onMounted,watch} from "vue"
import * as echarts from "echarts"
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
console.log(props.data);
const echartsRef = ref<HTMLElement>();
let mChart: echarts.ECharts | null = null
onMounted(() =>{
    mChart = echarts.init(echartsRef.value);
    renderChart()
})
watch(()=>{
    props.data
},() => {renderChart()})
const renderChart = () => {
    const options = {
        xAxis:{
            type: "category",
            data:props.data.map(item => item.name)
        },
        yAxis:{
            type: "value",
            show: false,
            max: function(value:any){
                return parseInt(value.max*1.2)
            }
        },
        series:[
            {
                type:"bar",
                data: props.data.map(item => ({
                    name:item.name,
                    value:item.value
                })),
                itemStyle:{
                    color:'#479AD3',
                    barBorderRadius:5,
                    shadowColor:"rgba(0,0,0,0.3)",
                    shadowBlur:5,
                    // barWidth:12,
                    // label:{
                    //     show:true,
                    //     position:"right",
                    //     textStyle:{
                    //         color: "#FFF"
                    //     }
                    // }
                },
                barWidth:12,
                label:{
                    show:true,
                    position:'top',
                    textStyle:{
                        color: "#FFF"
                    },
                    formatter: "{c}%"
                }
            }
        ],
        grid:{
            top:16,
            right:0,
            bottom: 26,
            left:-26,
            containLabel: true
        }
    }
    mChart.setOption(options)
}
</script>
<style lang="">
    
</style>