import {
    type UserMessageType,
    userMessagesCollection,
} from "../../js/userMessagesCollection";

const classPrefix = "userMessage";

const container = document.createElement("div");
container.classList.add(`${classPrefix}sPane`);

const notificationsWrapper = document.createElement("div");
notificationsWrapper.classList.add(`${classPrefix}s`);
notificationsWrapper.appendChild(container);

document.body.appendChild(notificationsWrapper);

const addUserMessageElement = (id: string, message: string, type: UserMessageType) => {
    const contents = document.createElement("div");
    contents.textContent = message;

    const buttonSpan = document.createElement("span");
    buttonSpan.textContent = "Close";

    const closeButton = document.createElement("button");
    closeButton.setAttribute("aria-controls", id);
    closeButton.appendChild(buttonSpan);

    const popup = document.createElement("div");
    popup.classList.add(classPrefix);
    popup.classList.add(`${classPrefix}--${type}`);
    popup.appendChild(contents);
    popup.appendChild(closeButton);
    popup.id = id;

    container.appendChild(popup);
};

container.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
        const id = target.getAttribute("aria-controls");
        id && userMessagesCollection.remove(id);
    }
});

// we wait for the animation to end before removing the element
container.addEventListener("animationend", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(`${classPrefix}Closing`)) {
        target.remove();
    }
});

userMessagesCollection.entries().forEach(([id, { message, type }]) =>
    addUserMessageElement(id, message, type)
);

userMessagesCollection.onMessageAdded((id, { message, type }) =>
    addUserMessageElement(id, message, type)
);

userMessagesCollection.onMessageRemoved((id) =>
    document.getElementById(id)?.classList.add(`${classPrefix}Closing`)
);