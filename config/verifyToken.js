function verifyToken(req, res, next){
    var bearerHeader = req.headers["authorization"];
    if( typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerHeader
        next()
    }
    else{
        res.sendStatus(403)
    }
}

module.exports = verifyToken