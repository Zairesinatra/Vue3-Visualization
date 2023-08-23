<template>
    <div>
        <div ref="echartsRef" class="w-full h-full"></div>
    </div>
</template>
<script lang="ts" setup>
import {ref, onMounted,watch} from "vue"
import * as echarts from "echarts"
import mapJson from "@/assets/mapData/china.json"
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
const echartsRef = ref(null);
let mChart:any = null;
onMounted(() => {
    echarts.registerMap("china", mapJson)
    mChart = echarts.init(echartsRef.value);
    renderChart();
});
watch(()=> props.data,() => {
    renderChart();
})
console.log("mappppp",props.data.voltageLevel);

const renderChart = () => {
    const options = {
        timeline:{
            data:props.data.voltageLevel,
            axisType: 'category',
            autoplay: true,
            playInterval: 3000,
            left: '10%',
            right: '10%',
            bottom: "0%",
            width: "80%",
            label:{
                normal:{
                    textStyle:{
                        color: "#DDD"
                    }
                },
                emphasis: {
                    textStyle:{
                        color: "#FFF"
                    }
                }
            },
            symbolSize: 10,
            lineStyle:{
                color:"#555"
            },
            checkpointStyle:{
                borderColor:"#888",
                borderWidth:2
            },
            controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                normal:{
                    color: "#666",
                    borderColor: "#666"
                },
                emphasis:{
                    color:"#aaa",
                    borderColor:"#aaa"
                }
            }
        },
        baseOption:{
            grid:{
                right: "2%",
                top:"15%",
                bottom:"10%",
                width:"20%",
            },
            geo:{
                show:true,
                map:"china",
                roam:true,
                zoom:0.9,
                // center:[105,36],
                center:[117,36],
                itemStyle:{
                    normal:{
                        borderColor:"rgba(147,235,248,1)",
                        borderWidth:1,
                        areaColor:{
                            type:"radial",
                            x:0.5,
                            y:0.5,
                            r:0.5,
                            colorStops:[
                                {
                                    offset:0,
                                    color:"rgba(147,235,248,0)"
                                },
                                {
                                    offset:1,
                                    color:"rgba(147,235,248,0.2)"
                                }
                            ],
                        }
                    },
                    emphasis:{
                    areaColor:"#3B91B7",
                    borderWidth:0
                }
                }
            }
        },
        options:[] as Array<any>
    }
    props.data.voltageLevel.forEach((item: string,index:number)=>options.options.push({
        backgroundColor: "#142037",
        title: [
        {
        text: "2019-2023 年度数据统计",
        left: "0%",
        top: "0%",
        textStyle: {
            color: "#CCC",
            fontSize: 25
        }
        },
        {
        id: "statistic",
        text: item + "年数据统计情况",
        right: "0%",
        top: "4%",
        textColor: {
        color: "#CCC",
        fontSize: 20
        }
        }
        ],
        xAxis: {
        type: "value",
        scale: true,
        position: "top",
        splitLine: {
        show: false
        },
        axisLine: {
        show: false
        },
        axisTick: {
        show: false
        },
        axisLabel: {
        margin: 2,
        textStyle: {
        color: "#aaa"
        }
        },
        },
        yAxis: {
        type: "category",
        axisLine: {
        show: true,
        lineStyle: {
        color: "#ddd"
        }
        },
        axisTick: {
        show: false
        },
        axisLabel: {
        interval: 0,
        textStyle: {
        color: "#ddd"
        }
        },
        data: props.data.categoryData[item].map((item: { name: any; }) => item.name)
        },
        series: [
        {
        type: "bar",
        zlevel: 1.5,
        itemStyle: {
        normal: {
        // color: new echarts.graphic.LinearGradient(
        //     0,0,1,0,
        //     [
        //         {offset:0,color:"#14c8d4"},
        //         {offset:1,color:"#43eec6"}
        //     ]
        // )
        color: props.data.colors[index]
        }
        },
        data: props.data.categoryData[item].map((item: { value: any; }) => item.value)
        },
        {
            type:"effectScatter",
            coordinateSystem:"geo",
            data: props.data.topData[item],
            symbolSize: function (val: any) {
                return val[2] / 3;
            },
            showEffectOn: "render",
            rippleEffect: {
                brushType: "stroke"
            },
            label:{
                formatter: "{b}",
                position: "right",
                show: true
            },
            itemStyle: {
                color: props.data.colors[index],
                shadowBlur: 10,
                shadowColor: "#333"
            },
            }
        ]
        }))
    mChart.setOption(options);
}
</script>
<style lang="">
    
</style>