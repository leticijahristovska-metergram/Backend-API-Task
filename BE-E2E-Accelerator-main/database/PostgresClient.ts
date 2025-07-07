import { Pool, QueryResult as PGQueryResult } from 'pg';
import { IDatabaseClient } from './IDatabaseClient';
import * as dotenv from 'dotenv';
import { ERRORS } from "../util/Errors";

dotenv.config();

/**
 * A PostgreSQL client implementation for interacting with a PostgreSQL database.
 * Implements the {@link IDatabaseClient} interface.
 * @implements {IDatabaseClient}
 */
export class PostgresClient implements IDatabaseClient {
    private pool: Pool;

    /**
     * Creates an instance of the PostgresClient.
     * Initializes the database connection pool based on the current environment.
     * @throws {Error} Throws an error if the configuration for the environment is not found.
     */
    constructor() {
        let host: string, port: number, user: string, password: string, database: string;
        const env = process.env.ENVIRONMENT;

        switch (env) {
            case 'dev':
                host = process.env.DEV_DB_HOST!;
                port = parseInt(process.env.DEV_DB_PORT!, 10);
                user = process.env.DEV_DB_USER!;
                password = process.env.DEV_DB_PASSWORD!;
                database = process.env.DEV_DB_DATABASE!;
                break;
            case 'test':
                host = process.env.TEST_DB_HOST!;
                port = parseInt(process.env.TEST_DB_PORT!, 10);
                user = process.env.TEST_DB_USER!;
                password = process.env.TEST_DB_PASSWORD!;
                database = process.env.TEST_DB_DATABASE!;
                break;
            default:
                throw new Error(ERRORS.CONFIG_NOT_FOUND(env));
        }

        this.pool = new Pool({
            host,
            port,
            user,
            password,
            database,
        });
    }

    /**
     * Establishes a connection to the PostgreSQL database.
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     * @throws {Error} Throws an error if the connection fails.
     */
    async connect(): Promise<void> {
        try {
            await this.pool.connect();
        } catch (err) {
            throw new Error(ERRORS.CONNECTION_FAILED);
        }
    }

    /**
     * Executes a SQL query on the PostgreSQL database.
     * @param {string} query - The SQL query string to be executed.
     * @param {any[]} [params] - Optional parameters for the query.
     * @returns {Promise<PGQueryResult<T>>} A promise that resolves with the query result.
     * @template T - The type of the rows returned by the query.
     * @throws {Error} Throws an error if the query execution fails.
     */
    async query<T>(query: string, params?: any[]): Promise<PGQueryResult<T>> {
        try {
            const result: PGQueryResult<T> = await this.pool.query<T>(query, params);
            return {
                rows: result.rows,
                command: result.command,
                rowCount: result.rowCount,
                oid: result.oid,
                fields: result.fields
            };
        } catch (err) {
            throw new Error(ERRORS.QUERY_FAILED);
        }
    }

    /**
     * Closes the connection to the PostgreSQL database.
     * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
     * @throws {Error} Throws an error if the disconnection fails.
     */
    async disconnect(): Promise<void> {
        try {
            await this.pool.end();
        } catch (err) {
            throw new Error(ERRORS.DISCONNECTION_FAILED);
        }
    }
}
