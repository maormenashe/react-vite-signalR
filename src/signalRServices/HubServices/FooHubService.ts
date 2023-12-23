import BaseHubService from "../base/BaseHubService";

class FooHubService extends BaseHubService {
    private constructor() {
        super();
    }

    startConnection = async () => {
        await this.signalRService.startConnection();
    }
}

export default FooHubService;