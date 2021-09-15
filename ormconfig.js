import 'dotenv/config'

const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env

export default {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  dropSchema: false,
  migrationsRun: true,
  entities: ['src/entities/*.ts', 'build/src/entities/*.js'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
}
