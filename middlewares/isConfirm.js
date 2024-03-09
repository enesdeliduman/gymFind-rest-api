module.exports = (req, res, next) => {
    if (!req.user.isConfirm) {
        return res.status(403).json({ success: false, message: "I'm sorry, only verified accounts can access that." })
    }
    next()
}