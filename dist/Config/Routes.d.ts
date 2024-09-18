export interface SproutAPIRoute {
    CommonName: string;
    URL: string;
    Method: "GET" | "POST" | "PATCH" | "DELETE";
    Description: string;
    ResponseType: "JSON" | "HTML" | "FILE";
    Authenticated: boolean;
}
export interface SproutAPIRoutes {
    [key: string]: SproutAPIRoute;
}
export declare function FetchRoutes(): Promise<SproutAPIRoutes | null>;
