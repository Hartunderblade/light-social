const express = require("express");
const pool = require("../db");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Добавление в друзья
router.post("/add", authMiddleware, async (req, res) => {
    try {
      const { friendId } = req.body;
      const userId = req.user.id;
  
      if (userId === friendId) {
        return res.status(400).json({ message: "Нельзя добавить себя в друзья" });
      }
  
      // Проверяем, есть ли уже дружба
      const existingFriendship = await pool.query(
        "SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2",
        [userId, friendId]
      );
  
      if (existingFriendship.rows.length > 0) {
        return res.status(400).json({ message: "Этот пользователь уже в друзьях" });
      }
  
      // Добавляем в друзья
      await pool.query(
        "INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)",
        [userId, friendId]
      );
  
      res.json({ message: "Друг добавлен!" });
    } catch (error) {
      console.error("Ошибка добавления друга:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });
  
  // Проверка, является ли пользователь другом
  router.get("/check/:friendId", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
      const { friendId } = req.params;
  
      const friendCheck = await pool.query(
        "SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2",
        [userId, friendId]
      );
  
      res.json({ isFriend: friendCheck.rows.length > 0 });
    } catch (error) {
      console.error("Ошибка проверки дружбы:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });
  
  // Получение списка друзей
  router.get("/list", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const friends = await pool.query(
        `SELECT users.id, users.name, users.login
         FROM friends
         JOIN users ON friends.friend_id = users.id
         WHERE friends.user_id = $1`,
        [userId]
      );
  
      res.json(friends.rows);
    } catch (error) {
      console.error("Ошибка загрузки друзей:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });

  // Удаление из друзей
router.delete("/remove/:friendId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { friendId } = req.params;

    // Проверяем, есть ли дружба
    const friendship = await pool.query(
      "SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2",
      [userId, friendId]
    );

    if (friendship.rows.length === 0) {
      return res.status(400).json({ message: "Этот пользователь не ваш друг" });
    }

    // Удаляем друга
    await pool.query("DELETE FROM friends WHERE user_id = $1 AND friend_id = $2", [userId, friendId]);

    res.json({ message: "Друг удалён!" });
  } catch (error) {
    console.error("Ошибка удаления друга:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});



module.exports = router;
