import { createConnection } from 'typeorm';

createConnection({
    type: 'postgres',
    url: 'postgres://postgres:docker@localhost:5432/apivendas',
    migrations: ['./src/shared/typeorm/migration/*.js'],
    cli: {
        migrationsDir: './src/shared/typeorm/migration',
    },
});
