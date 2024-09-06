<script setup>
import useGlobalStore from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

const sideBarItems = [{title: '图床'}]
const globalStore = useGlobalStore()
const {sideBar} = storeToRefs(globalStore)

function handleLogout() {
    localStorage.removeItem('access_token')
    router.push({name: 'login'})
}
</script>

<template>
    <v-layout>
        <v-navigation-drawer :rail="sideBar.rail" @click="globalStore.rail = false">
            <v-list>
                <v-list-item prepend-avatar="https://dummyimage.com/500x320/000/fff.png" title="jkl" subtitle="xiaoj655@gmail.com">
                </v-list-item>
            </v-list>
            <v-divider class="border-black"></v-divider>
            <v-list>
                <v-list-item
                v-for="(item, index) in router.options.routes.filter(i=>!i.meta.hidden)"
                :title="item.meta.title"
                :prepend-icon="item.meta.icon"
                :to="{name: item.name, path: item.path}"
                :value="index"></v-list-item>
            </v-list>
            <template #append>
                <v-btn block class="p-2" @click="handleLogout">Logout</v-btn>
            </template>
        </v-navigation-drawer>
        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<style scoped>
:deep(.v-navigation-drawer__append) {
    padding: 10px;
}

</style>