const mongoose = require('mongoose');

// Configuration of Mongoose
mongoose.Promise = require('bluebird');
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Mongoose default connection is open to " + dbUrl);
});

db.on('error', (error) => {
    console.error("Mongoose default connection has occured " + error + " error");
});

db.on('disconnected', () => {
    console.log("Mongoose default connection is disconnected");
});

db.on('SIGNT', () => {
    db.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    });
});