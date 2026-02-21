import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
// DB Connection
const dbUrl = process.env.DATABASE_URL;
console.log('Environment:', process.env.NODE_ENV);

// Configuration logic: Prioritize individual variables ONLY if DATABASE_URL isn't targeting localhost
// This prevents production settings in .env from breaking local development
const poolConfig: any = {};

if (dbUrl && (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1'))) {
  let sanitizedUrl = dbUrl.trim().replace(/^["']|["']$/g, '');
  sanitizedUrl = sanitizedUrl.replace(/^(railwaypostgresql|railwaypostgres):\/\//i, 'postgresql://');
  poolConfig.connectionString = sanitizedUrl;
} else if (process.env.DB_HOST) {
  poolConfig.user = process.env.DB_USER;
  poolConfig.password = process.env.DB_PASSWORD;
  poolConfig.host = process.env.DB_HOST;
  poolConfig.port = parseInt(process.env.DB_PORT || '5432');
  poolConfig.database = process.env.DB_NAME;
} else if (dbUrl) {
  let sanitizedUrl = dbUrl.trim().replace(/^["']|["']$/g, '');
  sanitizedUrl = sanitizedUrl.replace(/^(railwaypostgresql|railwaypostgres):\/\//i, 'postgresql://');
  poolConfig.connectionString = sanitizedUrl;
}

const isProduction = process.env.NODE_ENV === 'production' ||
  (dbUrl && !dbUrl.includes('localhost') && !dbUrl.includes('127.0.0.1')) ||
  (poolConfig.host && !poolConfig.host.includes('localhost') && !poolConfig.host.includes('127.0.0.1'));

console.log('Detected environment for SSL:', isProduction ? 'Production' : 'Local');

poolConfig.ssl = isProduction ? { rejectUnauthorized: false } : undefined;

const pool = new Pool(poolConfig);

// Initialize DB Tables
const initDB = async () => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW())');
    await pool.query('CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW())');
    await pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, status VARCHAR(50) DEFAULT \'todo\', deadline VARCHAR(50), created_at TIMESTAMP DEFAULT NOW())');

    // Ensure deadline column exists (for migrations)
    await pool.query('ALTER TABLE tasks ADD COLUMN IF NOT EXISTS deadline VARCHAR(50)');

    // Seed a demo user if doesn't exist
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@taskflow.com']);
    if (userRes.rowCount === 0) {
      await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', ['admin@taskflow.com', 'password123']);
    }
    console.log('Database connected successfully');
  } catch (err: any) {
    console.error('DB Init Error:', err);
    console.error('Connection string present:', !!process.env.DATABASE_URL);
  }
};
initDB();

// Routes
app.get('/api/debug-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const userCount = await pool.query("SELECT COUNT(*) FROM users").catch(() => ({ rows: [{ count: 'Error: table might not exist' }] }));

    res.json({
      status: 'Database connected',
      time: result.rows[0].now,
      isProduction,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasIndividualVars: !!(process.env.DB_HOST && process.env.DB_USER),
      tables: tables.rows.map(r => r.table_name),
      userCount: userCount.rows[0].count,
      config: {
        host: poolConfig.host,
        database: poolConfig.database,
        user: poolConfig.user,
        port: poolConfig.port,
        ssl: !!poolConfig.ssl
      }
    });
  } catch (err: any) {
    console.error('Debug DB Error:', err);
    res.status(500).json({
      error: 'Database connection failed',
      details: err.message,
      code: err.code,
      isProduction,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasIndividualVars: !!(process.env.DB_HOST && process.env.DB_USER),
      config: {
        host: poolConfig.host,
        database: poolConfig.database,
        user: poolConfig.user,
        port: poolConfig.port,
        ssl: !!poolConfig.ssl
      }
    });
  }
});

// Auth Routes
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkUser.rowCount && checkUser.rowCount > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, password]
    );

    console.log('User signed up:', email);
    res.status(201).json({
      message: 'User created successfully',
      user: { id: result.rows[0].id, email: result.rows[0].email }
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rowCount && result.rowCount > 0) {
      console.log('Login successful for:', email);
      res.json({ message: 'Login successful', user: { email: result.rows[0].email } });
    } else {
      console.log('Login failed: Invalid credentials for:', email);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err: any) {
    console.error('FATAL Login error:', err);
    res.status(500).json({
      error: 'Auth failed',
      details: err.message,
      code: err.code,
      hint: 'Check database connectivity and table schema'
    });
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
    console.error('Waitlist database error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message, code: err.code });
  }
});

// Task CRUD Routes
app.get('/api/tasks', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, status VARCHAR(50) DEFAULT \'todo\', deadline VARCHAR(50), created_at TIMESTAMP DEFAULT NOW())');
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err: any) {
    console.error('FETCH TASKS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, deadline) VALUES ($1, $2, $3) RETURNING *',
      [title, description, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Task creation error:', err);
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
});

app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, deadline } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), deadline = COALESCE($4, deadline) WHERE id = $5 RETURNING *',
      [title, description, status, deadline, id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error('Task update error:', err);
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err: any) {
    console.error('Task deletion error:', err);
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static files from the React app
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
