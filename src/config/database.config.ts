const env = process?.env;
const databaseConfig = {
  host: env?.DB_HOST,
  port: env?.DB_PORT,
  user: env?.DB_USER,
  pwd: env?.DB_PWD,
  name: env?.DB_NAME,
  authSource: env?.DB_AUTH_SOURCE,
};

const getDBUrl = () => {
  try {
    const dbUrl = `mongodb://${databaseConfig.user}:${databaseConfig.pwd}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}`;
    if (databaseConfig?.authSource) {
      return `${dbUrl}?authSource=${databaseConfig.authSource}`;
    } else {
      return dbUrl;
    }
  } catch (e) {
    throw new Error('Error when getting DB url');
  }
};

export default {
  databaseConfig,
  getDBUrl,
};
