<template>
    <div>
        <div> 大区异常处理 </div>
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
const getSeriesData = () => {
    const series = [];
    props.data.forEach((item,index)=>{
        series.push({
        name: item.name,
        type: 'pie',
        clockwise: false,
        hoverAnimation: false,
        radius: [73-index*15+'%',68 -index*15+"%"],
        center:["40%","50%"],
        label:{
            show:false
        },
        data: [
            {
                value:item.value,
                name: item.name
            },
            {
                value: 1000,
                itemStyle: {
                    color: 'rgba(0,0,0,0)',
                    borderWidth:0
                },
                toolTip:{
                    show:false
                },
                hoverAnimation:false
            }
        ]
        })
        series.push({
            name: item. name, type: 'pie', silent: true,
            z: 1,
            clockWise: false, hoverAnimation: false,
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            center: ['40%', '50%'],
            label: {
                show: false
            },
            data:[
                {
                    // value: 7.5,
                    value:10,
                    itemStyle: {
                        // color: '#031845',
                        color: 'rgb(3, 31, 62)',
                        borderWidth: 0
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                },
                // {
                //     value: 2.5,
                //     itemStyle:{
                //         color: "rgba(0,0,0,0)",
                //         borderWidth: 0
                //     },
                //     tooltip: {
                //         show: false
                //     },
                //     hoverAnimation: false
                // }
            ]
        })
    })
    return series;
}
const renderChart = () => {
    const options = {
        legend:{
            show:true,
            icon: "circle",
            top: "20%",
            right: "10%",
            data: props.data.map(item => item.name),
            width: -5,
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 6,
            textStyle: {
                fontSize: 12,
                lineHeight: 5,
                color: '#FFF'
            }
        },
        tooltip:{
            show: true,
            trigger:'item',
            formatter: '{a}<br>{b}:{c}({d}%)'
        },
        yAxis:[
            {
                type:"category",
                inverse: true,
                axisLine: {
                    show:false
                }
            }
        ],
        xAxis:[
            {
                show:false
            }
        ],
        series:getSeriesData()
    }
    mChart.setOption(options);
}
</script>
<style lang="">
    
</style>