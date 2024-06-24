import { RouteList } from "./Constants.json";

export interface Routes {

    [key: string]: {

        URL: string,
        Method: "GET" | "POST" | "PUT" | "DELETE",
        Authenticated: boolean,
        ResponseType: "JSON" | "HTML" | "TEXT",

    };

}

export class Routes implements Routes {

    constructor() {

    }

    static async Fetch(): Promise<Routes | null> {

        const Response = await fetch(RouteList).catch((error) => {

            console.error("Sprout-Accounts: Failed to fetch routes", error);
            return null;

        })

        if (!Response) return null;

        const JSON = await Response.json().catch((error) => {

            console.error("Sprout-Accounts: Failed to parse routes", error);
            return null;

        });

        return JSON || null as Routes | null;
        
    }
    
}