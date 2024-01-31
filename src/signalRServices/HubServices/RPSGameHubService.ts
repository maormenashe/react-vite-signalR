import { Player } from "../../HubModels/GameHub/GameHubTypes";
import { RPSMove, RoundConclusionDTO } from "../../HubModels/RPSGameHub/RPSGameHubTypes";
import { RPSGameHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class RPSGameHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return RPSGameHubConstants.HUB_ROUTE;
    }

    public async joinQueue(): Promise<void> {
        await this.signalRService.send(RPSGameHubConstants.Methods.Client.JOIN_QUEUE);
    }

    public async makeRoundMove(move: RPSMove): Promise<void> {
        await this.signalRService.send(RPSGameHubConstants.Methods.Client.MAKE_ROUND_MOVE, move);
    }

    public onTickUpdate = (callBack: (value: number) => void): void => {
        this.on(RPSGameHubConstants.Methods.Server.TICK, callBack);
    };

    public onQueueJoined = (callBack: () => void): void => {
        this.on(RPSGameHubConstants.Methods.Server.QUEUE_JOINED, callBack);
    };

    public onUpdateQueue = (callBack: (value: number) => void): void => {
        this.on(RPSGameHubConstants.Methods.Server.UPDATE_QUEUE, callBack);
    };

    public onGameStart = (callBack: (player: Player) => void): void => {
        this.on(RPSGameHubConstants.Methods.Server.GAME_START, callBack);
    };

    public onRoundConclusion = (callBack: (roundConclusion: RoundConclusionDTO) => void): void => {
        this.on(RPSGameHubConstants.Methods.Server.ROUND_CONCLUSION, callBack);
    };
}

export default RPSGameHubService;