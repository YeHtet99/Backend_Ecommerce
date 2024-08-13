const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    console.log("headers", req.headers.token);
    const SECRET_KEY = "your_secret_key";

    if (req.url === "/signup" || req.url === "/login") {
        return next();
    } else {
        const token = req.headers.token;
        if (!token) return res.status(403).send({ message: "No token provided!" });

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            console.log("decoded", decoded);
            if (err) return res.status(500).send({ message: "Failed to authenticate token!" });

            // Attach user info to request object and pass control to the next middleware/route handler
            req.user = decoded;
            next();
        });
    }
};

module.exports = {
    authenticationMiddleware,
};
