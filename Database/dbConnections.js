const mongoose = require('mongoose');
const UserService = require('../Services/userService');
const UserRepository = require('../Repositories/userRepository');

exports.connectMongoDB = async (connectionString) => {
    try {
        const conn = await mongoose.connect(connectionString);
        console.log('DB Connected!');
        console.log(`Database Host: ${conn.connection.host}\nDatabase Port: ${conn.connection.port}\n`);
    } catch (err) {
        console.log('DB Connection Failed!');
        console.log(err.message);
    }
};

exports.connectMySql = () => {
    // MySQL connection logic here
}
