import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Alter = {
  type?: 'success' | 'error' | 'info' | 'warning',
  title: string,
  text?: string,
  key: string
}
const useGlobalStore = defineStore('global', ()=>{
  const sideBar = ref({
    rail: false
  })
  const alerts = ref<Alter[]>([])
  function alert(type: 'success' | 'error' | 'info' | 'warning' = 'success', title: string, text: string = '') {
    alerts.value.push({type,title,text, key: Math.random().toString(32).substring(2)})
    setTimeout(()=>alerts.value.shift(), 1500)
  }
  return {sideBar, alert, alerts}
})

export default useGlobalStore
