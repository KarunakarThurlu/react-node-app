const NodeCache= require('node-cache');

class CacheService{

    constructor(){
        this.cache = new NodeCache({
            stdTTL: 60 * 60 * 1,
            checkperiod: 60 * 60 * 1,
            useClones: false
        });
    }

    get(key){
        return this.cache[key];
    }

    set(key, value){
        this.cache[key] = value;
    }

    remove(key){
        delete this.cache[key];
    }

    //flush all cache every hour
    flush(){
        this.cache.flushAll();
    }
}

