import BaseClient from "./BaseClient";
import { ResponseEntity } from "express";
import { getConfig } from "../util/Config";
import { GetUserResponseBody } from "../model/get/GetUserResponseBody";

/**
 * Extends BaseClient to provide additional functionality for interacting with the Metergram API.
 */
export class MetergramClient extends BaseClient {
    // private static readonly authenticate = "/login";
    // private Token: string;

    // private postAuthRequestBody: PostAuthRequestBody = {
    //     email: "",
    //     password: ""
    // };

    /**
     * Creates an instance of the MetergramClient.
     * Initializes headers and base URL for API requests.
     */
    constructor() {
        super();
        const config = getConfig();
        this.baseUrl = config.HOSTNAMEAPI;
        // this.authenticateOnTheSite(this.postAuthRequestBody);
        // const responseEntity: ResponseEntity<PostAuthResponseBody> = this.authenticateOnTheSite(this.postAuthRequestBody);
        // this.Token = responseEntity.body.token;
        this.addHeader("Content-Type", "application/json");
        // this.addHeader("Authorization", `Bearer ${this.Token}`);
    }

    /**
     * Fetches user details by user ID.
     * @param {number} id - The ID of the user to fetch.
     * @returns {ResponseEntity<GetUserResponseBody>} The response entity containing the user details.
     */
    public getUserById(id: number): ResponseEntity<GetUserResponseBody> {
        return this.get("users/" + id);
    }

    // /**
    //  * Authenticates on the site using provided credentials.
    //  * @param {PostAuthRequestBody} postAuthRequestBody - The request body containing email and password.
    //  * @returns {ResponseEntity<PostAuthResponseBody>} The response entity containing the authentication token.
    //  */
    // public authenticateOnTheSite(postAuthRequestBody: PostAuthRequestBody): ResponseEntity<PostAuthResponseBody> {
    //     return this.post(MetergramClient.authenticate, postAuthRequestBody);
    // }
}
