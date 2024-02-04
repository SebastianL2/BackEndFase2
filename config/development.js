// en  desarrollo digitar set NODE_ENV=development; node bin/www  
const config = {
    server: {
      port: 3500,
      domain: 'localhost:3500',
    },
    mongodb: {
      port: 27017,
      host: 'localhost'
    },
    email: {},
    logger: 'dev'
  };
  
  export default config;