interface PasswordButton extends HTMLButtonElement{ setText: (text: string) => void }


function toggleVisibility(button: PasswordButton){
    
    const controlId = button.getAttribute('aria-controls')
    const element = document.querySelector<HTMLInputElement>(`#${controlId}`)
    
    if(!element){
        return
    }

    const expanded = button.getAttribute('aria-expanded') === 'false';
    element.type = expanded ? 'text' : 'password';
    button.setAttribute('aria-expanded', String(expanded));
    button.setText(expanded ? 'hide characters' : 'show characters');
}

function onclipboardButtonClick(this: PasswordButton){
    toggleVisibility(this)
}

document.querySelectorAll('input[type="password"]').forEach(input=>{
    const id = input.getAttribute('id')
    if(input.classList.contains('isJSProcessed') || !id){
        return
    }
    input.classList.add('isJSProcessed')
    
    const span = document.createElement('span')
    span.textContent = 'show characters'

    const button = document.createElement('button') as PasswordButton
    button.classList.add('passwordContainerRevealButton')
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute("type", "button")
    button.setAttribute("aria-controls", id)
    button.addEventListener('click', onclipboardButtonClick)
    button.appendChild(span)
    button.setText = function(text){
        span.textContent = text
    }

    const container = document.createElement('div')
    container.classList.add('passwordContainer', 'inputContainer')

    input.parentElement?.insertBefore(container, input)
    container.appendChild(input)
    container.appendChild(button)
})