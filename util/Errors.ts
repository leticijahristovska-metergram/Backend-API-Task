export const ERRORS = {
    ENV_UNDEFINED: "Environment must be defined.",
    CONFIG_NOT_FOUND: (env: string) => `No configuration found for environment: ${env}`,
    HOSTNAMEAPI_UNDEFINED: "HOSTNAMEAPI must be defined in the environment variables.",
    CONNECTION_FAILED: 'Error connecting to PostgreSQL database.',
    QUERY_FAILED: 'PostgreSQL query error.',
    DISCONNECTION_FAILED: 'Error disconnecting from PostgreSQL database.',
};