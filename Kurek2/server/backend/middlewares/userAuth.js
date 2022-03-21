const klientAuth = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.send({"error": "Nie jesteś zalogowany"});
	    return;
    }
}

module.exports = klientAuth;