const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }), express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const db = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'josue',
    database: 'jgramajo'
  });

  db.on('connect', () => {
    console.log('Connected to MySQL database');
  });

  db.on('error', (err) => {
    console.error('Error connecting to MySQL:', err);
  });

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  console.log(req.body);

  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Login failed. Please check your username and password.' });
    }

    // Close the connection after the query is executed
    db.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection:', err);
      } else {
        console.log('MySQL connection closed');
      }
    });
  });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  const { username, password } = req.body;

   const db = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'josue',
    database: 'jgramajo'
  });

  db.on('connect', () => {
    console.log('Connected to MySQL database');
  });

  db.on('error', (err) => {
    console.error('Error connecting to MySQL:', err);
  });

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.json({ success: false, message: 'Error creating user.' });
    } else {
      res.json({ success: true, message: 'User created successfully.' });
    }
  });
});

app.get('/update', (req, res) => {
  res.render('update');
});

app.post('/update', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  console.log("body: ",req.body);
  
   // Move database connection setup inside the login endpoint
   const db = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'josue',
    database: 'jgramajo'
  });

  db.on('connect', () => {
    console.log('Connected to MySQL database');
  });

  db.on('error', (err) => {
    console.error('Error connecting to MySQL:', err);
  });

  // Consulta SQL de actualización
  const updateQuery = `UPDATE users
                       SET password = ?
                       WHERE username = ? AND password = ?`;
  // Ejecuta la consulta
  db.query(updateQuery, [newPassword, username, oldPassword], (err, results) => {
    console.log('user:',username)
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el usuario.');
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: 'Usuario actualizado correctamente.' });
      } else {
        res.json({ error: 'Usuario no encontrado o la contraseña anterior es incorrecta.' });
      }
    }
  });
});

app.get('/delete', (req, res) => {
  res.render('delete');
});

app.post('/delete', (req, res) => {
  const { username } = req.body;

   const db = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'josue',
    database: 'jgramajo'
  });

  db.on('connect', () => {
    console.log('Connected to MySQL database');
  });

  db.on('error', (err) => {
    console.error('Error connecting to MySQL:', err);
  });

  // Consulta SQL para eliminar un usuario
  const query = 'DELETE FROM users WHERE username = ?';

  db.query(query, [username], (err, result) => {
    if (err) {
      res.json({ success: false, message: 'Error eliminado el usuario.' });
    } else {
      res.json({ success: true, message: 'User eliminado correctamente.' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
