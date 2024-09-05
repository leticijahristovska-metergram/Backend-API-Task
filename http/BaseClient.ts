import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getConfig} from "../util/Config";

class BaseClient {
    protected baseUrl: string;
    private httpRequestHeaders: Record<string, string>;
    private restInstance: AxiosInstance;

    constructor() {
        const config = getConfig();
        this.baseUrl = config.HOSTNAMEAPI;
        this.httpRequestHeaders = {};
        this.restInstance = axios.create({
            baseURL: config.HOSTNAMEAPI
        });
    }

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

    private async handleRequestReturnList<T>(route: string, method: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: route,
            method: method,
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    async postAndReturnListResponse<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        return await this.handleRequestReturnList<T>(route, 'post', body);
    }

    async putAndReturnListResponse<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        return await this.handleRequestReturnList<T>(route, 'put', body);
    }

    async getAllReturnListResponse<T>(route: string): Promise<AxiosResponse<T> | null> {
        return await this.handleRequestReturnList<T>(route, 'get', null);
    }

    async post<T>(route: string, body: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'post',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    async get<T>(route: string): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'get',
            headers: this.httpRequestHeaders
        };
        return await this.handleRequest<T>(config);
    }

    async delete<T>(route: string, body?: any): Promise<AxiosResponse<T> | null> {
        const config: AxiosRequestConfig = {
            url: this.baseUrl + route,
            method: 'delete',
            headers: this.httpRequestHeaders,
            data: body
        };
        return await this.handleRequest<T>(config);
    }

    addHeader(key: string, value: string): void {
        this.httpRequestHeaders[key] = value;
    }
}

export default BaseClient;
