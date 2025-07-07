import * as dotenv from 'dotenv';
import {PostgresClient} from "../database/PostgresClient";
import {User} from "../model/database/User";

dotenv.config();

describe('PostgresClient', () => {
    let dbClient: PostgresClient;

    beforeAll(() => {
        dbClient = new PostgresClient();
    });

    it('should execute the SELECT query and return results', async () => {
        const userId = '1';
        const result = await dbClient.query<User>(`SELECT * FROM rnacen.auth_user WHERE id = $1`, [userId]);

        expect(result.rows).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);

        const user = result.rows[0];
        expect(user.id).toEqual(1);
        expect(user.username).toEqual('ribas');
        expect(user.password).toEqual('pbkdf2_sha256$390000$cJyweYFz9OhKkF5WeO7ZdJ$ylpeSAfTQdBw4dH1nriuyp1db/gX4Bpqcqh4gw7MS7U=');
    });

    afterAll(async () => {
        await dbClient.disconnect();
    });
});
