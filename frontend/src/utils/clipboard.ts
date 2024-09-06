export async function writeClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text)
        return true
    }catch(e){
        console.log(e)
        return false
    }
}