import { writeClipboard } from "@/utils/clipboard";
import useGlobalStore from "@/stores/globalStore";

const globalStore = useGlobalStore()
export async function handleClickImg(url: string) {
    const ret = await writeClipboard(url)
    if(ret){
        globalStore.alert('info', '已复制图片链接至剪切板')
    }else{
        console.log('err')
    }
}