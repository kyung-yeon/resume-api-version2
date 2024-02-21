require('dotenv').config()
const { Cache } = require('cache-store-manager');

let redisCache ;

if (process.env.NODE_ENV === 'test') {
    redisCache = {};
} else {
    Cache.create('redis', {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        db: '0',
        ttl: 60 * 1000 // milliseconds
    });
}

module.exports = {
    redisCache,
}
