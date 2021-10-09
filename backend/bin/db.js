var mongoose = require('mongoose');
const {dbUri} = require('./config');


module.exports = function init() {
    if (dbUri) {
        mongoose.connect(
            dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
            (err) => {
                if (err) {
                    console.log("Database connection failed", err);
                }
                else {
                    console.log("Sucessfully connected to MongoDB");
                }
            }

        );
    } else {
        throw new Error("DB URI not found, please kindly check your connection strings to mongoose");
    }
}