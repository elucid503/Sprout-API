import { FetchRoutes } from "../Config/Routes";
import { MakeRequest } from "../Functions/Request";
export async function GetAccountIntegrations(AccountToken) {
    const RouteList = await FetchRoutes();
    const Route = (RouteList || {})["GetAccountIntegrations"];
    const Response = await MakeRequest(Route, { "Authorization": `Bearer ${AccountToken}` }, {}, {});
    if (!Response)
        return null;
    return Response.Integrations || null;
}
export async function UpdateAccountIntegrations(ServiceName, NewIntegrationData, AccountToken) {
    const RouteList = await FetchRoutes();
    const Route = (RouteList || {})["UpdateAccountIntegrations"];
    const Response = await MakeRequest(Route, { "Authorization": `Bearer ${AccountToken}` }, {}, {}, {
        Service: ServiceName,
        Integrations: NewIntegrationData
    });
    if (!Response)
        return null;
    return Response.Integrations; // This route returns the updated integrations
}
