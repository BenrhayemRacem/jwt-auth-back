const jwt = require("jsonwebtoken");


const jwtVerify = async (req,res,next)=> {

    const token = req.headers.token;

    if(token) {
        try {
            const {email,isAdmin ,username} = await jwt.verify(token , "ranimbenrhayem") ;
            req.infos= {"authEmail":email,isAdmin ,username} ;
            next();
        }catch (err) {
            res.send(err).status(400)
        }
    } else {
        res.send("you are not authorized").status(401);
    }


}

module.exports = jwtVerify;