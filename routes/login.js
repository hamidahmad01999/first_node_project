const express=require('express')
const User=require('../models/user')
const bodyparser=require('body-parser')
const urlencoded=require('body-parser')
const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const urlencodedparser=bodyparser.urlencoded({extended:false})

const app=express()
app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyparser.json())
app.use(cookieParser())

app.get('', (req, res)=>{
    console.log(req.cookies)
    res.render('login', {data:""})
})

app.post('',urlencodedparser, async(req,res)=>{
    const {email, password}=req.body;
    console.log(email,password)

    const find_user=await User.findOne({email:email})
    console.log(find_user)
    if(find_user){
        let checkpass= await bcrypt.compare(password, find_user.password)
        if(checkpass){
            const token=jwt.sign({_id:find_user._id}, "iamsecret")

            res.cookie("token", token,{
                httpOnly:true,
                expires:new Date(Date.now()+60*1000)
            })
            // res.render('login', {data:"login Sucessfully."})
            res.redirect('/student')
        }else{
            res.render('login', {data:"Invalid Password." ,email:email})
        }     
    }else{
        res.render('login', {data:"User with this email does not exist." , email})
    }
})


module.exports=app
