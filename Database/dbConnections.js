const mongoose = require('mongoose');

exports.connectMongoDB = (connectionString) => {
    mongoose.connect(connectionString)
        .then((conn) => {
            console.log('DB Connected!');
            console.log(`Database Host: ${conn.connection.host}, Port: ${conn.connection.port}`);
        }).catch((err) => {
            console.log('DB Connection Failed!');
            console.log(err.message);
        })
};

exports.connectMySql = () => {
    // MySQL connection logic here
}
