export const ERRORS = {
    ENV_UNDEFINED: "Environment must be defined.",
    CONFIG_NOT_FOUND: (env: string) => `No configuration found for environment: ${env}`,
    HOSTNAMEAPI_UNDEFINED: "HOSTNAMEAPI must be defined in the environment variables.",
    QUERY_FAILED: 'An error occurred while executing the database query.',
    DISCONNECTION_FAILED: 'Error disconnecting from the database.',
    CONNECTION_FAILED: 'Failed to establish a connection to the database.',
    CONNECTION_NOT_FOUND: 'No active database connection found.',
};
