<script setup>
import { ref } from 'vue';
import * as file from '@/api/files'
import { handleClickImg } from './utils';

const files = ref([])
const imgs = ref([])

async function handleChange(e){
    const formData = new FormData()
    Array.from(e.target.files).forEach(i=>formData.append('files', i, i.name))
    console.log(e.target.files)
    e.target.values = ''
    const ret = await file.post(formData, {timeout: 100_000})
    ret.data.forEach(i=>imgs.value.push(i.id))
}

</script>

<template>
<v-card class="">
    <label for="file" class="h-[calc(100vh-48px-500px)] flex flex-col justify-center items-center border-black border-2">
        <v-icon size="x-large">mdi-upload-multiple</v-icon>
        <span>点击或拖拽上传图片</span>
    </label>
    <input type="file" id="file" style="display: none;" multiple accept="image/*" @change="handleChange">
    <div class="h-[500px]" id="con">
        <v-img v-for="i in imgs" :key="i" :src="`file/${i}`" @click="handleClickImg(i)" class="hover:cursor-pointer" rounded="sm"></v-img>
    </div>
</v-card>
</template>

<style scoped>
#con {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}
</style>