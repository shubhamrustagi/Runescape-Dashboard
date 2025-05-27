import express from 'express'
import dotenv  from 'dotenv'

const app = express()
dotenv.config();
app.use(express.json())

const PORT = process.env.PORT||8081
app.get('/osrsdata',(req,res)=>{
    try{
        res.status(200).json({success:true,message:"Hello world"})
    }catch(err){
        res.status(500).json({success:false,message:"Error has occurred"+err.message})
        console.error("Error at server: "+err.message)
    }
    
})

app.listen(PORT,()=>{
    console.log(`Listening at http:localhost:${PORT}`)
})