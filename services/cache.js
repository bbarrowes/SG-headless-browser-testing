const mongoose = require('mongoose');
const util = require('util');
const redis = require('redis');
    const redisURL = 'redis://127.0.0.1:6379'
    const client = redis.createClient(redisURL);
        client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}){
    this.useCache = true;
    this.hashKey = JSON.stringify( options.key || '' );
    return this;
}

mongoose.Query.prototype.exec = async function(){
    if( ! this.useCache ){
        return exec.apply(this,arguments);
    }
    const key = JSON.stringify(
        Object.assign({},this.getQuery(),{
            collection:this.mongooseCollection.name
        })
    );
    // Check if the key is in the redis cache.  If we do, return the value that is in redis for that key
        // Check the cache
            // const cacheValue = await client.get(key);
            const cacheValue = await client.hget(this.hashKey, key);
                if(cacheValue){
                    console.log("using cache");
                    return JSON.parse(cacheValue);
                    // const doc = JSON.parse(cacheValue);
                    // return Array.isArray(doc) ?
                    //     doc.map( (d)=>{
                    //         new this.model(d);
                    //     }) :
                    //     new this.model(doc);
                }
    // If not, query mongo, and store the result in the redis cache
        // Do the query
            const result = await exec.apply(this,arguments);
            // client.hmset( this.hashKey , key , JSON.stringify(result) , 'EX' , 10 );
            client.hset(this.hashKey,key, JSON.stringify(result));
                client.expire(this.hashKey,10);
            return result;
}

module.exports = {
    clearHash(hashKey){
        client.del(JSON.stringify(hashKey));
    }
}