import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {path: '/', redirect: '/login', meta: {hidden: true}},
    {path: '/login', component: ()=>import('@/pages/login/index.vue'),name: 'login', meta: {hidden: true}},
    {path: '/ih', component: ()=>import('@/pages/image_hosting/index.vue'), name: 'image_hosting', meta: {title: '图床', icon: 'mdi-image'}},
    {path: '/cloud', component: ()=>import('@/pages/cloud/index.vue'), name: 'cloud', meta: {title: '存储', icon: 'mdi-cloud'}},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router