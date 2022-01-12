const hotelAuth = (req, res, next) => {
    if(req.user.roleId == 3) {
        next();
    } else {
        res.send({"error": "Brak dostępu"});
	    return;
    }
}

module.exports = hotelAuth;