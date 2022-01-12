const adminAuth = (req, res, next) => {
    if(req.user.roleId == 1) {
        next();
    } else {
        res.send({"error": "Brak dostępu"});
	    return;
    }
}

module.exports = adminAuth;