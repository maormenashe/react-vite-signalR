import { VotePosition } from "../../HubModels/VoteHub/VoteHubBase";
import { VoteHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class VoteHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return VoteHubConstants.HUB_ROUTE;
    }

    public onUpdateVotes = (callBack: (votePosition: VotePosition) => void): void => {
        this.on(VoteHubConstants.Methods.Server.UPDATE_VOTES, callBack);
    };

    public getCurrentVotes = async (): Promise<VotePosition> => {
        return await this.signalRService.invoke(VoteHubConstants.Methods.Client.GET_CURRENT_VOTES);
    }
}

export default VoteHubService;