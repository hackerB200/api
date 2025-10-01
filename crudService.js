const { getConnection } = require('./db');

// CREATE: Ajouter un nouvel article
const createArticle = async ({ nom, quantite }) => {
  const client = await getConnection();
  try {
    const query = 'INSERT INTO articles (nom, quantite) VALUES ($1, $2) RETURNING *';
    const values = [nom, quantite];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);
    throw error;
  } finally {
    client.release();
  }
};

// READ ALL: Récupérer tous les articles
const getAllArticles = async () => {
  const client = await getConnection();
  try {
    const result = await client.query('SELECT * FROM articles ORDER BY id ASC');
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles :', error);
    throw error;
  } finally {
    client.release();
  }
};

// READ ONE: Récupérer un article par ID
const getArticleById = async (id) => {
  const client = await getConnection();
  try {
    const result = await client.query('SELECT * FROM articles WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article avec l'ID ${id} :`, error);
    throw error;
  } finally {
    client.release();
  }
};

// UPDATE: Mettre à jour un article
const updateArticle = async (id, { nom, quantite }) => {
  const client = await getConnection();
  try {
    const query = `
      UPDATE articles
      SET nom = $1, quantite = $2
      WHERE id = $3
      RETURNING *
    `;
    const values = [nom, quantite, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'article avec l'ID ${id} :`, error);
    throw error;
  } finally {
    client.release();
  }
};

// DELETE: Supprimer un article
const deleteArticle = async (id) => {
  const client = await getConnection();
  try {
    const result = await client.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'article avec l'ID ${id} :`, error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
