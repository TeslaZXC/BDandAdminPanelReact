import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser'; // Для обработки тела запросов

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Позволяет парсить JSON из тела запроса

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'UserData'
});

// Путь для получения всех пользователей
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Путь для добавления нового пользователя
app.post('/addUser', (req, res) => {
    const { name, age, description } = req.body;
    const sql = "INSERT INTO user (name, age, description) VALUES (?, ?, ?)";
    db.query(sql, [name, age, description], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "User added successfully", userId: result.insertId });
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
