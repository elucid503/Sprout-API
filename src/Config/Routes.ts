import { RouteList } from "./Constants.json";

interface FetchedRoutes {

    FetchedData: SproutAPIRoutes | null,
    LastFetched: number

}

const CachedRoutes: FetchedRoutes = {

    FetchedData: null,
    LastFetched: 0

}

export interface SproutAPIRoute {

    CommonName: string,
    URL: string,

    Method: "GET" | "POST" | "PATCH" | "DELETE",    
    Description: string,

    ResponseType: "JSON" | "HTML" | "FILE",
    Authenticated: boolean

};

export interface SproutAPIRoutes {

    [key: string]: SproutAPIRoute

}

export async function FetchRoutes(): Promise<SproutAPIRoutes | null> {

    if (CachedRoutes.FetchedData && Date.now() - CachedRoutes.LastFetched < 300_000_000) return CachedRoutes.FetchedData; 

    const Response = await fetch(RouteList).catch((error) => {

        console.error("Sprout-API: Failed to fetch routes", error);
        return null;

    })

    if (!Response) return null;

    const JSON = await Response.json().catch((error) => {

        console.error("Sprout-API: Failed to parse routes", error);
        return null;

    });

    if (JSON) {

        CachedRoutes.FetchedData = JSON.Data?.Routes;
        CachedRoutes.LastFetched = Date.now();

    }

    return JSON || null as SproutAPIRoutes | null;
    
}