const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

let isConnected = false; // Define isConnected at the module level

const connectDb = async (dbName) => {
    try {
        if (!dbName) {
            throw new Error('Database name is not provided');
        }

        const connectionUrl = process.env[`${dbName}_CONNECTION_STRING`];
        if (!connectionUrl) {
            throw new Error(`Connection string not found for database: ${dbName}`);
        }

        const connect = await mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true; // Set isConnected to true upon successful connection
        console.log(`Connected to ${dbName} database.`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const closeDbConnection = async () => {
    if (isConnected) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed on logout');
        isConnected = false;
    }
};

module.exports = { connectDb, closeDbConnection };
