const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function setupDB() {
    const connectionString = process.env.DATABASE_URL;
    const dbName = connectionString.split('/').pop();
    const baseConnectionString = connectionString.replace(`/${dbName}`, '/postgres');

    const client = new Client({ connectionString: baseConnectionString });

    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
        if (res.rowCount === 0) {
            console.log(`Creating database ${dbName}...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log('Database created successfully.');
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (err) {
        console.error('Error during database setup:', err);
    } finally {
        await client.end();
    }
}

setupDB();
