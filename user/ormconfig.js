module.exports = {
    name: 'default',
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE,
    logging: true,
    entities: [`dist/**/*.entity{.ts,.js}`],
}