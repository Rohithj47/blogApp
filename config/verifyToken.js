function verifyToken(req, res, next){
    console.log("In VerifyToken")
    var bearerHeader = req.headers["authorization"];
    console.log(bearerHeader)
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