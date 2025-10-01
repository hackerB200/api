const { Pool } = require('pg');

// Créez un pool de connexions avec vos informations de connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'postgres',
  port: 5432,
});

// Fonction pour obtenir la connexion à la BD
const getConnection = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Erreur lors de la connexion à PostgreSQL', error);
    throw error;
  }
};

module.exports = { getConnection };
