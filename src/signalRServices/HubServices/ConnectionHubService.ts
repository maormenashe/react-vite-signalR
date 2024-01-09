import { ConnectionHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class ViewHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return ConnectionHubConstants.HUB_ROUTE;
    }

    public onConnectionCountUpdate = (callBack: (value: number) => void): void => {
        this.on(ConnectionHubConstants.Methods.Server.CONNECTION_COUNT_UPDATE, callBack);
    };
}

export default ViewHubService;