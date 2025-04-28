import express from "express";
const app = express();
const PORT = 3000;
app.use((req, res) => {
    res.json([{"id": 1, "title": "test"}])
})
app.listen(PORT, () => console.log('running'));
