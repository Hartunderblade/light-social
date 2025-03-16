const express = require('express');
const pool = require('../db');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Получить всех пользователей, кроме текущего
// Получение всех пользователей (кроме текущего)
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const users = await pool.query("SELECT id, name, login FROM users WHERE id != $1", [req.user.id]);
        res.json(users.rows);
    } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
