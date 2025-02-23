require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Настройка для работы с PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// const JWT_SECRET = process.env.JWT_SECRET;
app.use("/uploads", express.static("uploads"));
// Настройка CORS
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Функция для генерации токена
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Нет доступа" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Неверный токен" });
  }
};

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/register", upload.single("fileAvatar"), async (req, res) => {
  const { fullName, login, email, category, password, confirmPassword, consent } = req.body;

  if (!fullName || !login || !email || !category || !password || !confirmPassword || !consent) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Пароли не совпадают" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null; 

    const newUser = await pool.query(
      "INSERT INTO users (avatar, full_name, login, email, category, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [avatarPath, fullName, login, email, category, hashedPassword]
    );

    const token = generateToken(newUser.rows[0].id);

    res.json({ message: "Регистрация успешна", token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: "Введите логин и пароль" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE login = $1", [login]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = generateToken(user.rows[0].id);
    res.json({ message: "Вход успешен", token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const userData = user.rows[0];
    if (userData.avatar) {
      userData.avatar = `http://localhost:3000${userData.avatar}`; // Добавляем полный URL
    }

    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Получение всех категорий
app.get("/api/categories", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM categories");
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });
  
  // Добавление категории
  app.post("/api/categories", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Название обязательно" });
  
    try {
      await pool.query("INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING", [name]);
      res.json({ message: "Категория добавлена" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });
  
  // Редактирование категории
  app.put("/api/categories/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (!name) return res.status(400).json({ message: "Название обязательно" });
  
    try {
      await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [name, id]);
      res.json({ message: "Категория обновлена" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });
  
  // Удаление категории
  app.delete("/api/categories/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query("DELETE FROM categories WHERE id = $1", [id]);
      res.json({ message: "Категория удалена" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});