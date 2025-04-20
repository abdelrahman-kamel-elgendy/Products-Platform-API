const express = require('express');
const cors = require('cors');
const errorHandler = require('./Utils/errorHandler');
const bodyParser = require('body-parser');
//models
const ProductModel = require('./Models/productModel');
const CategoryModel = require('./Models/categoryModel');
//repositories
const ProductRepository = require('./Repositories/productRepository');
const CategoryRepository = require('./Repositories/categoryRepository');
//services
const ProductService = require('./Services/productService');
const CategoryService = require('./Services/categoryService');
//controllers
const ProductController = require('./Controllers/productController');
const CategoryController = require('./Controllers/categoryController');
//routes
const productRoute = require('./Routes/productRoute');
const categoryRoute = require('./Routes/categoryRoute');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//dependency injection
const categoryRepository = new CategoryRepository(CategoryModel);
const productRepository = new ProductRepository(ProductModel);

const categoryService = new CategoryService(categoryRepository);
const productService = new ProductService(productRepository, categoryRepository);

const categoryController = new CategoryController(categoryService);
const productController = new ProductController(productService);

//routes
app.use('/product', productRoute(productController));
app.use('/category', categoryRoute(categoryController));

//error handling middleware
app.use(errorHandler);


module.exports = app 