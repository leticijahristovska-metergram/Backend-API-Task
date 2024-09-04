import { QueryResult as PGQueryResult } from 'pg';


export interface IDatabaseClient {
    connect(): Promise<void>;
    query<T>(query: string, params?: any[]): Promise<QueryResult<T>>;
    disconnect(): Promise<void>;
}

interface QueryResult<T> extends PGQueryResult<T> {
    rows: T[];
}