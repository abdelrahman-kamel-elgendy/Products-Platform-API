const app = require('./app.js');
const dbConnect = require('./Database/dbConnections.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


//connect to database
dbConnect.connectMongoDB(process.env.CONN_STR);

//create server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Started!');
    console.log(`Server is running on port ${port}`);
});