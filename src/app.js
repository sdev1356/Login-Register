const express=require('express')
 const app=express()
const path=require('path')

const hbs=require('hbs')

 const port=process.env.PORT || 3000;
require('./db/conn')
const Register=require('./models/registers') 

const static_path = path.join(__dirname, '../public')
const templates_path = path.join(__dirname, '../src/templates/views')
const partials_path = path.join(__dirname, '../src/templates/partials')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

 app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",templates_path)
hbs.registerPartials(partials_path)

 app.get('/',(req,res)=>{
    res.render("index")
 });
 app.get('/login',(req,res)=>{
     res.render("login")  
 })
 app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Register.findOne({email:email,password:password})
        if(user){
            const temp={
                email:user.email,
                password:user.password
            } 
            res.render("landinglogin");    
        }
        else{
            return res.status(400).json({message:`Login failed`})
        }
    }catch(err){
        res.status(400).json({message:"Login Failed"})
    }
})
 app.get('/register',(req,res)=>{
    res.render("register")
})
app.post('/register',async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
      console.log(password) 
      console.log(cpassword)
        if(password===cpassword){
            const registerEmployee=new Register({
                email:req.body.email,
                password:req.body.password
            })
           const registered=await registerEmployee.save();
           res.status(201).render("landingreg")
        }
        else{
            res.send(`password do not match`)
        }
    }catch(e){
        res.status(400).send(e)
    }
})
 app.listen(port,()=>{
     console.log(`server running on http:localhost:${port} `)
 })
 