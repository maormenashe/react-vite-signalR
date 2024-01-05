export const BASE_HUB_ROUTE: string = `${import.meta.env.VITE_HUBS_BASE_URL}/hubs/`;

export const ViewHubConstants = {
    HUB_NAME: "ViewHub",
    get HUB_ROUTE() {
        return `${BASE_HUB_ROUTE}${this.HUB_NAME}`;
    },
    Methods: {
        Server: {
            VIEW_COUNT_UPDATE: "VIEW_COUNT_UPDATE",
        },
        Client: {
            NOTIFY_WATCHING: 'notifyWatching',
            NOTIFY_WITH_ARG: 'NotifyWithArg',
        }
    },
};
