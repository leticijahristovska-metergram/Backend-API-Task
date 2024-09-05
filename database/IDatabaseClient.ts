export interface IDatabaseClient {
    connect(): Promise<void>;
    query<T>(query: string, params?: any[]): Promise<QueryResult<T>>;
    disconnect(): Promise<void>;
}

export interface QueryResult<T> {
    rows: T[];
}