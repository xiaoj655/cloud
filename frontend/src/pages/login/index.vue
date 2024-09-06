<script setup>
import { ref, unref, useId } from 'vue';
import * as auth from '@/api/auth'
import useGlobalStore from '@/stores/globalStore';
import router from '@/router';

const formRef = ref()
const account = ref({
    username: '',
    password: '',
})
const globalStore = useGlobalStore()
const alert = globalStore.alert
const rules = {
    required: value => !!value || '请填写此项',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '无效的邮箱'
    },
    length: (min=1, max=999) => (value)=> value.length >= min && value.length <= max || '无效的密码'
}

const isLogin = ref(true)
async function handleSubmit() {
    const username = account.value.username
    const password = account.value.password
    if(typeof(rules.email(username)) === 'string' || password.length < 6) {
        alert('error', '请检查输入!')
        return
    }
    if(unref(isLogin)) {
        const ret = await auth.login(username, password)
        if(ret.status_code === 200) {
            alert('success', '登录成功!')
            localStorage.setItem('access_token', ret.data.access_token)
            router.push({name: 'image_hosting'})
        }
    }else{
        const ret = await auth.register(username, password)
        if(ret.status_code === 200) {
            alert('success', '注册成功, 请登录')
            isLogin.value = true
        }
    }
}

async function checkLocalToken(){
    const token = localStorage.getItem('access_token')
    if(!token) return

    const ret = await auth.checkToken()
    if(ret.status_code === 200){
        router.push({name: 'image_hosting'})
    }else{
        localStorage.removeItem('access_token')
    }
}

checkLocalToken()
</script>

<template>
<div class="w-[600px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
    <v-card :prepend-icon="isLogin ? 'mdi-account' : 'mdi-account-plus'" class="px-5">
        <template #title>
            <div class="flex justify-between">
                <span>{{ isLogin ? '请登录': '注册' }}</span>
                <v-btn variant="plain" size="small" @click="isLogin=false" v-if="isLogin">没有账号, 立即注册</v-btn>
            </div>
        </template>
        <v-form ref="formRef">
            <v-text-field label="账户名(邮箱)" v-model="account.username" :rules="[rules.email]" validate-on="lazy input"</v-text-field>
            <v-text-field label="密码" v-model="account.password" :rules="[rules.required, rules.length(6,20)]" validate-on="lazy input"></v-text-field>
        </v-form>
        <template #actions>
            <v-btn class="w-full" @click="handleSubmit">{{isLogin ? '登录': '注册'}}</v-btn>
        </template>
    </v-card>
</div>
</template>