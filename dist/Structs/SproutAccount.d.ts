import { type SproutAccountIntegrations } from "./Integrations";
type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export interface SproutAccountSettings {
    [key: string]: any;
}
export declare enum SproutAccountFlags {
    Administrator = "Administrator",
    Developer = "Developer"
}
export interface SproutAccount {
    UID: string;
    Username: string;
    Email: string | null;
    Avatar?: string;
    Flags: SproutAccountFlags[];
    Settings: SproutAccountSettings;
    Integrations: SproutAccountIntegrations;
    Verification: {
        Email: boolean;
    };
    Password: {
        Hash: string;
        Salt: string;
    } | null;
}
/**
 * PublicSproutAccount is a public version of the SproutAccount class
 * This is used to send account data to the client without revealing sensitive information
 *
 * @extends {Omit<NonFunctionProperties<SproutAccount>, 'Password'>}
 *
*/
export interface PublicSproutAccount extends Omit<NonFunctionProperties<SproutAccount>, 'Password'> {
    Public: boolean;
}
/**
 * GenericSproutAccount is a generic version of the SproutAccount class
 * This is used to send account data to other users without revealing (more) information
 *
 * @extends {Omit<NonFunctionProperties<SproutAccount>, 'Password' | 'Email' | 'Settings'>}
 *
*/
export interface GenericSproutAccount extends Omit<NonFunctionProperties<SproutAccount>, 'Password' | 'Email' | 'Settings' | 'Integrations'> {
    Generic: boolean;
}
interface RequiredInitFields {
    Username: string;
    Email?: string | null;
    Password?: {
        Hash: string;
        Salt: string;
    } | null;
}
export type InitalSproutAccount = Partial<SproutAccount> & RequiredInitFields;
/**
 * SproutAccount is arguably the most important class in the codebase.
 * This account is where all the user's data is stored, and it is the primary way to interact with the user.
 *
*/
export declare class SproutAccount implements SproutAccount {
    readonly Token?: string;
    constructor(UID: string, Init: Partial<SproutAccount> & RequiredInitFields, Token?: string);
    /**
     * FromID attempts to fetch a generic version of an account using its ID
     * Since the account will be generic, most information will be hidden unless an authenticated token for the account is provided
     *
     * @param {string} UID The UID of the account to load
     *
     * @returns {SproutAccount | null} The account that was loaded, or null if the account was not found
     *
    */
    static FromID(UID: string): Promise<SproutAccount | null>;
    /**
     * FromUsername attempts to fetch a generic version of an account using its username
     * Since the account will be generic, most information will be hidden unless an authenticated token for the account is provided
     *
     * @param {string} Username The username of the account to load
     *
     * @returns {SproutAccount | null} The account that was loaded, or null if the account was not found
     *
    */
    static FromUsername(Username: string): Promise<SproutAccount | null>;
    /**
     * FromToken attempts to fetch an account using an authentication token
     * This will return a public (and authenticated) version of the account, which includes most non-generic firleds
     *
     * @param {string} Token The token to authenticate the account with
     *
     * @returns {SproutAccount | null} The account that was loaded, or null if the token was invalid
     *
    */
    static FromToken(Token: string): Promise<SproutAccount | null>;
    /**
     * Delete deletes the account from the database
     * The account must have a token to be deleted
     *
     * @returns {boolean} Whether the account was deleted successfully
     *
    */
    Delete(): Promise<boolean>;
    /**
     * GetIntegrations attempts to get the latest service integrations if the account is authenticated
     * This is a wrapper of the GetAccountIntegrations function
     * This will also store the integrations in the account if successful
     *
     * @returns {SproutAccountIntegrations | null} The integrations that were fetched, or null if the account is not authenticated or an error occurred
     *
    */
    GetIntegrations(): Promise<SproutAccountIntegrations | null>;
    /**
     *
     * UpdateIntegrations attempts to update the service integrations for the account
     * This is a wrapper of the UpdateAccountIntegrations function
     * This will also update the existing integrations in the account with the new ones if successful
     *
     * @param {string} ServiceName The name of the service to update
     * @param {any} NewIntegrationData The new integration data to set - this will overwrite the existing data and must be serializable
     *
     * @returns {boolean} Whether the integrations were updated successfully
     *
    **/
    UpdateIntegrations(ServiceName: string, NewIntegrationData: any): Promise<boolean>;
    /**
     * ToPublic returns a public version of the account
     *
     * @returns {PublicSproutAccount} The public version of the account
     *
    */
    ToPublic(): PublicSproutAccount;
    /**
     * ToGeneric returns a generic version of the account
     *
     * @returns {GenericSproutAccount} The generic version of the account
     *
    */
    ToGeneric(): GenericSproutAccount;
}
export {};
