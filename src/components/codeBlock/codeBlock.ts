function makeSpan(className, content){
    const span = document.createElement('span')
    span.classList.add(className)
    span.textContent = content
    return span
}
document.querySelectorAll('.codeBlockFileName').forEach((holderElement)=>{
    const pathStr = holderElement.textContent
    if(pathStr == null || pathStr === ""){
        holderElement.remove()
        return
    }
    holderElement.textContent = "";
    holderElement.appendChild(makeSpan('codeBlockFileNameProtocol', "res:"))
    holderElement.appendChild(makeSpan('codeBlockFileNameSlash', '//'))
    const pathParts = pathStr.replace(/^res:\/\//, '').replace(/^\/|^\/$/,'').split('/')
    pathParts.forEach((chunk, index) => {
        index > 0 && holderElement.appendChild(makeSpan('codeBlockFileNameSlash', '/'))
        holderElement.appendChild(makeSpan(index ===pathParts.length - 1 ? 'codeBlockFileNameFile' : 'codeBlockFileNameDirectory', chunk))
    })
})