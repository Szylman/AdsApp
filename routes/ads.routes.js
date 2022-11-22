const express = require('express');
const router = express.Router();
const Ads = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUploads');
const authMiddleware = require('../utils/authMiddleware');

// ads

router.get('/ads', Ads.getAll);

router.get('/ads/:id', Ads.getById);

router.post('/ads', authMiddleware, imageUpload.single('image'), Ads.newAd);

router.delete('/ads/:id', authMiddleware, Ads.deleteById);

router.put('/ads/:id', authMiddleware, Ads.editAd);

module.exports = router;