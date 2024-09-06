<script setup>
import { ref } from 'vue';

import Upload from './components/upload.vue';
import History from './components/history.vue';
const tab = ref()
</script>

<template>
    <v-card>
        <v-tabs align-tabs="center" v-model="tab">
            <v-tab value="upload">上传</v-tab>
            <v-tab value="history">历史</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="upload">
                <Upload />
            </v-tabs-window-item>
            <v-tabs-window-item value="history">
                <History />
            </v-tabs-window-item>
        </v-tabs-window>
    </v-card>
</template>