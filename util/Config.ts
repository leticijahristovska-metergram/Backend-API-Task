import * as dotenv from 'dotenv';
import {ERRORS} from "./Errors";

// Load environment variables from .env file into process.env
dotenv.config();

interface Config {
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

export function getConfig(): Config {
    const config = configs[env];

    if (!config.HOSTNAMEAPI) {
        throw new Error(ERRORS.HOSTNAMEAPI_UNDEFINED);
    }

    return config;
}