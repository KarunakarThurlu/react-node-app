const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");


const myCache = new NodeCache();

exports.getUserDetailsFromToken = async (request) => {
    console.info("########################### "+new Date().toISOString()+ " Enter into getUserName from Token method ############################")
    let bearerToken = request.headers["authorization"].split(" ")[1];
    let decodedtoken = jwt.decode(bearerToken);
    let user={};
    if(myCache.has(decodedtoken.sub)){
        user = myCache.get(decodedtoken.sub);
        console.log("from cache");
    }else{
        user = await User.findOne({ email: decodedtoken.sub }).populate("roles");
        myCache.set(decodedtoken.sub, user);
    }
    console.info("########################### "+new Date().toISOString() + " Exit  Of getUserName from Token method  ############################")
    return user !== null ? user._doc : null;
}