import { type Session, type User } from "./supabase";
import { Signal } from "../framework/Signal";
import { makeSessionManager } from "./makeSessionManager";
import { TYPE_INFO, userMessagesCollection } from "../userMessagesCollection";

const WAITING_CONFIRMATION = Symbol("WAITING_CONFIRMATION");

type WAITING_CONFIRMATION = typeof WAITING_CONFIRMATION;

const id_for_confirmation_message = "__waiting_confirmation";

export const user = Signal<User | null>(null, {
    transform: (user, old, SKIP) =>
        user != null && old != null && user.id === old.id ? SKIP : user,
});

export const session = Signal<Session | WAITING_CONFIRMATION | null>(null).on(
    (newSession) => {
        userMessagesCollection.remove(id_for_confirmation_message);
        user.set(
            newSession == null || newSession === WAITING_CONFIRMATION ||
                newSession.user == null
                ? null
                : newSession.user,
        );
    },
);

makeSessionManager({
    onSessionChanged: session.set,
    onError: (error) => userMessagesCollection.addError(error.message),
    onWaitingConfirmation: () => {
        session.set(WAITING_CONFIRMATION);
        userMessagesCollection.add(
            TYPE_INFO,
            "Please check your email for a login link",
            id_for_confirmation_message,
        );
    },
});
