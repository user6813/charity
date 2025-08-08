const config = {
    development: {
        "username": "root",
        "password": "root",
        "database": "cashkick",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      test: {
        "username": "root",
        "password": "root",
        "database": "cashkick-test",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      production: {
        "username": "root",
        "password": "",
        "database": "database_production",
        "host": "127.0.0.1",  
        "dialect": "mysql"
      }
};

export default config;