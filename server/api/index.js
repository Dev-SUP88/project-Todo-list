import express from "express";
import cors from 'cors';
import routerTodo from './todo.js';
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use('/todo', routerTodo);






app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));
