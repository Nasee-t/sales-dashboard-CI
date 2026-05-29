const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let db;

(async () => {
    db = await open({
        filename: './sales_leads.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_name TEXT,
            status TEXT,
            value REAL,
            date TEXT
        )
    `);

    const count = await db.get('SELECT COUNT(*) as count FROM leads');
    if (count.count === 0) {
        const statuses = ['Cold', 'Warm', 'Hot'];
        for (let i = 1; i <= 15; i++) {
            // Generate data for the last 5 days
            const day = Math.floor(i / 3) + 1; 
            await db.run(
                'INSERT INTO leads (client_name, status, value, date) VALUES (?, ?, ?, ?)',
                [`Lead ${i}`, statuses[i % 3], Math.floor(Math.random() * 1000) + 500, `2024-05-0${day}`]
            );
        }
    }
    console.log("Backend Ready on http://localhost:8080");
})();

// GET all leads
app.get('/leads', async (req, res) => {
    const leads = await db.all('SELECT * FROM leads');
    res.json(leads);
});

// PATCH lead status (for Drag and Drop)
app.patch('/leads/:id', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    await db.run('UPDATE leads SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true });
});

app.listen(8080);
