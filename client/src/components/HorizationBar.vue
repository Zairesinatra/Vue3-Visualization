import ref from 'vue';
<template lang="">
    <div>
        <div> 区域数据信息 </div>
        <div ref="echartsRef" class="w-full h-full"></div>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted,watch } from 'vue';
import * as echarts from 'echarts';
const props = defineProps({
    data:{
        type:Object
    }
})
// console.log(props.data);
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
            type:'value',
            max: function(value){
                return parseInt(value.max * 1.2)
            }
        },
        yAxis:{
            type:'category',
            data:props.data?.map((item:any) => item.name),
            axisLabel:{
                color:'#9eb1c8'
            },
            inverse:true,
            axisLine:{
                show:false // 设置坐标轴线的宽度
            },
            axisTick:{
                show:false
            }
        },
        grid:{
            top:0,
            right:0,
            bottom:0,
            left:0,
            containLabel:true
        },
        series:[
            {
                type:"bar",
                data:props.data?.map((item:any) => ({
                    name:item.name,
                    value:item.value
                })),
                showBackground:true,
                backgroundStyle:{
                    color:'rgba(180,180,180,0.2)'
                },
                itemStyle:{
                    color:'#479AD3',
                    barBorderRadius:5,
                    shadowColor:"rgba(0,0,0,0.3)",
                    shadowBlur:5,
                    barWidth:12,
                    label:{
                        show:true,
                        position:"right",
                        
                    }
                },
            }
        ]
    }
    mChart.setOption(options);
}
</script>
<style lang="">
    
</style>