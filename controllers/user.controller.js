
const token = require("../services/jwtSign")
const userDao = require("../dao/user.dao")


class UserController {


    static async addJwtToUser(email, isAdmin , username) {
        try {
            const jwt = await token(email, isAdmin , username);

            const {success} = await userDao.getUserByEmailAndUpdateJwt(email, jwt);
            return {success: success}
        } catch (e) {
            console.log("error when generating a jwt" + e);
            return {success: false};
        }


    }

    static async getUserDetails(req, res) {
        const email = req.params.email;
        const {success, user} = await userDao.getUserDetails(email);

        if (success) {
            if (user) {
                const {authEmail , isAdmin} = req.infos ;
                if(user.email === authEmail || isAdmin) {
                    res.status(200).send(user)
                } else {
                    res.status(403).send("you are not allowed to display user credentials ")
                }

            } else {
                res.status(404).send("no account found please verify your credentials")
            }
        } else {
            res.status(500).send("error when getting user details")
        }
    }

}


module.exports = UserController ;