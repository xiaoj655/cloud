<script setup>
import { onMounted, ref } from 'vue';
import * as file from '@/api/files'
import { handleClickImg } from './utils';

let HEIGHT = window.innerHeight - 48, WIDTH = window.innerWidth - 255, chunkSize
const curPage = ref(0), loadingStatus = ref(false)
const files = ref([]), visItems = ref([])
const baseURL = 'http://hw:5000/file'
function loadMore() {
    render()
}
const observer = new IntersectionObserver(loadMore, {
    root: null,
    rootMargin: '0px',
    threshold: 1
})

function useWindowChange() {

}

let render
async function _render(){
    loadingStatus.value = true
    const ret = await file.getList()
    files.value = ret.data.map(i=>i.id)
    visItems.value.push(...files.value.slice(chunkSize*curPage, chunkSize))
    curPage.value += 1
    loadingStatus.value = false

    render = ()=>{
        const st = chunkSize * curPage.value
        if(st > files.value.length){
            return
        }
        loadingStatus.value = true
        visItems.value.push(...files.value.slice(st, st + chunkSize))
        curPage.value += 1
        loadingStatus.value = false
    }
}

_render()

onMounted(()=>{
    chunkSize = Math.floor(WIDTH / 200) * (Math.floor(HEIGHT / 200) + 1)
    const loadingEle = document.querySelector('#loading')
    observer.observe(loadingEle)
})
</script>

<template>
    <v-card>
        <div id="con" ref="conRef">
            <v-img
                v-for="item in visItems"
                :key="item"
                :src="`/file/${item}`"
                @click="handleClickImg(baseURL.concat('/').concat(item))"
                rounded="sm"
                height="200px"
                class="hover:cursor-pointer shadow">
            </v-img>
        </div>
        <v-card :loading="loadingStatus" disabled :title="loadingStatus? '加载中': '到底啦！'" id="loading">
        </v-card>
    </v-card>
</template>

<style scoped>
#con {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
</style>