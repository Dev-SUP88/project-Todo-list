import express from "express";
import cors from 'cors';
import routerTodo from './api/todo.js';
import routerAuth from "./api/auth.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import checkLogin from "./api/checkLogin.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json());
console.log('test');
app.use('/api/todo', checkLogin, routerTodo);
app.use('/api/auth', routerAuth);









app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
