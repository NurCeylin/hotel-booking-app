const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📁 'uploads' klasörü yoksa oluştur
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// 📷 Multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

// Fotoğraf dosyası kontrolü
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyası yüklenebilir.'));
    }
  }
});

// ✅ Kayıt ol (fotoğraflı)
router.post('/register', upload.single('photo'), async (req, res) => {
  const { name, email, password, country, city } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Bu e-posta ile zaten bir hesap mevcut.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const photoPath = req.file ? `/uploads/${req.file.filename}` : '';

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      country,
      city,
      photo: photoPath
    });

    res.status(201).json({ message: 'Kayıt başarılı' });
  } catch (err) {
    console.error("Kayıt sırasında hata:", err);
    res.status(400).json({ error: 'Kayıt başarısız', message: err.message });
  }
});

// ✅ Giriş yap
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Girilen e-posta ile eşleşen bir hesap bulunamadı.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Girilen şifreyle eşleşen bir hesap bulunamadı.' });

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET || 'gizli_anahtar',
      { expiresIn: '1h' }
    );

    res.json({ token, name: user.name, photo: user.photo || '' });
  } catch (err) {
    console.error("Giriş sırasında hata:", err);
    res.status(500).json({ error: 'Giriş başarısız', message: err.message });
  }
});

// ✅ Tüm kullanıcıları getir (opsiyonel)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Kullanıcıları alma hatası:", err);
    res.status(500).json({ error: 'Kullanıcılar alınamadı', message: err.message });
  }
});

module.exports = router;
