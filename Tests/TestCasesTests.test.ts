import { GetUserResponseBody } from '../model/get/GetUserResponseBody';
import { DeleteUserResponseBody } from '../model/delete/DeleteUserResponseBody';
import { UpdateUserRequestBody } from '../model/update/UpdateUserRequestBody';
import { AddUserRequestBody } from '../model/create/AddUserRequestBody';
import { MetergramClient } from "../http/MetergramClient";
import { describe, expect, test } from '@jest/globals';
import { GetProductListResponse } from '../model/get/GetProductListResponseBody';
import { GetProductResponseBody } from '../model/get/GetProductResponseBody';
import { GetAllProductsCategoriesResponse } from '../model/get/GetAllProductsCategoriesResponse';
import { AddProductRequestBody } from "../model/create/AddProductRequestBody";
import { UpdateProductRequestBody } from "../model/update/UpdateProductRequestBody";
import { DeleteProductResponseBody } from "../model/delete/DeleteProductResponseBody";

describe('TestCasesTests', () => {
    let metergramClient: MetergramClient;

    beforeEach(async () => {
        metergramClient = new MetergramClient();
        await metergramClient.init();
    });

    test('GetUserByID', async () => {
        const userId = 3;
        const responseEntity = await metergramClient.getUserById(userId);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.id).toEqual(userId);
        expect(user.email).toEqual("sophia.brown@x.dummyjson.com");
    });

    test('GetUserByIDFail', async () => {
        const userId = 450;
        const responseEntity = await metergramClient.getUserById(userId);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.id).toEqual(userId);
        expect(user.email).toEqual("george.bluth@reqres.in");
    });

    test("ADD new user", async () => {
        const newUser: AddUserRequestBody = {
            firstName: "Lettuce",
            lastName: "H",
            age: 23,
            username: "lettuceH",
            email: "test@test.com",
            password: "test123",
            gender: "female"
        }
        const response = await metergramClient.addUser(newUser);

        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty("id");
        expect(response.data.username).toEqual(newUser.username);
        expect(response.data.lastName).toBe(newUser.lastName);
        expect(response.data.firstName).toBe(newUser.firstName);
        expect(response.data.email).toBe(newUser.email);
        expect(response.data.password).toBe(newUser.password);
        expect(response.data.age).toBe(newUser.age);
    });

    test('DELETE request should delete user', async () => {
        const userId = 23;
        const response = await metergramClient.deleteUserById(userId);
        const user: DeleteUserResponseBody = response.data;
        expect(user.isDeleted).toBe(true);
    });

    test("GET products by dynamic category", async () => {

        const categoriesResponse = await metergramClient.getProductsCategories();
        const categories: GetAllProductsCategoriesResponse = categoriesResponse.data;

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];

        const response = await metergramClient.getProductsByCategory(randomCategory.name);

        expect(response.status).toBe(200);

        response.data.products.forEach((product: any) => {
            expect(product.category.toLowerCase()).toBe(randomCategory.name.toLowerCase());
        });
    });

    test('PUT request should update user', async () => {
        const updatedData: UpdateUserRequestBody = {
            firstName: "Updated Name",
            email: "updated.email@example.com",
        };
        const userId = 40;
        const response = await metergramClient.putUserById(userId, updatedData);

        expect(response?.data.firstName).toBe("Updated Name");
        expect(response?.data.email).toBe("updated.email@example.com");

    });

    test('PATCH request should update user fields', async () => {
        const updatedData: UpdateUserRequestBody = {
            firstName: "Updated Age",
            age: 222,
        };
        const userId = 40;
        const response = await metergramClient.patchUserById(userId, updatedData);

        expect(response?.data.firstName).toBe("Updated Age");
        expect(response?.data.age).toBe(222);

    });

    test('ADD new product - should return created product with matching data', async () => {
        const requestBody: AddProductRequestBody = {
            title: "BMW Pencil",
            price: 2.99,
            category: "stationery",
            description: "TEST"
        };

        const response = await metergramClient.addProduct(requestBody);
        const createdProduct: GetProductResponseBody = response.data;
        expect(createdProduct).toBeDefined();
        expect(response.status).toBe(201);
        expect(createdProduct).toHaveProperty("id");
        expect(createdProduct.title).toBe(requestBody.title);
        expect(createdProduct.price).toBe(requestBody.price);
        expect(createdProduct.category).toBe(requestBody.category);
    });
    test('PUT - Update product', async () => {
        const updatedData: UpdateProductRequestBody = {
            title: "Updated Product Title",
            price: 19.99
        };
        const productId = 1;
        const response = await metergramClient.putProductById(productId, updatedData);
        const updatedProduct: GetProductResponseBody = response.data;

        expect(updatedProduct).toBeDefined();
        expect(updatedProduct.title).toBe(updatedData.title);
        expect(updatedProduct.price).toBe(updatedData.price);
    });
    test('PATCH - Update product partially', async () => {
        const patchData: UpdateProductRequestBody = {
            stock: 999
        };
        const productId = 1;
        const response = await metergramClient.patchProductById(productId, patchData);
        const updatedProduct: GetProductResponseBody = response.data;

        expect(updatedProduct).toBeDefined();
        expect(updatedProduct.stock).toBe(patchData.stock);
    });
    test('DELETE - Delete a product', async () => {
        const productId = 1;

        const deleteResponse = await metergramClient.deleteProductById(productId);
        const deleteResult: DeleteProductResponseBody = deleteResponse.data;

        expect(deleteResult.isDeleted).toBe(true);
    });
    test('GET Products with pagination and selected fields (title, price)', async () => {
        const response = await metergramClient.getProducts({
            limit: 3,
            skip: 0,
            select: "title,price"
        });

        const data: GetProductListResponse = response.data;

        expect(data.products.length).toBeLessThanOrEqual(3);
        expect(data.skip).toBe(0);
        expect(data.limit).toBe(3);

        for (const product of data.products) {
            expect(product.title).toBeDefined();
            expect(product.price).toBeDefined();

            expect(product.description).toBeUndefined();
            expect(product.category).toBeUndefined();
        }
    });

    test('NotFoundError', async () => {
        const userId = 406;

        const responseEntity = await metergramClient.getUserById(userId);
        const status: GetUserResponseBody = responseEntity.status;
        const statusText: GetUserResponseBody = responseEntity.statusText;
        expect(statusText).toEqual('Not Found');
        expect(status).toEqual(404);
    });

    test('Authenticate and check status code from init', async () => {
        const response = await metergramClient.init();
        expect(response.status).toBe(200);
        expect(response.data.accessToken).toBeDefined();
    });

});
