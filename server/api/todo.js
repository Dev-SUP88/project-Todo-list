import express from 'express';
import db from '../config.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [row] = await db.promise().query('SELECT id_todo, title, is_done FROM tb_todo');
        console.log(row);
        res.status(200).json(row);

    } catch (err) {
        console.error('มี error', err)
    }
});

router.post('/', async (req, res) => {
    const { title } = req.body;
    try {
        const [result] = await db.promise().query('INSERT INTO tb_todo(title, is_done) VALUES (?, ?)', [title, false]);
        console.log(result.insertId);
        res.status(201).json({ message: 'add success', id: result.insertId });

    } catch (err) {
        console.error('have error', err);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { is_done } = req.body;

    try{
        const [result] = await db.promise().query('UPDATE tb_todo SET is_done = ? WHERE id_todo = ?', [is_done, id]);
        console.log(result);
        if(result.affectedRows === 0) {
            return res.status(404).json({ error: 'ไม่พบรายการนี้'});
        }
    
        res.json({ message: 'updated' })

    } catch(err) {
        console.error("have error: ", err);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try{
        const [result] = await db.promise().query('DELETE FROM tb_todo WHERE id_todo = ?', [id]);

        if(result.affectedRows === 0){
            res.status(404).json({message: 'ไม่เจอ', id: id});
        }

        res.status(200).json({ message: 'deleted', id: id });
    } catch(err) {
        console.error('err', err);
        res.status(500).json({ message: 'delete false', id: id });
    }
});

export default router;