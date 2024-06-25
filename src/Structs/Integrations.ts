import { FetchRoutes } from "../Config/Routes";

export interface SproutAccountIntegrations {

    [key: string]: any;

}

export async function GetAccountIntegrations(AccountToken: string): Promise<SproutAccountIntegrations | null> {

    const APIRoutes = await FetchRoutes();

    if (!APIRoutes) return null;

    const Response = await fetch(APIRoutes["AccountIntegrations"]?.URL, {

        method: "GET",
        
        headers: {

            "Authorization": `Bearer ${AccountToken}`

        }

    }).catch((error) => {

        console.error("Sprout-Accounts: Failed to fetch account integrations", error);
        return null;

    });

    const JSON = await Response?.json().catch((error) => {

        console.error("Sprout-Accounts: Failed to parse account integrations", error);
        return null;

    });

    return JSON || null;

}