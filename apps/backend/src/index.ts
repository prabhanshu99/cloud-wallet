import express from "express"
import { CreateUserSchema, SignInSchema } from "./types";
import cors from "cors";
import bcrypt from "bcrypt";
import { UserModel } from "./db";
import { Keypair } from "@solana/web3.js"
import jwt from "jsonwebtoken"

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "asdfghjkkzxcvbnm";

app.post("/api/v1/signup",async (req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const keypair = new Keypair();

        await UserModel.create({
            username:parsedData.data.username,
            hashedPassword,
            publicKey:keypair.publicKey.toString(),
            privateKey:keypair.secretKey.toString()
        })

        res.json({
            message: keypair.publicKey.toString()
        })
        
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
});

app.post("/api/v1/signin",async(req,res)=>{
    const parsedData = SignInSchema.safeParse(req.body);

    if(!parsedData){
        res.json({
            message:"incorrect input"
        })
        return;
    }

    const user = await UserModel.findOne({
        username: parsedData.data?.username,
        password : parsedData.data?.password
    })

    if(user){
        const token = jwt.sign({
            id:user
        },JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Credentials are incorrect"
        })
    }

});

app.post("/api/v1/txn/sign",(req,res)=>{

});

app.get("/api/v1/txn",(req,res)=>{

});

app.listen(3001);