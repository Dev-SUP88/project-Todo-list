import express from "express";
import cors from 'cors';
import routerTodo from './api/todo.js';
import routerAuth from "./api/auth.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT;



app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/', routerTodo);
app.use('/auth', routerAuth);








app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
