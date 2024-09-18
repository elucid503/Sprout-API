export interface SproutAccountIntegrations {
    [key: string]: any;
}
export declare function GetAccountIntegrations(AccountToken: string): Promise<SproutAccountIntegrations | null>;
export declare function UpdateAccountIntegrations(ServiceName: string, NewIntegrationData: any, AccountToken: string): Promise<SproutAccountIntegrations | null>;
