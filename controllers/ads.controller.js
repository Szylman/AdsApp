const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) res.status(404).json({ message: 'Not found' });
        else res.json(ad);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.newAd = async (req, res) => {
    try {
        const { title, description, date, price, localization, user, phone } =
            req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

        if (
            title &&
            title.length >= 10 &&
            title.length <= 50 &&
            description &&
            description.length >= 20 &&
            description.length <= 1000 &&
            date &&
            req.file &&
            ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
            price &&
            localization &&
            user &&
            phone
        ) {
            const ad = Ad.create({
                title,
                description,
                date,
                image: req.file.filename,
                price,
                localization,
                user,
                phone,
            });

            res.status(201).send({ message: 'Add created ' });
        } else {
            if (req.file) {
                fs.unlinkSync(`./public/uploads//${req.file.filename}`);
            }
            res.status(400).send({ message: 'Bad request' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad) {
            await Ad.deleteOne({ _id: req.params.id });
            req.json({ message: 'ok' });
        } else res.status(404).json({ message: err });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.editAd = async (req, res, next) => {
    const { title, description, price, date, localization, user } = req.body;
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) return res.status(404).json({ message: 'Ad not found' });
        else {
            ad.title = title;
            ad.description = description;
            ad.price = price;
            ad.date = date;
            ad.localization = localization;
            ad.user = user;
            if (req.file) {
                ad.image = req.file.image;
            }
            const updatedAd = await ad.save();
            res.json(updatedAd);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchPhrase = async (req, res, next) => {
    const { searchPhrase } = req.params;
    try {
        const ads = await Ad.find({ $text: { $search: searchPhrase } });
        if (!ads) return res.status(404).json({ message: 'Ad not found' });
        else res.json(ads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};