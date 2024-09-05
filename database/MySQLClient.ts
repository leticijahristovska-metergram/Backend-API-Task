import { Pool, createPool, RowDataPacket } from 'mysql2/promise';
import { IDatabaseClient, QueryResult } from './IDatabaseClient';
import * as dotenv from 'dotenv';
import { ERRORS } from '../util/Errors';

dotenv.config();

/**
 * A MySQL client implementation for interacting with a MySQL database.
 * Implements the {@link IDatabaseClient} interface.
 * @implements {IDatabaseClient}
 */
export class MysqlClient implements IDatabaseClient {
    private pool: Pool;

    /**
     * Creates an instance of the MysqlClient.
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

        this.pool = createPool({
            host,
            port,
            user,
            password,
            database,
        });
    }

    /**
     * Establishes a connection to the MySQL database.
     * This method is a no-op since the connection pool is managed automatically.
     * @returns {Promise<void>} A promise that resolves immediately as no action is required.
     */
    async connect(): Promise<void> {
        // The connection is managed by the pool, so no action is needed here.
        return;
    }

    /**
     * Executes a SQL query on the MySQL database.
     * @param {string} query - The SQL query string to be executed.
     * @param {any[]} [params] - Optional parameters for the query.
     * @returns {Promise<QueryResult<T>>} A promise that resolves with the query result.
     * @template T - The type of the rows returned by the query.
     * @throws {Error} Throws an error if the query execution fails.
     */
    async query<T>(query: string, params?: any[]): Promise<QueryResult<T>> {
        try {
            const [rows] = await this.pool.query<RowDataPacket[]>(query, params);
            return { rows: rows as unknown as T[] };
        } catch (err) {
            throw new Error(ERRORS.QUERY_FAILED);
        }
    }

    /**
     * Closes the connection pool to the MySQL database.
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
