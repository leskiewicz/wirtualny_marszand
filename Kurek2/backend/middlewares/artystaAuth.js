const artystaAuth = (req, res, next) => {
    if(req.user.roleId == 2) {
        next();
    } else {
        res.send({"error": "Brak dostępu"});
	    return;
    } 
}

module.exports = artystaAuth;