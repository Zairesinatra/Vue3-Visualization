<template>
    <div>
        <div> 云端报警风险 </div>
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
console.log("risk",props.data);
const echartsRef = ref(null);
let mChart:any = null;
onMounted(() => {
    mChart = echarts.init(echartsRef.value);
    renderChart();
});
watch(()=> props.data,() => {
    renderChart();
})
const renderChart = () => {
    const options = {
        radar:{
            name:{
                textStyle:{
                color: '#05D5FF',
                fontSize: 12
                }
            },
            shape: 'polygon',
            center: ["50%","50%"],
            radius: "70%",
            startAngle: 90,
            axisLine:{
                lineStyle:{
                    color: 'rgba(5, 213, 255, .8)'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1, 
                    color: 'rgba(5, 213, 255, .8)'
                },
            },
            indicator: props.data.map((item) => ({
                name: item.name,
                max: 100
                })),
                splitArea: {
                    show: false
                }
        },
        polar:{
            center: ["50%","50%"],
            radius: "0",
        },
        angleAxis:{
            min: 0,
            interval: 5,
            clockwise: false
        },
        radiusAxis:{
            min:0,
            interval: 20,
            splitLine:{
                show: true
            }
        },
        series:[
            {
                type: "radar",
                symbol: "circle",
                symbolSize: 10,
                itemStyle:{
                    normal:{
                        color:"#05D5FF"
                    }
                },
                areaStyle: {
                    normal:{
                        color:"#05D5FF",
                        opacity:0.5
                    }
                },
                lineStyle:{
                    width: 2,
                    color: "#05D5FF"
                },
                label: {
                    normal:{
                        show:true,
                        color:"#FFF"
                    }
                },
                data:[{
                    value: props.data.map(item => item.value)
                }]
            }

        ]
    }
    mChart.setOption(options);
}
</script>
<style lang="">
    
</style>