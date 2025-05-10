import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import conn from '../config.js';

dotenv.config();
const router = express.Router();
const SECRET_JWT = process.env.SECRET_JWT;



router.post('/register', async (req, res) => {
    const { email, password }  = req.body;


    try{
        const [user] = await conn.query("SELECT * FROM tb_user WHERE email = ?", email);
        if(user.length !== 0) return res.status(401).json({ message: "email not ready!" });
        const passwordHash = await bcrypt.hash(password, 10);
        
        const userData = {
            email,
            password: passwordHash
        }

         const [result] = await conn.query("INSERT INTO tb_user SET ?", userData);
         console.log(user);
         res.send("insert ok");
    } catch(err){
        console.log("error: ", err);
        res.status(500).json({ message: "register fail" });
    }
});

router.post('/login', async (req, res) => {
     const {email, password} = req.body;


     

     try{
        const [user] = await conn.query("SELECT * FROM tb_user WHERE email = ?", email);
        if(user.length === 0) return res.status(401).json({ message: "email not found" });
        const [userData] = user;
        // console.log(password, userData);
        const match = await bcrypt.compare(password, userData.password);
        if(!match) return res.status(400).json({ message: "password wrong" });
        // console.log(SECRET_JWT)
        const token = jwt.sign({ email: userData.email }, SECRET_JWT, { expiresIn: '1d' } );
        // console.log(token);
        res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000
        });


        
        res.json({ message: "login success!"});
     } catch(err){  
        console.log("error: ", err);
        res.status(500).json({ message: "login fail" });
    }
});


router.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    
    try{
        if (!token) return res.status(400).json({ message: "token not found!" });
    
        const userToken = jwt.verify(token, SECRET_JWT);
        const [user] = await conn.query("SELECT email, password FROM tb_user WHERE email = ?", userToken.email);
        const [userData] = user;
        res.json({ userData });

    } catch(err) {
        console.log("error", err);
        res.status(500).json({ message: "server error" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false
    })

    res.json({ message: "logout success!" });
});




export default router;