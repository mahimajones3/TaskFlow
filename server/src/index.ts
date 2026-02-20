import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize DB Tables
const initDB = async () => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW())');
    await pool.query('CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW())');
    await pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, status VARCHAR(50) DEFAULT \'todo\', created_at TIMESTAMP DEFAULT NOW())');

    // Seed a demo user if doesn't exist
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@taskflow.com']);
    if (userRes.rowCount === 0) {
      await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', ['admin@taskflow.com', 'password123']);
      console.log('Demo user created: admin@taskflow.com / password123');
    }
  } catch (err) {
    console.error('DB Init Error:', err);
  }
};
initDB();

// Routes
// Auth Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rowCount && result.rowCount > 0) {
      res.json({ message: 'Login successful', user: { email: result.rows[0].email } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Auth failed' });
  }
});
// Waitlist Route
app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW())');
    await pool.query('INSERT INTO waitlist (email) VALUES ($1)', [email]);
    res.status(201).json({ message: "You're on the waitlist!" });
  } catch (err: any) {
    if (err.code === '23505') return res.status(400).json({ error: 'Email already exists' });
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task CRUD Routes
app.get('/api/tasks', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, status VARCHAR(50) DEFAULT \'todo\', created_at TIMESTAMP DEFAULT NOW())');
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err: any) {
    console.error('FETCH TASKS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status) WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
