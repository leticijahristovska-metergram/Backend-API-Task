import * as oracledb from 'oracledb';
import { IDatabaseClient, QueryResult } from './IDatabaseClient';
import * as dotenv from 'dotenv';
import { ERRORS } from '../util/Errors';

dotenv.config();

/**
 * An Oracle Database client implementation for interacting with an Oracle database.
 * Implements the {@link IDatabaseClient} interface.
 * @implements {IDatabaseClient}
 */
export class OracleClient implements IDatabaseClient {
    private connection: oracledb.Connection | null = null;

    /**
     * Creates an instance of the OracleClient.
     * Configures the OracleDB to return rows in object format.
     */
    constructor() {
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT; // Use object format for rows
    }

    /**
     * Establishes a connection to the Oracle database.
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     * @throws {Error} Throws an error if the connection fails.
     */
    async connect(): Promise<void> {
        try {
            this.connection = await oracledb.getConnection({
                user: process.env.ORACLE_DB_USER,
                password: process.env.ORACLE_DB_PASSWORD,
                connectString: process.env.ORACLE_DB_CONNECTION_STRING,
            });
        } catch (err) {
            throw new Error(ERRORS.CONNECTION_FAILED);
        }
    }

    /**
     * Executes a SQL query on the Oracle database.
     * @param {string} query - The SQL query string to be executed.
     * @param {any[]} [params] - Optional parameters for the query.
     * @returns {Promise<QueryResult<T>>} A promise that resolves with the query result.
     * @template T - The type of the rows returned by the query.
     * @throws {Error} Throws an error if the query execution fails or if the connection is not found.
     */
    async query<T>(query: string, params?: any[]): Promise<QueryResult<T>> {
        if (!this.connection) {
            throw new Error(ERRORS.CONNECTION_NOT_FOUND);
        }

        try {
            const result = await this.connection.execute(query, params || []);
            return { rows: result.rows as T[] };
        } catch (err) {
            throw new Error(ERRORS.QUERY_FAILED);
        }
    }

    /**
     * Closes the connection to the Oracle database.
     * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
     * @throws {Error} Throws an error if the disconnection fails.
     */
    async disconnect(): Promise<void> {
        if (this.connection) {
            try {
                await this.connection.close();
            } catch (err) {
                throw new Error(ERRORS.DISCONNECTION_FAILED);
            }
        }
    }
}
