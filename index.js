const express = require('express');
const {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('./crudService');

const app = express();
const port = 3000;

app.use(express.json());

// Créer un article
app.post('/articles', async (req, res) => {
  try {
    const article = await createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'article' });
  }
});

// Lire tous les articles
app.get('/articles', async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
});

// Lire un article par ID
app.get('/articles/:id', async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
  }
});

// Mettre à jour un article
app.put('/articles/:id', async (req, res) => {
  try {
    const updated = await updateArticle(req.params.id, req.body);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Article non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article' });
  }
});

// Supprimer un article
app.delete('/articles/:id', async (req, res) => {
  try {
    const deleted = await deleteArticle(req.params.id);
    if (deleted) {
      res.json(deleted);
    } else {
      res.status(404).json({ error: 'Article non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
