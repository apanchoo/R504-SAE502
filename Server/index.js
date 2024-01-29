const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Créer une connexion à la base de données SQLite
const db = new sqlite3.Database('faceio_data.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connecté à la base de données SQLite.');
});

// Créer la table si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS emargement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  faceio_id TEXT,
  date TEXT,
  gps_position TEXT
)`);

// Route pour enregistrer les données d'émargement
app.post('/emargement', (req, res) => {
  const { faceio_id, date, gps_position } = req.body;

  const sql = `INSERT INTO emargement (faceio_id, date, gps_position) VALUES (?, ?, ?)`;
  db.run(sql, [faceio_id, date, gps_position], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Émargement enregistré avec succès' });
    console.log("Émargement enregistré avec succès");
  });
});

app.get('/emargements', (req, res) => {
  const sql = `SELECT * FROM emargement`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    // Convertir les données de la base de données au format attendu par le frontend
    const students = rows.map(row => ({
      id: row.id,
      name: `Étudiant ${row.faceio_id}`, // Remplacer par une logique de récupération du nom si disponible
      present: true, // Supposons que tous les étudiants dans la base de données sont présents
      date: row.date // Ajout de la date d'émargement
    }));
    res.json(students);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

