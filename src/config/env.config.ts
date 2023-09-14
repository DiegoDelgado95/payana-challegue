/* eslint-disable prettier/prettier */
export const EnvConfiguration = () => ({
  port: process.env.PORT || 3000,
  dbhost: process.env.DB_HOST || 'localhost',
  dbport: process.env.DB_PORT || 3306,
  dbname: process.env.DB_NAME || 'payanadb',
  dbuser: process.env.DB_USER || 'payana_user',
  dbpassword: process.env.DB_PASSWORD || 'secret-payana',
});
