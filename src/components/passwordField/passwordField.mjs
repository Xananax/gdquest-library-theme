
function toggleVisibility(/** @type {HTMLElement} */button){
    console.log(button)
    const controlId = /** @type {string} */(button.getAttribute('aria-controls'));
    const element = document.querySelector(`#${controlId}`)
    console.log({controlId, element})
    if(!element){
        return
    }
    const expanded = button.getAttribute('aria-expanded') === 'false';
    element.type = expanded ? 'text' : 'password';
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'hide characters' : 'show characters';
}

function onButtonClick(evt){
    toggleVisibility(evt.currentTarget)
}

document.querySelectorAll('input[type="password"]').forEach(input=>{
    if(input.classList.contains('isJSProcessed') || !input.getAttribute('id')){
        return
    }
    input.classList.add('isJSProcessed')
    
    const span = document.createElement('span')
    span.textContent = 'show characters'

    const button = document.createElement('button')
    button.classList.add('passwordContainerRevealButton')
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute("type", "button")
    button.setAttribute("aria-controls", input.getAttribute('id'))
    button.addEventListener('click',onButtonClick)
    button.appendChild(span)

    const container = document.createElement('div')
    container.classList.add('passwordContainer', 'inputContainer')
    
    input.parentElement.insertBefore(container, input)
    container.appendChild(input)
    container.appendChild(button)
})