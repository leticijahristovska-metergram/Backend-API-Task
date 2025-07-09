import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getConfig } from "../util/Config";

/**
 * Base class for handling HTTP requests using Axios.
 * Configures and manages Axios instances for making API calls.
 */
class BaseClient {
    protected baseUrl: string;
    private httpRequestHeaders: Record<string, string>;
    private restInstance: AxiosInstance;

    /**
     * Creates an instance of the BaseClient.
     * Initializes the Axios instance with the base URL from the configuration.
     */
    constructor() {
        const config = getConfig();
        this.baseUrl = config.HOSTNAMEAPI;
        this.httpRequestHeaders = {};
        this.restInstance = axios.create({
            baseURL: config.HOSTNAMEAPI
        });
    }

    /**
     * Handles an Axios request with the provided configuration.
     * @param {AxiosRequestConfig} config - The Axios request configuration.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @private
     * @template T - The type of the response data.
     */
    private async handleRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T> | null> {
        try {
            return await this.restInstance.request<T>(config);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return error.response;
                }
            }
            return null;
        }
    }

    /**
     * Handles an Axios request to a specific route with a method and body.
     * @param {string} route - The API route.
     * @param {string} method - The HTTP method (e.g., 'post', 'put', 'get').
     * @param {any} body - The request body (if applicable).
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @private
     * @template T - The type of the response data.
     */
    private async handleRequestReturnList<T>(route: string, method: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: route,
            method: method,
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    /**
     * Makes a POST request and returns the response.
     * @param {string} route - The API route.
     * @param {any} body - The request body.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async postAndReturnListResponse<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        return await this.handleRequestReturnList<T>(route, 'post', body);
    }

    /**
     * Makes a PUT request and returns the response.
     * @param {string} route - The API route.
     * @param {any} body - The request body.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async putAndReturnListResponse<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        return await this.handleRequestReturnList<T>(route, 'put', body);
    }

    /**
     * Makes a GET request and returns the response.
     * @param {string} route - The API route.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async getAllReturnListResponse<T>(route: string): Promise<AxiosResponse<T> | null> {
        return await this.handleRequestReturnList<T>(route, 'get', null);
    }

    /**
     * Makes a POST request to a specific route.
     * @param {string} route - The API route.
     * @param {any} body - The request body.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async post<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'post',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    /**
     * Makes a GET request to a specific route.
     * @param {string} route - The API route.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async get<T>(route: string): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'get',
            headers: this.httpRequestHeaders
        };
        return await this.handleRequest<T>(config);
    }

    /**
     * Makes a DELETE request to a specific route.
     * @param {string} route - The API route.
     * @param {any} [body] - Optional request body.
     * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves with the Axios response or null if an error occurs.
     * @template T - The type of the response data.
     */
    async delete<T>(route: string, body?: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'delete',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }
    /**
     * Adds a custom header to be used in HTTP requests.
     * @param {string} key - The header name.
     * @param {string} value - The header value.
     */
    addHeader(key: string, value: string): void {
        this.httpRequestHeaders[key] = value;
    }

    /**
    * Sends a PATCH request to the specified route with the given request body.
    * @template T The expected response data type.
    * @param {string} route - The API route (path) to send the PATCH request to.
    * @param {any} body - The request payload to send in the PATCH request.
    * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves to the Axios response containing data of type T, or null if the request fails.
    */
    async patch<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'patch',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    /**
    * Sends a PUT request to the specified route with the given request body.
    * @template T The expected response data type.
    * @param {string} route - The API route (path) to send the PUT request to.
    * @param {any} body - The request payload to send in the PUT request.
    * @returns {Promise<AxiosResponse<T> | null>} A promise that resolves to the Axios response containing data of type T, or null if the request fails.
    */
    async put<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'put',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }
}

export default BaseClient;