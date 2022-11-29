const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
    try {
        res.json(await Ad.find().populate('user'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const elm = await Ad.findById(req.params.id).populate('user');
        if (!elm) res.status(404).json({
            message: 'Not found'
        });
        else res.json(elm);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.newAd = async (req, res) => {
    console.log(req.file);
    try {
        const { title, content, price, place } =
            req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        const user = req.session.user.id;
        if (
            title &&

            content &&

            req.file &&
            ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
            price &&
            user
        ) {
            const ad = Ad.create({
                title,
                content,
                image: req.file.filename,
                price,
                localization: place,
                user
            });

            return res.status(201).send({ message: 'Add created ' });
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
    const { title, content, price, place, user } = req.body;
    try {
        const ad = await Ad.findById(req.params.id);
        if (!ad) return res.status(404).json({ message: 'Ad not found' });
        else {
            ad.title = title;
            ad.content = content;
            ad.price = price;
            ad.place = place;
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