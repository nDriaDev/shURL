export const MessageUtils = {
    resolveBeMessages: (payload) => {
        if (payload.error) {
            return { error: [payload.error] };
        }
        if (payload.warning) {
            return { warning: [payload.warning] };
        }
        if (payload.default) {
            return { default: [payload.default] };
        }
        if (payload.success) {
            return { success: [payload.success] };
        }
        if (payload.message) {
            return { error: [payload.message] };
        }
        return { default: [typeof payload === "string" ? payload : 'Nessun messaggio'] };
    }
}