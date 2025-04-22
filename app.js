const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
const UserService = require('./Services/userService');
const AuthService = require('./Services/authService');
const PasswordResetService = require('./Services/PasswordResetService');

//controllers
const ProductController = require('./Controllers/productController');
const CategoryController = require('./Controllers/categoryController');
const UserController = require('./Controllers/userController');
const AuthController = require('./Controllers/authController');
const PasswordResetController = require('./Controllers/passwordResetController');

//routes
const productRouter = require('./Routes/productRouter');
const categoryRouter = require('./Routes/categoryRouter');
const userRouter = require('./Routes/userRouter');
const authRouter = require('./Routes/authRouter');
const passwordResetRouter = require('./Routes/passwordResetRouter');

//initialize express app
const app = express();

//middleware
app.use(cors({
    credentials: true // Allow cookies
}));
app.use(bodyParser.json());
app.use(cookieParser());

//dependency injection
const categoryRepository = new CategoryRepository(CategoryModel);
const productRepository = new ProductRepository(ProductModel);
const userRepository = new UserRepository(UserModel);

const categoryService = new CategoryService(categoryRepository);
const productService = new ProductService(productRepository, categoryRepository);
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);
const passwordResetService = new PasswordResetService(userRepository);

const categoryController = new CategoryController(categoryService);
const productController = new ProductController(productService);
const userController = new UserController(userService);
const authController = new AuthController(authService);
const passwordResetController = new PasswordResetController(passwordResetService);


//routes
app.use('/passwordReset', passwordResetRouter(passwordResetController));
app.use('/auth', authRouter(authController));
app.use('/user', userRouter(userController));
app.use('/product', productRouter(productController));
app.use('/category', categoryRouter(categoryController));


//error handling middleware
app.use(errorHandler);

module.exports = app 