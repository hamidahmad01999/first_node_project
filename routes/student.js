const express=require('express')
const jwt=require('jsonwebtoken')
const User=require('../models/user')


const app=express()

app.set('view-engine', 'ejs')

// this is the simple way but there is anotherway in which we first declare function which will work as middleware and then our next code will work
// app.get('', (req,res)=>{
//     const {token}=req.cookies;

//     if(token){
//         res.render('student')
//     }else{
//         res.render('index', {data:""})
//     }
// })

const isAuth=async(req,res,next)=>{
    const {token}=req.cookies;

    if(token){
        const decode=jwt.verify(token, 'iamsecret')
        console.log(decode)
        let user_id=decode._id
        let user =await User.findById(user_id)

        console.log(user.name)
        req.user=user
        next();
    }else{
        res.redirect('/login')
    }
}
app.get('', isAuth,(req,res)=>{
    // console.log(req.user)
    let user=req.user;
    res.render('student', {name:user.name, email:user.email})
})

module.exports=app