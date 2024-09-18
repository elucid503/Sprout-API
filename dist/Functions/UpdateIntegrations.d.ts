import type { SproutAccountIntegrations } from "../Structs/Integrations";
import { type PublicSproutAccount, type SproutAccount } from "../Structs/SproutAccount";
export declare function ForciblyUpdateIntegrationsForAccount(YourAccount: SproutAccount, AccountToUpdate: SproutAccount | PublicSproutAccount, NewIntegrationData: {
    Integrations: any;
    Service: string;
}): Promise<SproutAccountIntegrations | null>;
