const jwt = require('jsonwebtoken');

const jwt_key = process.env.JWT_KEY || "secret";

module.exports = function getToken(id) {
    return jwt.sign({ id }, jwt_key, {})
}