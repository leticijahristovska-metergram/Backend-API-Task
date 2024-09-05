import * as oracledb from 'oracledb';
import { IDatabaseClient, QueryResult } from './IDatabaseClient';
import * as dotenv from 'dotenv';
import { ERRORS } from '../util/Errors';

dotenv.config();

export class OracleClient implements IDatabaseClient {
    private connection: oracledb.Connection | null = null;

    constructor() {
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT; // Use object format for rows
    }

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
