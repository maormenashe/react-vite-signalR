import { Player, TurnMove } from "../../HubModels/GameHub/GameHubTypes";
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

    public async makeTurnMove(shape: string): Promise<void> {
        await this.signalRService.send(GameHubConstants.Methods.Client.MAKE_TURN_MOVE, shape);
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

    public onGameStart = (callBack: (player: Player) => void): void => {
        this.on(GameHubConstants.Methods.Server.GAME_START, callBack);
    };

    public onTurnChange = (callBack: (player: Player) => void): void => {
        this.on(GameHubConstants.Methods.Server.TURN_CHANGE, callBack);
    };

    public onTurnMove = (callBack: (turnMove: TurnMove, currentTurnPlayer: Player) => void): void => {
        this.on(GameHubConstants.Methods.Server.TURN_MOVE, callBack);
    };
}

export default GameHubService;