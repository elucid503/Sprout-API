import type { LogLevel } from "../Structs/Logging";

import Config from "../Config/Constants.json" with { type: "json" };

/**
 * Creates a new log message against a specific service registered with the Sprout Logging Relay.
 * 
 * @param ServiceUID - The UID of the service to log for. Must be valid and from the relay API
 * @param Level - The level of the log. Must be one of the LogLevel enum values.
 * @param Title - The title of the log. This should be a short description of the log entry.
 * @param Content - The content of the log. This should be a detailed description of the log entry.
 * @returns - A promise that resolves to true if the log was sent successfully, or false if there was an error. More info is logged to the console in case of an error.
*/
export async function Log(ServiceUID: string, Level: LogLevel, Title: string, Content: string): Promise<boolean> {

    const Route = `${Config.Microservices.LoggingRelay}/API/Services/${ServiceUID}/Logs/Create`;

    const Body = {

        Level: Level,
        Title: Title,
        Content: Content

    };

    const Response = await fetch(Route, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(Body)

    }).catch((ReqError) => {

        console.error("Sprout-API: Log create request error", ReqError);
        return null;

    });

    if (!Response || !Response.ok) {

        console.error("Sprout-API: Failed to send log", Response?.statusText);
        return false;

    }

    return true;
    
}