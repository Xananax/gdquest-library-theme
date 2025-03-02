import { add, button, span, div } from '../../js/deps.ts';

interface PasswordButton extends HTMLButtonElement{ buttonLabel: HTMLSpanElement, setText: (text: string) => void }

function setPasswordButtonText(this: PasswordButton, text: string){
    this.buttonLabel.textContent = text
}

function onclipboardButtonClick(this: PasswordButton){
    const controlId = this.getAttribute('aria-controls')
    const element = document.querySelector<HTMLInputElement>(`#${controlId}`)
    
    if(!element){
        return
    }

    const expanded = this.getAttribute('aria-expanded') === 'false';
    element.type = expanded ? 'text' : 'password';
    this.setAttribute('aria-expanded', String(expanded));
    this.setText(expanded ? 'hide characters' : 'show characters');
}

document.querySelectorAll('input[type="password"]').forEach(input=>{
    const id = input.getAttribute('id')
    if(input.classList.contains('isJSProcessed') || !id){
        return
    }
    input.classList.add('isJSProcessed')
    
    const buttonLabel = span(null, 'show characters')

    const revealButon: PasswordButton = Object.assign(button({
        class: 'passwordContainerRevealButton',
        ariaExpanded: 'false',
        type: 'button',
        ariaControls: id,
        onClick: onclipboardButtonClick,
    }, buttonLabel), { buttonLabel, setText: setPasswordButtonText })

    const container = div({
        class: ['passwordContainer', 'inputContainer']
    })

    input.parentElement?.insertBefore(container, input)
    add(container, input, revealButon)
})