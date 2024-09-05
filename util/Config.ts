import * as dotenv from 'dotenv';
import { ERRORS } from "./Errors";

dotenv.config();

/**
 * Interface representing configuration for different environments.
 * @interface
 */
interface Config {
    /**
     * The hostname for the API.
     * @type {string}
     */
    HOSTNAMEAPI: string;
}

const env = process.env.ENVIRONMENT;
if (!env) {
    throw new Error(ERRORS.ENV_UNDEFINED);
}

const configs: { [key: string]: Config } = {
    dev: {
        HOSTNAMEAPI: process.env.HOSTNAMEAPI || (() => { throw new Error(ERRORS.HOSTNAMEAPI_UNDEFINED); })(),
    },
    test: {
        HOSTNAMEAPI: process.env.HOSTNAMEAPI || (() => { throw new Error(ERRORS.HOSTNAMEAPI_UNDEFINED); })(),
    },
};

if (!configs[env]) {
    throw new Error(ERRORS.CONFIG_NOT_FOUND(env));
}

/**
 * Retrieves the configuration object based on the current environment.
 * @returns {Config} The configuration object for the current environment.
 * @throws {Error} Throws an error if the configuration or required environment variables are missing.
 */
export function getConfig(): Config {
    const config = configs[env];

    if (!config.HOSTNAMEAPI) {
        throw new Error(ERRORS.HOSTNAMEAPI_UNDEFINED);
    }

    return config;
}
