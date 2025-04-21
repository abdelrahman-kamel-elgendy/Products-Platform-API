const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');

//models
const ProductModel = require('./Models/productModel');
const CategoryModel = require('./Models/categoryModel');
const UserModel = require('./models/userModel');

//repositories
const ProductRepository = require('./Repositories/productRepository');
const CategoryRepository = require('./Repositories/categoryRepository');
const UserRepository = require('./Repositories/userRepository');

//services
const ProductService = require('./Services/productService');
const CategoryService = require('./Services/categoryService');
const AuthService = require('./Services/authService');

//controllers
const ProductController = require('./Controllers/productController');
const CategoryController = require('./Controllers/categoryController');
const AuthController = require('./Controllers/authController');

//routes
const productRouter = require('./Routes/productRouter');
const categoryRouter = require('./Routes/categoryRouter');
const authRouter = require('./Routes/authRouter');

//initialize express app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//dependency injection
const categoryRepository = new CategoryRepository(CategoryModel);
const productRepository = new ProductRepository(ProductModel);
const userRepository = new UserRepository(UserModel);

const categoryService = new CategoryService(categoryRepository);
const productService = new ProductService(productRepository, categoryRepository);
const authService = new AuthService(userRepository);

const categoryController = new CategoryController(categoryService);
const productController = new ProductController(productService);
const authController = new AuthController(authService);


//routes
app.use('/auth', authRouter(authController));
app.use('/product', productRouter(productController));
app.use('/category', categoryRouter(categoryController));

//error handling middleware
app.use(errorHandler);


module.exports = app 