function auth(req, res, next){
    if (!req?.session?.user) {
        return res.redirect('/')
    }else{
        res.locals.rol = req?.session?.user?.id_rol;
    };
    next();
}

module.exports = auth;
