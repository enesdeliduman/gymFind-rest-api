module.exports = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, message: "You do not have access authorization" })
    }
    next()
}