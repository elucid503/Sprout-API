/**
 * Logging levels for the application.
 * @enum {number}
 * 
 * @property {number} Info - Informational messages that represent the normal operation of the application.
 * @property {number} Warning - Potentially harmful situations that require attention but are not critical.
 * @property {number} Error - Error events that might still allow the application to continue running.
*/
export enum LogLevel {
    
    Info = 0,
    Warning = 1,
    Error = 2,

}