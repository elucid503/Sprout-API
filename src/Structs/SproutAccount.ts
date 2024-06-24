import type { SproutAccountIntegrations } from "./Integrations";

// Typescript voodoo 

type NonFunctionPropertyNames<T> = { 

    [K in keyof T]: T[K] extends Function ? never : K;

}[keyof T];  

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// Real types 

export enum AccountCreationErrors {

    InternalError = "InternalError",
    AccountNotFound = "AccountNotFound",
    InvalidPassword = "InvalidPassword"

}

export interface SproutAccountSettings {

    // Nothing yet...

}

export enum SproutAccountFlags {

    Administrator = "Administrator",
    Developer = "Developer",

}

export interface SproutAccount {

    // Identification

    UID: string;

    Username: string;
    Email: string;  

    // Flags

    Flags: SproutAccountFlags[];

    // Personal Information

    Settings: SproutAccountSettings;

    // Integrations

    Integrations: SproutAccountIntegrations;

    // Verification

    Verification: {

        Email: boolean;

    };

    // Authentication

    Password: {

        Hash: string;
        Salt: string;

    };

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

export interface GenericSproutAccount extends Omit<NonFunctionProperties<SproutAccount>, 'Password' | 'Email' | 'Settings' | 'Integrations' > {

    Generic: boolean;

}

interface RequiredInitFields {

    Username: string;
    Email: string;

    Password: {

        Hash: string;
        Salt: string;

    };

}

export type InitalSproutAccount = Partial<SproutAccount> & RequiredInitFields;

/**
 * SproutAccount is arguably the most important class in the codebase.
 * This account is where all the user's data is stored, and it is the primary way to interact with the user.
 * 
*/

export class SproutAccount implements SproutAccount {

    constructor(UID: string, Init: Partial<SproutAccount> & RequiredInitFields) {

        this.UID = UID;

        this.Username = Init.Username;
        this.Email = Init.Email;

        this.Flags = Init.Flags || [];

        this.Integrations = Init.Integrations || {};

        this.Settings = Init.Settings || {};

        this.Verification = Init.Verification || { Email: false };

        this.Password = Init.Password;

    }

    /**
     * FromID attempts to load an account from the database using the provided UID
     * 
     * @param {string} UID The UID of the account to load
     * 
     * @returns {SproutAccount | null} The account that was loaded, or null if the account was not found
     * 
    */

    static async FromID(UID: string): Promise<SproutAccount | null> {

        // MAKE REQUEST (replace Document)

        return new SproutAccount(UID, Document as unknown as SproutAccount);

    }

    /**
     * Save saves the account to the database
     * 
     * Will create a new account if the account does not exist
     * 
     * @returns {boolean} Whether the account was saved successfully
     * 
    */

    async Save(): Promise<boolean> {

        // Implement save route

        return true;

    }

    /**
     * Delete deletes the account from the database
     * 
     * @returns {boolean} Whether the account was deleted successfully
     * 
    */
    
    async Delete(): Promise<boolean> {

        // Implement delete route

        return true;
        
    }

    /**
     * ToPublic returns a public version of the account
     * 
     * @returns {PublicSproutAccount} The public version of the account
     * 
    */
    
    ToPublic(): PublicSproutAccount {

        return {

            UID: this.UID,

            Username: this.Username,
            Email: this.Email,

            Integrations: this.Integrations,

            Flags: this.Flags,

            Settings: this.Settings,
            
            Verification: this.Verification,

            Public: true

        } satisfies PublicSproutAccount;

    }

    /**
     * ToGeneric returns a generic version of the account
     * 
     * @returns {GenericSproutAccount} The generic version of the account
     * 
    */
    
    ToGeneric(): GenericSproutAccount {

        return {

            UID: this.UID,

            Username: this.Username,

            Flags: this.Flags,

            Verification: this.Verification,

            Generic: true

        } satisfies GenericSproutAccount;

    }

}