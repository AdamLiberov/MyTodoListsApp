module.exports = {
    asyncErrorHandler: fn => (req, res, next) => {
         Promise.resolve(fn(req, res, next)).catch(err => next(err));
    },
    isLoggedIn: (req, res, next) => {
        console.log('middleware1');
        if(req.isAuthenticated()){
            console.log('authenticated');
            return next();
        } 
          res.redirect('/register');
    },
   verifyToken: (req, res, next) => {

   } 
}