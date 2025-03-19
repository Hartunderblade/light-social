const express = require('express');
const pool = require('../db');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// // Проверка, является ли пользователь админом
// const isAdmin = (req, res, next) => {
//     if (req.user.id !== 1) { // ID 1 — это наш администратор
//         return res.status(403).json({ message: "Доступ запрещен" });
//     }
//     next();
// };

// 📌 Добавление категории (только админ)
router.post('/add',  async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Введите название категории" });
    }

    try {
        await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        res.json({ message: "Категория добавлена" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// 📌 Удаление категории (только админ)
router.delete('/delete/:id',  async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM categories WHERE id = $1", [id]);
        res.json({ message: "Категория удалена" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получить все категории
router.get("/", async (req, res) => {
    try {
        const categories = await pool.query("SELECT * FROM categories ORDER BY id DESC");
        res.json(categories.rows);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// router.get("/all", async (req, res) => {
//     try {
//         const categories = await pool.query("SELECT * FROM categories ORDER BY id DESC");
//         res.json(categories.rows);
//     } catch (error) {
//         res.status(500).json({ message: "Ошибка сервера" });
//     }
// });



module.exports = router;
