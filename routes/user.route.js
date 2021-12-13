const express = require("express");
const  router = express.Router();

const userController = require("../controllers/user.controller") ;
const jwtVerify = require("../services/jwtVerify");
router.get("/details/:email" ,jwtVerify, userController.getUserDetails) ;

module.exports = router;