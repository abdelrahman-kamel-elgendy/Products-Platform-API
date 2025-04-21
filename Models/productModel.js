const mongoose = require('mongoose');
const CategoryModel = require('./categoryModel');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    images: [String],
    isActive: {
        type: Boolean,
        default: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    }
});

productSchema.pre('save', async function () {
    const category = await CategoryModel.findById(this.category);
    if (!category)
        throw new Error('Category not found');

    if (!category.products.includes(this._id)) {
        category.products.push(this._id);
        await category.save();
    }
});

productSchema.pre('findByIdAndUpdate', async function (doc) {
    const category = await CategoryModel.findById(this.category);

    if (!category)
        throw new Error('Category not found');

    if (!category.products.includes(this._id)) {
        category.products.push(this._id);
        await category.save();
    }
});

productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        const Category = mongoose.model('Category');
        await Category.findByIdAndUpdate(
            doc.category,
            { $pull: { products: doc._id } }
        );
    }
});

module.exports = mongoose.model('Product', productSchema);