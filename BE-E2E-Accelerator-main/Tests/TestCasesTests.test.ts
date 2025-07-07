import { GetUserResponseBody } from '../model/get/GetUserResponseBody';
import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';


describe('TestCasesTests', () => {
    let metergramClient: MetergramClient;

    beforeEach(() => {
        metergramClient = new MetergramClient();
    });

    test('GetUserByID', async () => {
        const responseEntity = await metergramClient.getUserById(3);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.data.id).toEqual(3)
        expect(user.data.email).toEqual("emma.wong@reqres.in")
    });

    test ('GetUserByIDFail', async () => {
        const responseEntity = await metergramClient.getUserById(1);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.data.id).toEqual(1)
        expect(user.data.email).toEqual("george.bluth@reqres.in")
    });

    test('NotFoundError', async () => {
        const responseEntity = await metergramClient.getUserById(23);
        const status: GetUserResponseBody = responseEntity.status;
        const statusText: GetUserResponseBody = responseEntity.statusText
        expect(statusText).toEqual('Not Found');
        expect(status).toEqual(404)
    });
});
