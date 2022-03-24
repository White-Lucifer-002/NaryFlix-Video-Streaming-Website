const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Bcrypt = require("bcrypt");
require('dotenv/config'); //DB_CONNECTION
const path = require('path');
const cors = require('cors')
const jwt = require("jsonwebtoken");

//Express App
const app = express();

//Mongo Connect
let mongoUrl = process.env.DB_CONNECTION;
let JWT_sec = process.env.JWT_SEC;

mongoose.connect(mongoUrl, () => {
    console.log("Mongo Connected");
    app.listen(5500, () => {
        console.log("Server initiated at http://localhost:5500")
    });
});


//Dates
let date = new Date();

//MiddleWares
app.use(express.json());
app.use(cors());

app.post('/api/changePassword', (req, resp)=>{
    const { token } = req.body;
    const user = jwt.verify(token, JWT_sec);

})

app.post('/api/login_chk', async(req, resp)=>{
    const { tok_key } = req.body;
    const tok2usr = jwt.verify(tok_key, JWT_sec); 
    const usr_nm = tok2usr.username;
    const usr_chk = await User.findOne({ username: usr_nm });
    console.log("chk");
    if(!usr_chk){
        resp.json({username: "none"});
    }
    
    resp.json({
        username: usr_chk.username,
        email: usr_chk.email,
        phone: usr_chk.phone,
        dj: usr_chk.date,
        subsPlan: usr_chk.subsPlan
    });
})

app.post('/api/login', async (req, resp) => {
    const { username, pwd } = req.body;

    try {
        const usr_chk = await User.findOne({ username });
        if (!usr_chk) {
            resp.json({ status: 'error', error: 'Invalid credentials' });
        }
        if (await Bcrypt.compare(pwd, usr_chk.pwd)) {
            const token = jwt.sign({id: usr_chk._id, username: usr_chk.username}, JWT_sec);
            console.log(token);
            console.log("Login sucess");
            resp.json({ status: 'ok', tok: token, username: usr_chk.username,
            email: usr_chk.email,
            phone: usr_chk.phone,
            dj: usr_chk.date,
            subsPlan: usr_chk.subsPlan });
        }

        console.log(usr_chk);
        resp.json({ status: 'error', error: 'Invalid credentials' });
    } catch (error) {
        const err_msg = JSON.stringify(error);
        console.log(err_msg);
    }

})

app.post('/api/register', async (req, resp) => {
    let { un, pw, em, ph, profileImg } = req.body;
    pwd = await Bcrypt.hash(pw, 10);//10 - iteration
    try {
        const response = await User.create({
            username: un,
            pwd: pwd,
            email: em,
            phone: ph
        })
        console.log(response);

    } catch (error) {
        const err_msg = JSON.stringify(error);
        console.log(err_msg);
        if (error.code == "11000") {
            return resp.json({
                status: "error",
                error: "An user already exists with these details"
            })
        }
    }
    resp.json({ status: 'ok' });
})

app.post('/api/subs_chg', async(req, resp)=>{
    const { tok_key, subPlan } = req.body;
    const tok2usr = jwt.verify(tok_key, JWT_sec); 
    const usr_nm = tok2usr.username;
    const usr_chk1 = await User.findOneAndUpdate({ username: usr_nm }, {subsPlan: subPlan}, {new: true}, (error, data)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(data);
            resp.json({
                username: data.username,
                email: data.email,
                phone: data.phone,
                dj: data.date,
                subsPlan: data.subsPlan
            });
        }
    });
    
})