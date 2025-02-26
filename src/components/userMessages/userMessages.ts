import van, { type State } from "vanjs-core";

const { add, state, derive, tags: { span, div, button } } = van;

const classPrefix = "userMessage";
const LOCALSTORAGE_KEY = "__userMessages";

const TYPE_SUCCESS = "success";
const TYPE_ERROR = "error";
const TYPE_INFO = "info";
const TYPE_WARNING = "warning";

type UserMessageType =
    | typeof TYPE_SUCCESS
    | typeof TYPE_ERROR
    | typeof TYPE_INFO
    | typeof TYPE_WARNING;

interface SerializedUserMessage {
    text: string;
    type: UserMessageType;
}

interface LiveUserMessage extends SerializedUserMessage {
    id: string;
    deleted: State<boolean>;
    isBeingDeleted: State<boolean>;
}

type UserMessageData = Record<string, LiveUserMessage>;

const localStorageLoadSafe = <T>(
    localStorageKey: string,
    defaultResponse: T,
) => {
    try {
        const asString = localStorage.getItem(localStorageKey);
        if (asString == null || asString === "") {
            return defaultResponse;
        }
        return JSON.parse(asString) as T;
    } catch (e) {
        return defaultResponse;
    }
};

const UserMessageItem =
    ({ text, type, id, isBeingDeleted }: LiveUserMessage) => () =>
        div(
            {
                role: "alert",
                "aria-live": "assertive",
                "aria-atomic": "true",
                id,
                class: () =>
                    `${classPrefix} ${classPrefix}--${type}` +
                    (isBeingDeleted.val ? ` ${classPrefix}Closing` : ""),
            },
            div(text),
            button({
                "aria-controls": id,
                onclick: function () {
                    isBeingDeleted.val = true;
                },
            }, span("Close")),
        );

export const UserMessagesState = () => {
    const initialTodos = Object.fromEntries(
        Object.entries(localStorageLoadSafe<UserMessageData>(
            LOCALSTORAGE_KEY,
            {},
        ))
            .map(([id, { text, type }]): [string, LiveUserMessage] => ([id, {
                text,
                id,
                type,
                deleted: van.state(false),
                isBeingDeleted: van.state(false),
            }] as const)),
    );

    const appState = state(initialTodos);

    const compact = (messages: UserMessageData) =>
        Object.fromEntries(
            Object.entries(messages).filter(([, t]) => !t.deleted.val).map((
                [id, { text, type }],
            ) => [id, {
                text,
                type,
            }]),
        );

    const save = (messages: UserMessageData) => {
        localStorage.setItem(
            LOCALSTORAGE_KEY,
            JSON.stringify(
                compact(messages),
            ),
        );
    };

    derive(() => save(appState.val));

    const add = (type: UserMessageType, text: string) => {
        const id = `usermessage-` + type + "-" +
            Math.random().toString(36).slice(2);
        appState.val = {... appState.val, [id]:{
            text,
            id,
            type,
            deleted: van.state(false),
            isBeingDeleted: van.state(false),
        }};
    };

    const remove = (id: string) => {
        if(!(id in appState.val)) {
            return;
        }
        const { [id]: _deleted, ...remainining} = appState.val;
        appState.val = remainining;
        save(appState.val);
    };

    const addSuccess = (message: string) => add(TYPE_SUCCESS, message);
    const addError = (message: string) => add(TYPE_ERROR, message);
    const addInfo = (message: string) => add(TYPE_INFO, message);
    const addWarning = (message: string) => add(TYPE_WARNING, message);

    const entries = () => Object.entries(appState.val);
    const values = () => Object.values(appState.val);

    return { addSuccess, addError, addInfo, addWarning, remove, entries, values };
};

export const UserMessageList = (
    state: ReturnType<typeof UserMessagesState>,
) => {

    return div(
        {
            class: `${classPrefix}s`,
        },
        div(
            {
                class: `${classPrefix}sPane`,
                onanimationend: (event: AnimationEvent) => {
                    const target = event.target as HTMLElement;
                    if (target.classList.contains(`${classPrefix}Closing`)) {
                        state.remove(target.id);
                    }
                },
            },
            (dom?: Element) =>
                dom
                    ? van.add(dom, UserMessageItem(state.values().at(-1)!))
                    : div(state.values().map(UserMessageItem)),
        ),
    );
};

const userMessagesCollection = UserMessagesState();

add(document.body, UserMessageList(userMessagesCollection));

declare global {
    interface Window {
        addSuccess: typeof userMessagesCollection.addSuccess;
        addError: typeof userMessagesCollection.addError;
        addInfo: typeof userMessagesCollection.addInfo;
        addWarning: typeof userMessagesCollection.addWarning;
    }
}

// for debug purposes/testing
window.addSuccess = userMessagesCollection.addSuccess;
window.addError = userMessagesCollection.addError;
window.addInfo = userMessagesCollection.addInfo;
window.addWarning = userMessagesCollection.addWarning;

/**
const container = div(

);

const addUserMessageElement = (
    id: string,
    message: string,
    type: UserMessageType,
) => {
    const popup = div(
        {
            role: "alert",
            "aria-live": "assertive",
            "aria-atomic": "true",
            id,
            class: `${classPrefix} ${classPrefix}--${type}`,
        },
        div(message),
        button({
            "aria-controls": id,
        }, span("Close")),
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
*/
