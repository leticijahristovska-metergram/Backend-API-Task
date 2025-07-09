/**
 * An object containing error messages used throughout the application.
 * @constant
 * @type {Object}
 * @property {string} ENV_UNDEFINED - Error message when the environment is not defined.
 * @property {function(string): string} CONFIG_NOT_FOUND - Error message for when a configuration is not found for a specific environment.
 * @property {string} HOSTNAMEAPI_UNDEFINED - Error message when HOSTNAMEAPI is not defined in the environment variables.
 * @property {string} QUERY_FAILED - Error message for database query execution failure.
 * @property {string} DISCONNECTION_FAILED - Error message for database disconnection failure.
 * @property {string} CONNECTION_FAILED - Error message for failure to establish a database connection.
 * @property {string} CONNECTION_NOT_FOUND - Error message when no active database connection is found.
 */
export const ERRORS = {
    ENV_UNDEFINED: "Environment must be defined.",
    CONFIG_NOT_FOUND: (env: string) => `No configuration found for environment: ${env}`,
    HOSTNAMEAPI_UNDEFINED: "HOSTNAMEAPI must be defined in the environment variables.",
    TESTUSERNAME_UNDEFINED: "TESTUSERNAME must be defined in the environment variables.",
    PASSWORD_UNDEFINED: "PASSWORD must be defined in the environment variables.",
    QUERY_FAILED: 'An error occurred while executing the database query.',
    DISCONNECTION_FAILED: 'Error disconnecting from the database.',
    CONNECTION_FAILED: 'Failed to establish a connection to the database.',
    CONNECTION_NOT_FOUND: 'No active database connection found.',
};
