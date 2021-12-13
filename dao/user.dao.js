const userModel = require("../models/userModel");


class userDao{
    static async getUserByEmail(email) {
        try {
            const result = await userModel.findOne({"email": email}).exec();

            return {"success": true, "user": result}
        } catch (e) {
            console.log("error when searching a user by email" + e);
            return {success: false, user: null}
        }
    }
    static async getUserDetails (email) {
        try{
            const result = await userModel.findOne({"email": email} ,
                {"password":1 ,"jwt":1 ,"isAdmin":1 ,"_id":0 ,"username":1 , "email":1}).exec()
            return {"success" : true , "user" :result}

        }catch (e) {
            console.log("error when searching a user by email" + e);
            return {success: false, user: null}
        }
    }
    static async getUserByEmailAndUpdateJwt (email , jwt) {
        try {

            await userModel.findOneAndUpdate({"email" : email} , {"jwt":jwt} , {new:true}  );
            return {"success": true};
        }catch (error) {
            console.log(error);
            return {"success":false};
        }
    }
}

module.exports = userDao ;