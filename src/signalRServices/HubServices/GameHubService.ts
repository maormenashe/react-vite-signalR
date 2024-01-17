import { GameHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class GameHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return GameHubConstants.HUB_ROUTE;
    }

    public onTickUpdate = (callBack: (value: number) => void): void => {
        this.on(GameHubConstants.Methods.Server.TICK, callBack);
    };
}

export default GameHubService;