import { Sequelize } from 'sequelize';
import configObj from '../config/config'

let env = process.env.NODE_ENV ?? 'development';

const config = configObj[env]

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };