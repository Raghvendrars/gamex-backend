const jwt = require('jsonwebtoken');

const jwt_key = process.env.JWT_KEY || "secret";

module.exports = function validateUser(token) {
    if (!token) {
		return null;
	}
	const data = jwt.verify(token, jwt_key);
	return data;
}