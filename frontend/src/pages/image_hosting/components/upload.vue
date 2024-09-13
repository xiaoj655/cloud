<script setup>
import { ref, onMounted, unref } from 'vue';
import * as file from '@/api/files'
import { handleClickImg } from './utils';
import { addEvnetListen, preventDefault } from '@/utils/dom';

const files = ref([])
const imgs = ref([])
const inputBoxRef = ref()
const BASEURL = import.meta.env.VITE_BASE_URL || ''

async function handleChange(e){
    const formData = new FormData()
    Array.from(e.target.files).forEach(i=>formData.append('files', i, i.name))
    console.log(e.target.files)
    e.target.values = ''
    const ret = await file.post(formData, {timeout: 100_000})
    ret.data.forEach(i=>imgs.value.push(i.id))
}

const inputBoxListener = []
onMounted(()=>{
    const _inputBoxEle = unref(inputBoxRef);
    ['drop', 'dragover', 'dragenter', 'dragleave'].forEach(e=>{
        inputBoxListener.push(addEvnetListen(_inputBoxEle, e, preventDefault))
    });

    ['dragenter', 'dragover'].forEach(e=>{
        inputBoxListener.push(addEvnetListen(_inputBoxEle, e, ()=> _inputBoxEle.classList.add('border-green-800')))
    });
    ['dragleave', 'drop'].forEach(e=>{
        inputBoxListener.push(addEvnetListen(_inputBoxEle, e, ()=>_inputBoxEle.classList.remove('border-green-800')))
    });
})

</script>

<template>
<v-card>
    <label
        ref="inputBoxRef"
        for="file"
        class="h-[calc(100vh-48px-500px)] flex flex-col justify-center items-center border-gray-500 border-2 border-dashed rounded-xl m-1 box-active">
        <v-icon size="x-large">mdi-upload-multiple</v-icon>
        <span>点击或拖拽上传图片</span>
    </label>
    <input type="file" id="file" style="display: none;" multiple accept="image/*" @change="handleChange">
    <div class="h-[500px]" id="con">
        <v-img v-for="i in imgs" :key="i" :src="`${BASEURL}/file/${i}`" @click="handleClickImg(i)" class="hover:cursor-pointer" rounded="sm"></v-img>
    </div>
</v-card>
</template>

<style scoped>
#con {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}

@keyframes bounce {
    0% {
        transform: translate(0,0);
    }
    33% {
        transform: translate(50px, 10px);
    }
    66% {
        transform: translate(-10px, -10px);
    }
    100% {
        transform: translate(0,0);
    }
}

.box-active {
    border-color: #22c55e;
    animation: bounce infinite ease-in-out;
}
</style>