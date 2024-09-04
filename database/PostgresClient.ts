import {Pool, QueryResult as PGQueryResult} from 'pg';
import { IDatabaseClient } from './IDatabaseClient';
import * as dotenv from 'dotenv';
import {ERRORS} from "../util/Errors";

dotenv.config();

export class PostgresClient implements IDatabaseClient {
    private pool: Pool;

    constructor() {
        let host: string, port: number, user: string, password: string, database: string;
        const env = process.env.ENVIRONMENT;

        switch (process.env.ENVIRONMENT) {
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

    async connect(): Promise<void> {
        try {
            await this.pool.connect();
        } catch (err) {
            throw new Error(ERRORS.CONNECTION_FAILED);
        }
    }

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

    async disconnect(): Promise<void> {
        try {
            await this.pool.end();
        } catch (err) {
            throw new Error(ERRORS.DISCONNECTION_FAILED);
        }
    }
}