import * as dotenv from 'dotenv';
import {PostgresClient} from "../database/PostgresClient";

dotenv.config();

describe('PostgresClient', () => {
    let dbClient: PostgresClient;

    beforeAll(() => {
        dbClient = new PostgresClient();
    });

    it('should execute the SELECT query and return results', async () => {
        const query = `SELECT x.* FROM rnacen.auth_user x WHERE id = '1'`;
            const result = await dbClient.query(query);
            expect(result.rows).toBeDefined();
            expect(result.rows.length).toBeGreaterThan(0); // Adjust as needed based on expected results
            // @ts-ignore
        expect(result.rows[0].password).toEqual('pbkdf2_sha256$390000$cJyweYFz9OhKkF5WeO7ZdJ$ylpeSAfTQdBw4dH1nriuyp1db/gX4Bpqcqh4gw7MS7U=');

    });

    afterAll(async () => {
        await dbClient.disconnect();
    });
});
