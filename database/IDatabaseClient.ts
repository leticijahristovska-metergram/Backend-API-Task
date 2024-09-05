/**
 * Interface representing a generic database client.
 * @interface
 */
export interface IDatabaseClient {
    /**
     * Establishes a connection to the database.
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     */
    connect(): Promise<void>;

    /**
     * Executes a SQL query on the database.
     * @param {string} query - The SQL query string to be executed.
     * @param {any[]} [params] - Optional parameters for the query.
     * @returns {Promise<QueryResult<T>>} A promise that resolves with the query result.
     * @template T - The type of the rows returned by the query.
     */
    query<T>(query: string, params?: any[]): Promise<QueryResult<T>>;

    /**
     * Closes the connection to the database.
     * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
     */
    disconnect(): Promise<void>;
}

/**
 * Interface representing the result of a database query.
 * @interface
 * @template T - The type of the rows in the result.
 */
export interface QueryResult<T> {
    /**
     * The rows returned by the query.
     * @type {T[]}
     */
    rows: T[];
}
