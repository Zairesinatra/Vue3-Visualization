<template>
    <div>
        <div> 数据传递信息 </div>
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
        xAxis:{
            show:false,
            type: "value"
        },
        yAxis:{
            show:false,
            type:"value"
        },
        series:[
            {
                type:"graph",
                layout:"none",
                coordinateSystem:"cartesian2d",
                symbolSize: 16,
                z:3,
                edgeLabel:{
                    normal:{
                        show:true,
                        color:"#FFF",
                        textStyle:{
                            fontSize:14
                        },
                        formatter: function(params:any){
                            return params.data.speed
                        }
                    }
                },
                label:{
                    normal:{
                        show: true,
                        position:"bottom",
                        color: "5E5E5E"
                    }
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: 8,
                data:props.data.map(item => {
                    if(item.id !== 0){
                        return {
                            name:item.name,
                            category:0,
                            active:true,
                            speed: `${item.speed}kb/s`,
                            value: item.value,
                        }
                    } else {
                        return{
                            name:item.name,
                            value: item.value,
                            symbolSize: 60,
                            itemStyle:{
                                normal:{
                                    color:{
                                        colorStops:[
                                            {
                                                offset: 0,
                                                color: "#157eff"
                                            },
                                            {
                                                offset: 1,
                                                color: "#157eff"
                                            }
                                        ]
                                    }
                                }
                            },
                            label:{
                                normal:{
                                    fontSize: 12,
                                    color:"#95AAC2"
                                }
                            }
                        }
                    }
                }),
                links:props.data.map((item,index)=>({
                    source:item.source,
                    target:item.target,
                    speed:`${item.speed}kb/s`,
                    lineStyle:{
                        normal:{
                            color: "#12b5d0",
                            curveness: 0.2
                        }
                    },
                    label: {
                        show: true,
                        position:'middle',
                        offset:[10,0]
                    }
                }))
            },
            {
                type: "lines",
                coordinateSystem: "cartesian2d",
                z:1,
                effect:{
                    show: true,
                    smooth: false,
                    trailLength: 0,
                    symbol:"arrow",
                    color:"rgba(55,155,255,0.5)",
                    symbolSize: 10
                },
                lineStyle: {
                    normal:{
                        curveness: 0.2
                    }
                },
                data:[
                    [{ coord: [0, 300] }, { coord: [50, 200] }],
                    [{ coord: [0, 100] }, { coord: [50, 200] }],
                    [{ coord: [50, 200] }, { coord: [100, 100]}],
                    [{ coord: [50,200] }, { coord: [100, 300]}]
                ]
            }
        ]
    }
    mChart.setOption(options);
}
</script>
<style lang="">
    
</style>