const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

// Set color
    client.set('color','red', 'EX',5 );
// Get color
    client.get('color',console.log);
module.exports = {client}