const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()



app.get('/',(req,res)=>{
    res.send({
        success:0,
        message:'Api Worked SuccessFully'
    })
})



app.post('/add/post',(req,res)=>{
    
    // Mock User
    const user={
        id:1,
        email:'abhishekoza11@gmail.com',
        username:'abhishek'
    }
    

    jwt.sign({user},'secretKey',{ expiresIn: '30s' },(err,token)=>{

        if(err){
            res.send({
                success:1,
                message:'User Information is not valid'
            })
        }

        else{
            res.send({
                success:0,
                token:token
            })
        }

    })


})


app.post('/add/posts/api',verifyToken,(req,res)=>{
    console.log("hi1")
    jwt.verify(req.token,'secretKey',(err,authData)=>{

        console.log("hi")
        if(err){
            res.sendStatus(403)
        }
        else{
            res.send({
                success:0,
                message:'PostCreated',
                authData

            })
        }
    })

})


// Verfiy the Generated Token
function verifyToken (req,res,next){

    const bearerToken=req.header['authorization']

    if(bearerToken !=null){

       const bearer=bearerToken.split('')
        
    //    Take A Token
       const token=bearer[1]

    //    Send a Token
       req.token=token
// Call Back
       next();
    }
    else{
        res.sendStatus(403)
    }

}

app.listen(3006,()=>{
    console.log('App running in port: 3006')
})