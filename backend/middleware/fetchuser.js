const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";

const fetchuser = (req, res, next) => {
    try {
        // get the token
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        let errFound = false;
        // verify the token with the secret
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                // if an error
                errFound = true;
                return res.status(401).json({ success, message: "Invalid token." });
            } else {
                // add it to the request
                req.user = data.user;
            }
        })
        if (errFound) {
            return;
        }
        next();
    } catch (error) {
        return res.status(500).json({ error });
    }

}

module.exports = fetchuser;