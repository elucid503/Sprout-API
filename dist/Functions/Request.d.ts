import type { SproutAPIRoute } from "../Config/Routes";
export declare function MakeRequest(Route: SproutAPIRoute, Headers: {
    [key: string]: string;
}, QueryParams: {
    [key: string]: string;
}, PathParams: {
    [key: string]: string;
}, Body?: any): Promise<any>;
