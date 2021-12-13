const jwt = require("jsonwebtoken");

const jwtSign = async (email   , isAdmin ,username) =>  {
    return await jwt.sign({"email":email , "isAdmin":isAdmin  , "username":username } ,"ranimbenrhayem")
}

module.exports = jwtSign