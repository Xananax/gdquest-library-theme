const TYPE_SUCCESS = "success";
const TYPE_ERROR = "error";
const TYPE_INFO = "info";
const TYPE_WARNING = "warning";

type PopupType = typeof TYPE_SUCCESS | typeof TYPE_ERROR | typeof TYPE_INFO | typeof TYPE_WARNING;
const classPrefix = "popup";

const container = document.createElement("div");
container.classList.add(`${classPrefix}sPane`);

const notificationsWrapper = document.createElement("div");
notificationsWrapper.classList.add(`${classPrefix}s`);
notificationsWrapper.appendChild(container);

document.body.appendChild(notificationsWrapper);

container.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
        const popup = target.closest(`.${classPrefix}`);
        popup?.classList.add(`${classPrefix}Closing`);
    }
});
container.addEventListener("animationend", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains(`${classPrefix}Closing`)) {
        const popup = target.closest(`.${classPrefix}`);
        const id = popup?.id;
        if(popup && id && event.animationName === "removeFromList") {
            localStoragePopupCache.remove(id);
            popup.remove();
        }
    }
})

const localStoragePopupCache = (() => {
    const popupLocalStorageKey = `${classPrefix}s`;
    const store: Record<string, {message:string, type: PopupType}> = JSON.parse(
        localStorage.getItem(popupLocalStorageKey) ?? "{}",
    );
    const save = () =>
        localStorage.setItem(popupLocalStorageKey, JSON.stringify(store));
    const add = (message: string, type: PopupType) => {
        const id = `popup-` + type + "-" + Math.random().toString(36).slice(2);
        store[id] = { message, type };
        save();
        return id;
    };
    const remove = (id: string) => {
        delete store[id];
        save();
    };
    const get = (id: string) => store[id];
    const all = () => store;
    return { add, remove, get, all };
})();

const makePopup = (id: string, message: string, type: PopupType) => {
    const contents = document.createElement("div");
    contents.textContent = message;

    const buttonSpan = document.createElement("span");
    buttonSpan.textContent = "Close";

    const closeButton = document.createElement("button");
    closeButton.appendChild(buttonSpan);

    const popup = document.createElement("div");
    popup.classList.add(classPrefix);
    popup.classList.add(`${classPrefix}--${type}`);
    popup.appendChild(contents);
    popup.appendChild(closeButton);
    popup.id = id;

    container.appendChild(popup);
};

Object.entries(localStoragePopupCache.all()).forEach(
    ([id, { message, type }]) => {
        makePopup(id, message, type);
    },
);

const Popup = (message: string, type: PopupType) => {
    const id = localStoragePopupCache.add(message, type);
    makePopup(id, message, type);
};

/*
Popup('Hello, world!', TYPE_SUCCESS);
Popup('Hello, world!', TYPE_ERROR);
Popup('Hello, world!', TYPE_INFO);
Popup('Hello, world! There are a few different ways that you can do it. One of them is using calc-size(), which has some extra things you could do with it, but rig', TYPE_WARNING);
/*/