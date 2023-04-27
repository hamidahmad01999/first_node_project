const express=require('express')
const User=require('../models/user')
const bodyParser = require('body-parser');
const urlencoded= require('body-parser');
const bcrypt=require('bcrypt')

const urlencodedparser=bodyParser.urlencoded({extended:false})

const app=express()

app.use(bodyParser.json())
app.use(express.json())

app.post('',urlencodedparser, async(req, res)=>{
    const {name, fname, course, email, password}=req.body;
    console.log(name, fname, course, email, password)

    const check_user=await User.findOne({email:email})
    if(check_user){
        res.render("index", {data:"User with this email already exists."})
    }else{

    let salt=bcrypt.genSaltSync(10);
    let secpass=bcrypt.hashSync(password, salt)
    
    const create_user=await User.create({
        name:name,
        fname:fname,
        course:course,
        email:email,
        password:secpass,
    })
    res.render("index", {data:"Registered Sucessfully."})
}
})

module.exports=app