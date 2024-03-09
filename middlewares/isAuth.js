const jwt = require("jsonwebtoken")
module.exports = async function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ success: false, message: "Token not found" })
    }
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decodedToken
        next()
    }
    catch (ex) {
        res.status(401).json({ success: false, message: "Token Expired", ex })
        if (ex.name == "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token Expired" })
        }
        return res.status(400).json({ success: false, message: "Faulty token" })
    }
}