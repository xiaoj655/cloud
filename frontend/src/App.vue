<script setup lang="ts">
import Layout from '@/layout/index.vue'
import useGlobalStore from './stores/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore()
const {alerts} = storeToRefs(globalStore)

</script>

<template>
  <Layout v-if="$route.path !== '/login'">
    <template #default>
      <router-view></router-view>
    </template>
  </Layout>
  <router-view v-else></router-view>
  <div id="alert-box" class="fixed top-0 left-1/2 -translate-x-1/2">
    <TransitionGroup name="list">
      <v-alert v-for="item in alerts"
      class="my-1"
      :title="item.title"
      :type="item.type"
      :text="item.text"
      :key="item.key"></v-alert>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all .5s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
