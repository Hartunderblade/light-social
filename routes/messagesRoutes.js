const express = require("express");
const pool = require("../db");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
// Получение всех сообщений
router.get("/:friendId", authMiddleware, async (req, res) => {
    const { friendId } = req.params;
    const userId = req.user.id;

    try {
        const messages = await pool.query(
            `SELECT *, created_at FROM messages
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
    const timestamp = new Date();

    if (!content.trim()) {
        return res.status(400).json({ message: "Сообщение не может быть пустым" });
    }

    try {
        const newMessage = await pool.query(
            `INSERT INTO messages (sender_id, receiver_id, content, created_at)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [senderId, receiverId, content, timestamp]
        );

        res.json(newMessage.rows[0]);
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;