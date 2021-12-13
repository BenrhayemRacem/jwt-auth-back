const userController = require("./user.controller");
const userDao = require("../dao/user.dao") ;

class authController {

    static  async  login (req , res) {

        const {email,password , username} = req.body ;
        const {success , user} = await userDao.getUserByEmail(email);
        if(!success) {
            res.status(500).send("an error occurred while logging in")
        } else {
            if(!user) {
                res.status(404).send("please verify your email or create an account")
            } else {
                 if(password!==user.password) {
                     res.status(403).send("verify your password");
                 } else {
                     const {success} = await userController.addJwtToUser(email,user.isAdmin , username);
                     if(!success) {
                         res.status(500).send("error while logging in please try again")
                     }else{
                         const loggedInUser = await userDao.getUserByEmail(email)
                         res.status(200).send(loggedInUser.user.jwt)
                     }
                 }
            }


        }
    }
}

module.exports = authController ;