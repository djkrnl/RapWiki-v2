const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    let token = req.headers["x-access-token"];
    if (!token) return res.status(403).send({ message: "No token provided" });
    
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decodeduser) => {
        if (err) return res.status(401).send({ message: "Unauthorized" });

        req.user = decodeduser
        next()
    })
}

module.exports = authenticateToken
