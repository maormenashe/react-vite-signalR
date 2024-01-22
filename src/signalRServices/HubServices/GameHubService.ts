import { GameHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class GameHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return GameHubConstants.HUB_ROUTE;
    }

    public async joinQueue(): Promise<void> {
        await this.signalRService.send(GameHubConstants.Methods.Client.JOIN_QUEUE);
    }

    public onTickUpdate = (callBack: (value: number) => void): void => {
        this.on(GameHubConstants.Methods.Server.TICK, callBack);
    };

    public onQueueJoined = (callBack: () => void): void => {
        this.on(GameHubConstants.Methods.Server.QUEUE_JOINED, callBack);
    };

    public onUpdateQueue = (callBack: (value: number) => void): void => {
        this.on(GameHubConstants.Methods.Server.UPDATE_QUEUE, callBack);
    };

    public onGameStart = (callBack: (value: unknown) => void): void => {
        this.on(GameHubConstants.Methods.Server.GAME_START, callBack);
    };
}

export default GameHubService;