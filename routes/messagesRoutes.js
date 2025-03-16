const express = require("express");
const pool = require("../db");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Получение всех сообщений с пользователем
router.get("/:friendId", authMiddleware, async (req, res) => {
    const { friendId } = req.params;
    const userId = req.user.id; // Получаем ID текущего пользователя

    try {
        const messages = await pool.query(
            `SELECT * FROM messages 
            WHERE (sender_id = $1 AND receiver_id = $2) 
            OR (sender_id = $2 AND receiver_id = $1)
            ORDER BY created_at ASC`,
            [userId, friendId]
        );
        res.json(messages.rows);
    } catch (error) {
        console.error("Ошибка при загрузке сообщений:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Отправка сообщения
router.post("/send", authMiddleware, async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    if (!content.trim()) {
        return res.status(400).json({ message: "Сообщение не может быть пустым" });
    }

    try {
        const newMessage = await pool.query(
            `INSERT INTO messages (sender_id, receiver_id, content) 
            VALUES ($1, $2, $3) RETURNING *`,
            [senderId, receiverId, content]
        );

        res.json(newMessage.rows[0]);
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;