const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Создание поста с категорией
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, content, image, category_id } = req.body;
        const userId = req.user.id;

        // Получаем данные пользователя
        const user = await pool.query("SELECT name, avatar FROM users WHERE id = $1", [userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const { name, avatar } = user.rows[0];

        // Проверяем, существует ли категория
        const category = await pool.query("SELECT name FROM categories WHERE id = $1", [category_id]);
        if (category.rows.length === 0) {
            return res.status(400).json({ message: "Категория не найдена" });
        }
        const categoryName = category.rows[0].name;

        // Записываем пост в базу
        const newPost = await pool.query(
            `INSERT INTO posts (user_id, title, content, image, category_id, created_at)
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
            [userId, title, content, image, category_id]
        );

        // Возвращаем пост с категорией
        res.status(201).json({
            ...newPost.rows[0],
            name,
            avatar,
            category: categoryName, // Добавляем название категории
        });
    } catch (error) {
        console.error("Ошибка при создании поста:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получение всех постов пользователя с категориями
router.get("/user", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const posts = await pool.query(
            `SELECT posts.*, users.name, users.avatar, categories.name AS category_name
             FROM posts
             JOIN users ON posts.user_id = users.id
             LEFT JOIN categories ON posts.category_id = categories.id
             WHERE posts.user_id = $1 
             ORDER BY posts.created_at DESC`,
            [userId]
        );

        res.json(posts.rows);
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получение всех категорий (для выбора при создании поста)
router.get("/categories", async (req, res) => {
    try {
        const categories = await pool.query("SELECT * FROM categories");
        res.json(categories.rows);
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получение постов конкретного пользователя
// router.get("/user/:id", authMiddleware, async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [userId]);
//
//         res.json(posts.rows);
//     } catch (error) {
//         console.error("Ошибка получения постов:", error);
//         res.status(500).json({ message: "Ошибка сервера" });
//     }
// });


// Получение постов по категории пользователя
router.get("/news", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Получаем category_id пользователя
        const userQuery = await pool.query(
            `SELECT categories.id AS category_id 
             FROM users 
             JOIN categories ON users.category = categories.name 
             WHERE users.id = $1`,
            [userId]
        );

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден или у него нет категории" });
        }

        const userCategoryId = userQuery.rows[0].category_id; // ID категории пользователя

        // Получаем посты с той же категорией
        const postsQuery = await pool.query(
            `SELECT posts.*, users.name, users.avatar, categories.name AS category
             FROM posts
                      JOIN users ON posts.user_id = users.id
                      JOIN categories ON posts.category_id = categories.id
             WHERE posts.category_id = $1
             ORDER BY posts.created_at DESC`,
            [userCategoryId]
        );

        res.json(postsQuery.rows);
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.get('/user/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await pool.query(`
            SELECT posts.*, categories.name AS category
            FROM posts
                     LEFT JOIN categories ON posts.category_id = categories.id
            WHERE posts.user_id = $1
            ORDER BY posts.created_at DESC
        `, [id]);

        res.json(posts.rows);
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

router.put("/posts/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, category_id } = req.body;
        const userId = req.user.id;

        // Проверяем, существует ли пост и принадлежит ли он пользователю
        const postQuery = await pool.query("SELECT * FROM posts WHERE id = $1 AND user_id = $2", [id, userId]);

        if (postQuery.rows.length === 0) {
            return res.status(404).json({ message: "Пост не найден или у вас нет прав на его редактирование" });
        }

        // Обновляем пост
        const updatedPost = await pool.query(
            `UPDATE posts 
             SET title = $1, content = $2, image = $3, category_id = $4, updated_at = NOW() 
             WHERE id = $5 RETURNING *`,
            [title, content, image, category_id, id]
        );

        res.json(updatedPost.rows[0]);
    } catch (error) {
        console.error("Ошибка при редактировании поста:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});


module.exports = router;
