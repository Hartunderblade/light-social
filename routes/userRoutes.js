const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const bcrypt = require('bcryptjs');
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Получение данных авторизованного пользователя
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await pool.query("SELECT id, avatar, name, login, email, category FROM users WHERE id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// router.put('/update', authMiddleware, async (req, res) => {
//     try {
//         const { name, login, email, category, avatar } = req.body;
//         const userId = req.user.id;
//
//         await pool.query(
//             "UPDATE users SET name = $1, login = $2, email = $3, category = $4, avatar = $5 WHERE id = $6",
//             [name, login, email, category, avatar, userId]
//         );
//
//         res.json({ message: "Профиль успешно обновлен" });
//     } catch (error) {
//         console.error("Ошибка при обновлении профиля:", error);
//         res.status(500).json({ message: "Ошибка сервера" });
//     }
// });

// Изменение пароля
router.put("/change-password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await pool.query("SELECT password FROM users WHERE id = $1", [userId]);
        if (user.rows.length === 0) return res.status(404).json({ message: "Пользователь не найден" });

        const passwordMatch = await bcrypt.compare(currentPassword, user.rows[0].password);
        if (!passwordMatch) return res.status(400).json({ message: "Неверный текущий пароль" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);

        res.json({ message: "Пароль успешно изменен" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Удаление профиля
router.delete("/delete", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        await pool.query("DELETE FROM users WHERE id = $1", [userId]);

        res.json({ message: "Профиль успешно удален" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получить данные профиля
router.get('/profile', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await pool.query(
            `SELECT u.id, u.name, u.login, u.avatar, ui.categories 
             FROM users u
             JOIN userInfo ui ON u.id = ui.user_id
             WHERE u.id = $1`,
            [userId]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

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

// Получение данных пользователя по ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await pool.query("SELECT id, name, login, email, category FROM users WHERE id = $1", [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error("Ошибка получения профиля пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});


// Обновление профиля
router.put("/update", authMiddleware, upload.single("avatar"), async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, login, category, password } = req.body;

        // Получаем текущие данные пользователя
        const userQuery = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const currentUser = userQuery.rows[0];

        // Обновляем только переданные поля, оставляя остальные неизменными
        const updatedUser = {
            name: name || currentUser.name,
            login: login || currentUser.login,
            category: category || currentUser.category,
            password: currentUser.password, // По умолчанию оставляем старый пароль
            avatar: currentUser.avatar, // По умолчанию оставляем старый аватар
        };

        // Если передан новый пароль — хешируем его
        if (password) {
            updatedUser.password = await bcrypt.hash(password, 10);
        }

        // Если загружен новый аватар — обновляем путь
        if (req.file) {
            updatedUser.avatar = `/uploads/${req.file.filename}`;
        }

        // Обновляем пользователя в БД
        await pool.query(
            `UPDATE users 
             SET name = $1, login = $2, category = $3, password = $4, avatar = $5 
             WHERE id = $6`,
            [updatedUser.name, updatedUser.login, updatedUser.category, updatedUser.password, updatedUser.avatar, userId]
        );

        res.json({ message: "Профиль успешно обновлен", user: updatedUser });
    } catch (error) {
        console.error("Ошибка при обновлении профиля:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router;
