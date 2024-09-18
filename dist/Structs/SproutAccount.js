import { FetchRoutes } from "../Config/Routes";
import { MakeRequest } from "../Functions/Request";
import { GetAccountIntegrations, UpdateAccountIntegrations } from "./Integrations";
export var SproutAccountFlags;
(function (SproutAccountFlags) {
    SproutAccountFlags["Administrator"] = "Administrator";
    SproutAccountFlags["Developer"] = "Developer";
})(SproutAccountFlags || (SproutAccountFlags = {}));
/**
 * SproutAccount is arguably the most important class in the codebase.
 * This account is where all the user's data is stored, and it is the primary way to interact with the user.
 *
*/
export class SproutAccount {
    Token;
    constructor(UID, Init, Token) {
        this.UID = UID;
        this.Username = Init.Username;
        this.Email = Init.Email || null; // Not in generic init fields 
        this.Flags = Init.Flags || [];
        this.Integrations = Init.Integrations || {};
        this.Settings = Init.Settings || {};
        this.Verification = Init.Verification || { Email: false };
        this.Password = Init.Password || null; // Not in generic init fields
        this.Token = Token;
    }
    /**
     * FromID attempts to fetch a generic version of an account using its ID
     * Since the account will be generic, most information will be hidden unless an authenticated token for the account is provided
     *
     * @param {string} UID The UID of the account to load
     *
     * @returns {SproutAccount | null} The account that was loaded, or null if the account was not found
     *
    */
    static async FromID(UID) {
        const RouteList = await FetchRoutes();
        const Route = (RouteList || {})["FetchAccountByID"];
        if (!Route)
            return null;
        const Response = await MakeRequest(Route, {}, {}, { id: UID });
        if (!Response || !Response?.Account) {
            console.error("Sprout-API: Failed to fetch an account by ID");
            return null;
        }
        ;
        return new SproutAccount(UID, Response.Account);
    }
    /**
     * FromUsername attempts to fetch a generic version of an account using its username
     * Since the account will be generic, most information will be hidden unless an authenticated token for the account is provided
     *
     * @param {string} Username The username of the account to load
     *
     * @returns {SproutAccount | null} The account that was loaded, or null if the account was not found
     *
    */
    static async FromUsername(Username) {
        const RouteList = await FetchRoutes();
        const Route = (RouteList || {})["FetchAccountByUsername"];
        if (!Route)
            return null;
        const Response = await MakeRequest(Route, {}, {}, { username: Username });
        if (!Response || !Response?.Account) {
            console.error("Sprout-API: Failed to fetch an account by username");
            return null;
        }
        return new SproutAccount(Response.Account.UID, Response.Account);
    }
    /**
     * FromToken attempts to fetch an account using an authentication token
     * This will return a public (and authenticated) version of the account, which includes most non-generic firleds
     *
     * @param {string} Token The token to authenticate the account with
     *
     * @returns {SproutAccount | null} The account that was loaded, or null if the token was invalid
     *
    */
    static async FromToken(Token) {
        const RouteList = await FetchRoutes();
        const Route = (RouteList || {})["FetchMyAccount"];
        if (!Route)
            return null;
        const Response = await MakeRequest(Route, { "Authorization": `Bearer ${Token}` }, {}, {});
        if (!Response || !Response?.Account) {
            console.error("Sprout-API: Failed to fetch an account by token");
            return null;
        }
        // Initting the account with the token will allow it to perform authenticated actions
        return new SproutAccount(Response.Account.UID, Response.Account, Token);
    }
    /**
     * Delete deletes the account from the database
     * The account must have a token to be deleted
     *
     * @returns {boolean} Whether the account was deleted successfully
     *
    */
    async Delete() {
        if (!this.Token) {
            console.error("Sprout-API: Cannot delete account without token");
            return false;
        }
        ;
        const RouteList = await FetchRoutes();
        const Route = (RouteList || {})["DeleteAccount"];
        if (!Route)
            return false;
        const Response = await MakeRequest(Route, {
            Authorization: `Bearer ${this.Token}`
        }, {}, {});
        if (!Response || !Response?.Success) {
            console.error("Sprout-API: Failed to delete an account");
            return false;
        }
        return true;
    }
    /**
     * GetIntegrations attempts to get the latest service integrations if the account is authenticated
     * This is a wrapper of the GetAccountIntegrations function
     * This will also store the integrations in the account if successful
     *
     * @returns {SproutAccountIntegrations | null} The integrations that were fetched, or null if the account is not authenticated or an error occurred
     *
    */
    async GetIntegrations() {
        if (!this.Token) {
            console.error("Sprout-API: Cannot get integrations without token");
            return null;
        }
        const Integrations = await GetAccountIntegrations(this.Token);
        if (!Integrations) {
            console.error("Sprout-API: Failed to get integrations");
            return null;
        }
        this.Integrations = Integrations;
        return Integrations;
    }
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
    async UpdateIntegrations(ServiceName, NewIntegrationData) {
        if (!this.Token) {
            console.error("Sprout-API: Cannot update integrations without token");
            return false;
        }
        const NewIntegrations = UpdateAccountIntegrations(ServiceName, NewIntegrationData, this.Token);
        if (!NewIntegrations) {
            console.error("Sprout-API: Failed to update integrations");
            return false;
        }
        this.Integrations = NewIntegrations;
        return true;
    }
    /**
     * ToPublic returns a public version of the account
     *
     * @returns {PublicSproutAccount} The public version of the account
     *
    */
    ToPublic() {
        return {
            UID: this.UID,
            Username: this.Username,
            Email: this.Email,
            Integrations: this.Integrations,
            Flags: this.Flags,
            Settings: this.Settings,
            Verification: this.Verification,
            Public: true
        };
    }
    /**
     * ToGeneric returns a generic version of the account
     *
     * @returns {GenericSproutAccount} The generic version of the account
     *
    */
    ToGeneric() {
        return {
            UID: this.UID,
            Username: this.Username,
            Flags: this.Flags,
            Verification: this.Verification,
            Generic: true
        };
    }
}
