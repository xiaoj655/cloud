export function preventDefault(e: Event, stopPropagation=true) {
    e.preventDefault()
    stopPropagation && e.stopPropagation()
}

export function removeEventListen(dom: HTMLElement, evnetName: string, handler: EventListenerOrEventListenerObject){
    dom.removeEventListener(evnetName, handler)
}

export function addEvnetListen(dom: HTMLElement, evnetName:string, handler: EventListenerOrEventListenerObject ){
    dom.addEventListener(evnetName, handler)
    return ()=>removeEventListen(dom,evnetName,handler)
}