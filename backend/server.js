const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Database file
const DB_FILE = path.join(__dirname, 'database.json');

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    students: [],
    attendance: [],
    payments: []
  }));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const saveDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get('/', (req, res) => {
  res.json({ message: '🙏 Jay Shree Krishna! Krishna Library Running!' });
});

app.get('/students', (req, res) => {
  const db = getDB();
  res.json({ success: true, data: db.students });
});

app.post('/students', (req, res) => {
  const db = getDB();
  const student = { id: Date.now(), ...req.body };
  db.students.push(student);
  saveDB(db);
  res.json({ success: true, data: student });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🙏 Jay Shree Krishna!');
});