const express = require('express');
const multer = require('multer');
const Note = require('../models/Note');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, description, uploader } = req.body;
  const note = new Note({
    title,
    description,
    uploader,
    filename: req.file.filename
  });
  await note.save();
  res.json({ success: true, note });
});

router.get('/', async (req, res) => {
  const notes = await Note.find().populate('uploader');
  res.json(notes);
});

module.exports = router;
