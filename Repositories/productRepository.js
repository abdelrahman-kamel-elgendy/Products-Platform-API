const mongoose = require('mongoose');
const BaseRepository = require('./BaseRepository');
const categoryModel = require('../Models/categoryModel');

class ProductRepository extends BaseRepository {
    constructor(model) {
        super(model);
    }

    async getProductsByCategory(categoryId) {
        return this.model.find({ category: categoryId, isActive: true });
    }

    async getActiveProducts() {
        return this.model.find({ isActive: true });
    }
}

module.exports = ProductRepository;