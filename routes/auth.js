const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // load in from .env file

/**
 * Middleware function for authenticating user using their JWT token.
 * @param {*} req contains the JWT token in header.
 */
function authenticate(req, res, next) {
    const jwtToken = req.headers['authorization'];

    if (jwtToken == null) {
        return res.sendStatus(401);
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, 
            (err, data) => {
                if (err) {
                    return res.sendStatus(403).json({ error: `Failed to generate JWT Access Token.` }); // 403: unauthorized access
                }
                req.body.id = data.id; // id is the decoded jwt string.
                next(); // pass execution on
            });
}

module.exports = authenticate;