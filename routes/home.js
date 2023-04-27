const express=require("express")
const router= express.Router()
const User=require('../models/user')
const bodyparser=require('body-parser')
const urlencoded=require('body-parser')


const app=express()
app.set('view engine', 'ejs')

// const urlencodedparser=bodyparser.urlencoded({extended:false})
app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())
app.use(express.json())

app.get('', (req,res)=>{
    res.render('index', {data:""})
})

// app.post('/register',async(req, res)=>{
//     // const {name, fname, course, email, password}=req.body;
//     // console.log(name,fname,course,eamil, password)

//     const create_user=await User.create({
//         name:req.body.name,
//         fname:req.body.fname,
//         course:req.body.course,
//         email:req.body.email,
//         password:req.body.password,
//     })

//     res.send("It's saved.")
// })

module.exports=app