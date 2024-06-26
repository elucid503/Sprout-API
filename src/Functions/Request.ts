import type { SproutAPIRoute } from "../Config/Routes";

export async function MakeRequest(Route: SproutAPIRoute, Headers: { [key: string]: string }, QueryParams: { [key: string]: string }, PathParams: { [key: string]: string }, Body?: any): Promise<any> {

    if (Route.Authenticated && !Headers["Authorization"]) {

        console.error(`Sprout-Accounts: Route ${Route.CommonName} requires authentication, but no token was provided`);
        return null;

    };

    const QueryString = new URLSearchParams(QueryParams).toString();
    const NewURLWithPathParamsReplaced = Route.URL.replace(/:([a-zA-Z0-9]+)/g, (Match, Key) => PathParams[Key] || Match);

    const Response = await fetch(`${NewURLWithPathParamsReplaced}?${QueryString}`, {

        method: Route.Method,
        headers: Headers,
        body: Body ? JSON.stringify(Body) : undefined

    }).catch(() => null);

    if (!Response?.ok) return null;

    return await Response.json().catch(() => null);

}