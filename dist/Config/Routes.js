import { RouteList } from "./Constants.json";
const CachedRoutes = {
    FetchedData: null,
    LastFetched: 0
};
;
export async function FetchRoutes() {
    if (CachedRoutes.FetchedData && Date.now() - CachedRoutes.LastFetched < 300_000_000)
        return CachedRoutes.FetchedData;
    const Response = await fetch(RouteList).catch((error) => {
        console.error("Sprout-API: Failed to fetch routes", error);
        return null;
    });
    if (!Response)
        return null;
    const JSON = await Response.json().catch((error) => {
        console.error("Sprout-API: Failed to parse routes", error);
        return null;
    });
    if (JSON) {
        CachedRoutes.FetchedData = JSON.Data?.Routes;
        CachedRoutes.LastFetched = Date.now();
    }
    return CachedRoutes.FetchedData || null;
}