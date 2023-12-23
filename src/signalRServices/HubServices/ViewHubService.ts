import BaseHubService from "../base/BaseHubService";


class ViewHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return "https://localhost:7286/hubs/ViewHub"
    }

    public onViewCountUpdate = (callBack: (value: number) => void): void => {
        this.on("VIEW_COUNT_UPDATE", callBack);
    };

    public async notifyWatching(): Promise<void> {
        await this.signalRService.send("notifyWatching");
    }

    public async notifyWithArg(firstName: string, lastName: string): Promise<void> {
        await this.signalRService.send("NotifyWithArg", firstName, lastName);
    }
}

export default ViewHubService;