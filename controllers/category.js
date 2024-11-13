const Category = require('../models/category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, 500, e);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, 500, e);
    }
}

module.exports.create = async (req, res) => {
    try {
        const category = await new Category({
            name: req.body.name,
            imageSrc: req.body.imgSrc,
        });

        await category.save();
        res.status(201).json(category);
    } catch (e) {
        errorHandler(res, 500, e);
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Category.findOneAndDelete({
            _id: req.params.id
        });

        res.status(200).json({
            message: 'Category was deleted'
        });
    } catch (e) {
        errorHandler(res, 500, e);
    }
}

module.exports.update = async (req, res) => {
    try {
        const categoryForUpdate = {
            name: req.body.name
        }

        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
        {$set: categoryForUpdate},
            {new: true});

        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, 500, e);
    }
}