const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Simple file-based database
const DB_FILE = './database.json';

// Create database file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    students: [],
    attendance: [],
    payments: []
  }));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const saveDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🙏 Jay Shree Krishna! Server Running!' });
});

// Get all students
app.get('/students', (req, res) => {
  const db = getDB();
  res.json({ success: true, data: db.students });
});

// Add student
app.post('/students', (req, res) => {
  const db = getDB();
  const student = { id: Date.now(), ...req.body };
  db.students.push(student);
  saveDB(db);
  res.json({ success: true, data: student });
});

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
  console.log('🙏 Jay Shree Krishna! Krishna Library Ready!');
  console.log('✅ Open browser and go to: http://localhost:5000');
});