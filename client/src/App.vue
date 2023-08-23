<script setup lang="ts">
import HorizationBar from './components/HorizationBar.vue';
import MapChart from './components/MapChart.vue';
import RadarBar from './components/RadarBar.vue';
import Relation from './components/Relation.vue';
import RingBar from './components/RingBar.vue';
import TotalData from './components/TotalData.vue';
import VerticalBar from './components/VerticalBar.vue';
import WordCloud from './components/WordCloud.vue';

// import HelloWorld from './components/HelloWorld.vue'
// const comps = import.meta.glob('./components/*.vue', { eager: true })
// console.log(comps)
// import.meta.glob('./components/*.vue', { eager: true })
import {ref} from 'vue';
import { getVisualization } from './api/visualization';
const data = ref();
const loadData = async () => {
  data.value = await getVisualization();
  console.log(data.value);
};

loadData()
// setInterval(()=>{
//   loadData()
// },3000)
</script>

<template>
  <div v-if="data" class="flex text-white h-screen p-5 overflow-hidden">
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <HorizationBar class="h-1/3 box-border pb-4" :data="data.horizionbar" />
      <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData" />
      <Relation class="h-1/3 box-border" :data="data.relationData" />
    </div>
    <div class="w-1/2 flex flex-col">
      <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData" />
      <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1" :data="data.mapData"/>
    </div>
    <div class="flex-1 ml-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData" />
      <RingBar class="h-1/3 box-border pb-4" :data="data.abnormalData" />
      <WordCloud class="h-1/3 box-border" :data="data.wordCloudData" />
    </div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
