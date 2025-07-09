import BaseClient from "./BaseClient";
import { ResponseEntity } from "express";
import { getConfig } from "../util/Config";
import { GetUserResponseBody } from "../model/get/GetUserResponseBody";
import { PostAuthRequestBody } from "../model/http/PostAuthRequestBody";
import { PostAuthResponseBody } from "../model/http/PostAuthResponseBody";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AddUserRequestBody } from "../model/create/AddUserRequestBody";
import { UpdateUserRequestBody } from "../model/update/UpdateUserRequestBody";
import { DeleteUserResponseBody } from "../model/delete/DeleteUserResponseBody";
import { GetProductListResponse } from "../model/get/GetProductListResponseBody";
import { GetAllProductsCategoriesResponse } from "../model/get/GetAllProductsCategoriesResponse";
import { AddProductRequestBody } from "../model/create/AddProductRequestBody";
import { GetProductResponseBody } from "../model/get/GetProductResponseBody";
import { UpdateProductRequestBody } from "../model/update/UpdateProductRequestBody";
import { DeleteProductResponseBody } from "../model/delete/DeleteProductResponseBody";

/**
 * Extends BaseClient to provide additional functionality for interacting with the Metergram API.
 */

export class MetergramClient extends BaseClient {
    private static readonly authenticate = "auth/login";
    private Token: string = "";

    public getToken(): string {
        return this.Token;
    }

    private postAuthRequestBody: PostAuthRequestBody = {
        username: "",
        password: ""
    };

    /**
     * Creates an instance of the MetergramClient.
     * Initializes headers and base URL for API requests.
     */
    constructor() {
        super();
        const config = getConfig();
        this.baseUrl = config.HOSTNAMEAPI;
        this.postAuthRequestBody.username = config.TESTUSERNAME || "";
        this.postAuthRequestBody.password = config.PASSWORD || "";

        this.addHeader("Content-Type", "application/json");
    }
    /**
     * Initializes the client by authenticating with the API and setting the Authorization header.
     * @returns {Promise<AxiosResponse<PostAuthResponseBody>>} The response from the authentication endpoint.
     * @throws Will throw an error if authentication fails.
     */
    async init(): Promise<AxiosResponse<PostAuthResponseBody>> {
        const response = await this.authenticateOnTheSite(this.postAuthRequestBody);
        if (response && response.data?.accessToken) {
            this.addHeader("Authorization", `Bearer ${this.getToken()}`);
        }
        return response;
    }

    /**
     * Fetches user details by user ID.
     * @param {number} id - The ID of the user to fetch.
     * @returns {Promise<ResponseEntity<GetUserResponseBody>>} The response entity containing the user details.
     * @throws Will throw an error if the request fails.
     */
    public async getUserById(id: number): Promise<ResponseEntity<GetUserResponseBody>> {
        try {
            return await this.get(`users/${id}`);
        } catch (error) {
            throw new Error(`Failed to get user by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Adds a new user with the given data.
     * @param {AddUserRequestBody} body - The user data to add.
     * @returns {Promise<ResponseEntity<GetUserResponseBody>>} The response entity containing the newly added user.
     * @throws Will throw an error if the request fails.
     */
    public async addUser(body: AddUserRequestBody): Promise<ResponseEntity<GetUserResponseBody>> {
        try {
            return await this.post("users/add", body);
        } catch (error) {
            throw new Error(`Failed to add user: ${(error as Error).message}`);
        }
    }
    /**
     * Deletes a user by user ID.
     * @param {number} id - The ID of the user to delete.
     * @returns {Promise<ResponseEntity<DeleteUserResponseBody>>} The response entity confirming deletion.
     * @throws Will throw an error if the request fails.
     */
    public async deleteUserById(id: number): Promise<ResponseEntity<DeleteUserResponseBody>> {
        try {
            return await this.delete(`users/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete user by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Retrieves all product categories.
     * @returns {Promise<ResponseEntity<GetAllProductsCategoriesResponse>>} The response entity containing all product categories.
     * @throws Will throw an error if the request fails.
     */
    public async getProductsCategories(): Promise<ResponseEntity<GetAllProductsCategoriesResponse>> {
        try {
            return await this.get("products/categories");
        } catch (error) {
            throw new Error(`Failed to get product categories: ${(error as Error).message}`);
        }
    }
    /**
     * Retrieves products filtered by category.
     * @param {string} category - The product category to filter by.
     * @returns {Promise<ResponseEntity<GetProductListResponse>>} The response entity containing products of the specified category.
     * @throws Will throw an error if the request fails.
     */
    public async getProductsByCategory(category: string): Promise<ResponseEntity<GetProductListResponse>> {
        try {
            return await this.get("products/category/" + category);
        } catch (error) {
            throw new Error(`Failed to get products by category "${category}": ${(error as Error).message}`);
        }
    }
    /**
     * Retrieves product details by product ID.
     * @param {number} id - The ID of the product.
     * @returns {Promise<ResponseEntity<GetProductResponseBody>>} The response entity containing product details.
     * @throws Will throw an error if the request fails.
     */
    public async getProductById(id: number): Promise<ResponseEntity<GetProductResponseBody>> {
        try {
            return await this.get(`products/${id}`);
        } catch (error) {
            throw new Error(`Failed to get product by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Retrieves products with optional query parameters for pagination and field selection.
     * @param {object} [params] - Optional query parameters.
     * @param {number} [params.limit] - Maximum number of products to return.
     * @param {number} [params.skip] - Number of products to skip.
     * @param {string} [params.select] - Fields to select in the response.
     * @returns {Promise<ResponseEntity<GetProductListResponse>>} The response entity containing the product list.
     * @throws Will throw an error if the request fails.
     */
    public async getProducts(params?: {
        limit?: number;
        skip?: number;
        select?: string;
    }): Promise<ResponseEntity<GetProductListResponse>> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.limit) queryParams.append("limit", params.limit.toString());
            if (params?.skip) queryParams.append("skip", params.skip.toString());
            if (params?.select) queryParams.append("select", params.select);

            const query = queryParams.toString();
            const path = query ? `products?${query}` : "products";

            return await this.get(path);
        } catch (error) {
            throw new Error(`Failed to get products with params ${JSON.stringify(params)}: ${(error as Error).message}`);
        }
    }
    /**
     * Updates a user by ID.
     * @param {number} id - The ID of the user to update.
     * @param {UpdateUserRequestBody} body - The update payload.
     * @returns {Promise<ResponseEntity<GetUserResponseBody>>} The response entity containing the updated user.
     * @throws Will throw an error if the request fails.
     */
    public async putUserById(id: number, body: UpdateUserRequestBody): Promise<ResponseEntity<GetUserResponseBody>> {
        try {
            return await this.put(`users/${id}`, body);
        } catch (error) {
            throw new Error(`Failed to update user by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Updates a user by ID.
     * @param {number} id - The ID of the user to update.
     * @param {UpdateUserRequestBody} body - The update payload.
     * @returns {Promise<ResponseEntity<GetUserResponseBody>>} The response entity containing the updated user.
     * @throws Will throw an error if the request fails.
     */
    public async patchUserById(id: number, body: UpdateUserRequestBody): Promise<ResponseEntity<GetUserResponseBody>> {
        try {
            return await this.patch(`users/${id}`, body);
        } catch (error) {
            throw new Error(`Failed to update user by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Adds a new product.
     * @param {AddProductRequestBody} body - The product data to add.
     * @returns {Promise<ResponseEntity<GetProductResponseBody>>} The response entity containing the added product.
     * @throws Will throw an error if the request fails.
     */
    public async addProduct(body: AddProductRequestBody): Promise<ResponseEntity<GetProductResponseBody>> {
        try {
            return await this.post("products/add", body);
        } catch (error) {
            throw new Error(`Failed to add product: ${(error as Error).message}`);
        }
    }
    /**
     * Updates a product by ID.
     * @param {number} id - The ID of the product to update.
     * @param {UpdateProductRequestBody} body - The update payload.
     * @returns {Promise<ResponseEntity<GetProductResponseBody>>} The response entity containing the updated product.
     * @throws Will throw an error if the request fails.
     */
    public async putProductById(id: number, body: UpdateProductRequestBody): Promise<ResponseEntity<GetProductResponseBody>> {
        try {
            return await this.put(`products/${id}`, body);
        } catch (error) {
            throw new Error(`Failed to update product by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Partially updates a product by ID.
     * @param {number} id - The ID of the product to patch.
     * @param {UpdateProductRequestBody} body - The patch payload.
     * @returns {Promise<ResponseEntity<GetProductResponseBody>>} The response entity containing the patched product.
     * @throws Will throw an error if the request fails.
     */
    public async patchProductById(id: number, body: UpdateProductRequestBody): Promise<ResponseEntity<GetProductResponseBody>> {
        try {
            return await this.patch(`products/${id}`, body);
        } catch (error) {
            throw new Error(`Failed to patch product by ID ${id}: ${(error as Error).message}`);
        }

    }
    /**
    * Deletes a product by ID.
    * @param {number} id - The ID of the product to delete.
    * @returns {Promise<ResponseEntity<DeleteProductResponseBody>>} The response entity confirming deletion.
    * @throws Will throw an error if the request fails.
    */
    public async deleteProductById(id: number): Promise<ResponseEntity<DeleteProductResponseBody>> {
        try {
            return await this.delete(`products/${id}` + id);
        } catch (error) {
            throw new Error(`Failed to delete product by ID ${id}: ${(error as Error).message}`);
        }
    }
    /**
     * Authenticates on the site using provided credentials.
     * Stores the authentication token for subsequent requests.
     * @param {PostAuthRequestBody} postAuthRequestBody - The request body containing username and password.
     * @returns {Promise<AxiosResponse<PostAuthResponseBody>>} The Axios response containing the authentication token.
     * @throws Will throw an error if authentication fails.
     */
    public async authenticateOnTheSite(postAuthRequestBody: PostAuthRequestBody): Promise<AxiosResponse<PostAuthResponseBody>> {
        try {
            const responseEntity: ResponseEntity<PostAuthResponseBody> = await this.post(MetergramClient.authenticate, postAuthRequestBody);
            this.Token = responseEntity.data.token;
            return responseEntity;
        } catch (error) {
            throw new Error("Authentication failed: " + (error as Error).message);
        }
    }
}
