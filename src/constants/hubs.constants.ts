export const BASE_HUB_ROUTE: string = `${import.meta.env.VITE_HUBS_BASE_URL}/hubs/`;


export const GameHubConstants = {
    HUB_NAME: "GameHub",
    get HUB_ROUTE() {
        return `${BASE_HUB_ROUTE}${this.HUB_NAME}`;
    },
    Methods: {
        Server: {
            TICK: "TICK",
            QUEUE_JOINED: "QUEUE_JOINED",
            UPDATE_QUEUE: "UPDATE_QUEUE",
            GAME_START: "GAME_START",
            TURN_CHANGE: "TURN_CHANGE",
            TURN_MOVE: "TURN_MOVE",
        },
        Client: {
            JOIN_QUEUE: 'joinQueue',
            MAKE_TURN_MOVE: 'makeTurnMove',
        }
    },
};


export const RPSGameHubConstants = {
    HUB_NAME: "RPSGameHub",
    get HUB_ROUTE() {
        return `${BASE_HUB_ROUTE}${this.HUB_NAME}`;
    },
    Methods: {
        Server: {
            TICK: "TICK",
            QUEUE_JOINED: "QUEUE_JOINED",
            UPDATE_QUEUE: "UPDATE_QUEUE",
            GAME_START: "GAME_START",
            ROUND_CONCLUSION: "ROUND_CONCLUSION",
        },
        Client: {
            JOIN_QUEUE: 'joinQueue',
            MAKE_ROUND_MOVE: 'makeRoundMove',
        }
    },
};

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
            INCREMENT_SERVER_VIEW: 'IncrementServerView',
        }
    },
};

export const ConnectionHubConstants = {
    HUB_NAME: "ConnectionHub",
    get HUB_ROUTE() {
        return `${BASE_HUB_ROUTE}${this.HUB_NAME}`;
    },
    Methods: {
        Server: {
            CONNECTION_COUNT_UPDATE: "ConnectionCountUpdate",
        },
        Client: {
        }
    },
};

export const StringToolsHubConstants = {
    HUB_NAME: "StringToolsHub",
    get HUB_ROUTE() {
        return `${BASE_HUB_ROUTE}${this.HUB_NAME}`;
    },
    Methods: {
        Server: {
        },
        Client: {
            GET_FULL_NAME: 'GetFullName',
        }
    },
};

export const VoteHubConstants = {
    HUB_NAME: "VoteHub",
    get HUB_ROUTE() {
        return `${BASE_HUB_ROUTE}${this.HUB_NAME}`;
    },
    Methods: {
        Server: {
            UPDATE_VOTES: "UPDATE_VOTES",
        },
        Client: {
            GET_CURRENT_VOTES: "GetCurrentVotes"
        }
    },
};