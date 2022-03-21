const klientAuth = (req, res, next) => {
    if(req.user.roleId == 4) {
        next();
    } else {
        res.send({"error": "Brak dostępu"});
	    return;
    }
}

module.exports = klientAuth;