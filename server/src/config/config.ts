import { Dialect } from "sequelize"
import dotenv from "dotenv";
dotenv.config();

interface ConfigInterface {
  [key:string]: {
    username: string
    password: string | undefined
    database: string
    host: string
    dialect: Dialect | undefined
    url?: string
  }
}

const configObj: ConfigInterface = {
  development: {
    "username": process.env.DB_USER ?? '',
    "password": process.env.DB_PASSWORD ?? '',
    "database": process.env.DB_NAME ?? '',
    "host": process.env.DB_HOST ?? '',
    "dialect": 'postgres'
  },
  test: {
    "username": process.env.DB_USER ?? '',
    "password": process.env.DB_PASSWORD ?? '',
    "database": process.env.DB_NAME ?? '',
    "host": process.env.DB_HOST ?? '',
    "dialect": 'postgres'
  },
  production: {
    "username": process.env.DB_USER ?? '',
    "password": process.env.DB_PASSWORD ?? '',
    "database": process.env.DB_NAME ?? '',
    "host": process.env.DB_HOST ?? '',
    "dialect": 'postgres'
  }
}


export default configObj