import {
    userMessagesCollection,
    type UserMessageType,
} from "../../js/userMessagesCollection";
import { add, span, div, button } from '../../js/framework/h';

const classPrefix = "userMessage";

const container = div(
    { class: `${classPrefix}sPane` },
);

add(
    document.body,
    div({
        class: `${classPrefix}s`,
    }, container),
);

const addUserMessageElement = (
    id: string,
    message: string,
    type: UserMessageType,
) => {
    const popup = div(
        {
            role: "alert",
            ariaLive: "assertive",
            ariaAtomic: "true",
            id,
            class: [classPrefix, `${classPrefix}--${type}`],
        },
        div(null, message),
        button({
            ariaControls: id,
        }, span(null, "Close")),
    );

    add(container, popup);
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
