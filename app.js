const express=require('express')
const dbconnection=require('./dbconnection');
const path =require('path')
const User=require('./models/user')
const bodyParser = require('body-parser');
const urlencoded= require('body-parser');
const cookieParser=require('cookie-parser')

dbconnection()
const app=express()
const PORT =5002;

const urlencodedparser=bodyParser.urlencoded({extended:false})

// middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())


app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/public/img'))
// setting ejs-template engine
app.set('view engine', 'ejs')

// getting routes
app.get('', (req,res)=>{
    res.send("It's home page of figma project.")
})


app.use('/home', require('./routes/home'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/student', require('./routes/student'))

// app.get('/student', (req,res)=>{
//     res.render('student')
// })

app.get('/logout', (req, res)=>{
    res.cookie('token', null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.redirect('/login')
})



app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}.`)
})