import { ViewHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class ViewHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return ViewHubConstants.HUB_ROUTE;
    }

    public onViewCountUpdate = (callBack: (value: number) => void): void => {
        this.on(ViewHubConstants.Methods.Server.VIEW_COUNT_UPDATE, callBack);
    };

    public async notifyWatching(): Promise<void> {
        await this.signalRService.send(ViewHubConstants.Methods.Client.NOTIFY_WATCHING);
    }

    public async notifyWithArg(firstName: string, lastName: string): Promise<void> {
        await this.signalRService.send(ViewHubConstants.Methods.Client.NOTIFY_WITH_ARG, firstName, lastName);
    }

    public async incrementServerView(): Promise<void> {
        await this.signalRService.send(ViewHubConstants.Methods.Client.INCREMENT_SERVER_VIEW);
    }
}

export default ViewHubService;