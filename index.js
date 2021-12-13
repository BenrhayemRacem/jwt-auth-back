const express = require("express");

const app = express() ;
const PORT = 5000 ;

 const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const uri ='mongodb+srv://racem:ranim@cluster0.7zg8m.mongodb.net/jwtAuth'





app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:3000"}))


app.use("/api/auth" , authRouter) ;
app.use("/api/user" ,userRouter );

app.listen(PORT , () => console.log("server is running on port " + PORT))

mongoose.connect( uri,
    )
    .then(()=>{
        console.log( "connected to DB ") ;

    })
    .catch(err => console.log ("error while connecting to DB" + err));



