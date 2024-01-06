import { GetFullNameMethodRequest } from "../../HubModels/StringToolsHub/MethodModels/GetFullNameMethod/GetFullNameMethodRequest";
import { GetFullNameMethodResponse } from "../../HubModels/StringToolsHub/MethodModels/GetFullNameMethod/GetFullNameMethodResponse";
import { StringToolsHubConstants } from "../../constants/hubs.constants";
import BaseHubService from "../base/BaseHubService";

class StringToolsHubService extends BaseHubService {
    private constructor() {
        super();
    }

    protected getHubRoute(): string {
        return StringToolsHubConstants.HUB_ROUTE;
    }

    public async getFullName(methodRequest: GetFullNameMethodRequest): Promise<GetFullNameMethodResponse> {
        return await this.signalRService.invoke(StringToolsHubConstants.Methods.Client.GET_FULL_NAME, methodRequest);
    }
}

export default StringToolsHubService;