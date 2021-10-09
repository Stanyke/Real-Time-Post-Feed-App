const dotenv = require('dotenv')

dotenv.config()

const {
    PORT,
    DB_URI
} = process.env

module.exports = {
    localPort: PORT,
    dbUri: DB_URI
}