const Fisherman = require('../models/Fisherman');

exports.getFishermen = (req, res) => {
  const list = Fisherman.getAll();
  res.json({ fishermen: list });
};

exports.getFishermanById = (req, res) => {
  const fisherman = Fisherman.getById(req.params.id);
  if (!fisherman) return res.status(404).json({ error: 'Fisherman not found' });
  res.json({ fisherman });
};
