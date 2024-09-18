import { SproutAccountFlags } from "../Structs/SproutAccount";
import { MakeRequest } from "./Request";
import { FetchRoutes } from "../Config/Routes";
export async function ForciblyUpdateIntegrationsForAccount(YourAccount, AccountToUpdate, NewIntegrationData) {
    if (!YourAccount.Flags.includes(SproutAccountFlags.Developer)) {
        console.error(`Sprout-API: Account ${YourAccount.Username} attempted to forcibly update integrations for account ${AccountToUpdate.Username} without developer permissions`);
        return null;
    }
    if (!YourAccount.Token) {
        console.error("Sprout-API: Cannot forcibly update integrations without token");
        return null;
    }
    const Routes = await FetchRoutes();
    const UpdateIntegrationsForciblyRoute = (Routes || {})["ManageIntegrationsByID"];
    if (!UpdateIntegrationsForciblyRoute) {
        console.error("Sprout-API: Failed to find route for forcibly updating integrations");
        return null;
    }
    const Response = await MakeRequest(UpdateIntegrationsForciblyRoute, {
        Authorization: `Bearer ${YourAccount.Token}`,
    }, {}, { "id": AccountToUpdate.UID }, {
        Integrations: NewIntegrationData.Integrations,
        Service: NewIntegrationData.Service
    });
    if (!Response) {
        console.error("Sprout-API: Failed to forcibly update integrations");
        return null;
    }
    return Response?.Integrations;
}
