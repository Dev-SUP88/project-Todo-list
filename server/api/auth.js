import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import conn from '../config.js';
import checkLogin from './checkLogin.js';


dotenv.config();
const router = express.Router();
const SECRET_JWT = process.env.SECRET_JWT;



router.post('/register', async (req, res) => {
    const { email, password } = req.body;


    try {
        const [user] = await conn.query("SELECT * FROM tb_user WHERE email = ?", email);
        if (user.length !== 0) return res.status(401).json({ message: "email not ready!" });
        const passwordHash = await bcrypt.hash(password, 10);

        const userData = {
            email,
            password: passwordHash
        }

        const [result] = await conn.query("INSERT INTO tb_user SET ?", userData);
        console.log(user);
        res.send("insert ok");
    } catch (err) {
        console.log("error: ", err);
        res.status(500).json({ message: "register fail" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;




    try {
        const [user] = await conn.query("SELECT * FROM tb_user WHERE email = ?", email);
        if (user.length === 0) return res.status(401).json({ message: "email not found" });
        const [userData] = user;
        // console.log(password, userData);
        const match = await bcrypt.compare(password, userData.password);
        if (!match) return res.status(400).json({ message: "password wrong" });
        // console.log(SECRET_JWT)
        const token = jwt.sign({ email: userData.email }, SECRET_JWT, { expiresIn: '1d' });
        // console.log(token);
        res.cookie('token', token, {
            httpOnly: false,  // ป้องกันไม่ให้เข้าถึงคุกกี้จาก JavaScript
            secure: false,   // ใช้ false ใน HTTP เท่านั้น (ถ้าใช้ HTTPS ให้ตั้ง true)
            sameSite: 'None', // ต้องตั้งเป็น None สำหรับการส่งข้ามโดเมน
            maxAge: 3600000  // ตั้งเวลาหมดอายุของคุกกี้
        });
        console.log(req.cookies)


        res.json({ isSuccess: true, message: "login success!" });
    } catch (err) {
        console.log("error: ", err);
        res.status(500).json({ isSuccess: false, message: "login fail" });
    }
});


router.get("/checklogin", checkLogin, async (req, res) => {
    console.log(req.user.email)
    res.json({ isLogined: true, email: req.user.email });
});

router.get("/logout", (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false
    })

    res.json({ message: "logout success!" });
});




export default router;