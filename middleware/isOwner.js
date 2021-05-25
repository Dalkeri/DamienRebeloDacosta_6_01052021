const jwt = require('jsonwebtoken');
const Sauce = require('../models/sauce');

module.exports = (req, res, next) => {
    // console.log(req.body.userIdFromToken);
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            if( sauce.userId === req.body.userIdFromToken){
                next();
            }
            else{
                res.status(403).json({
                      message: "Non autorisé"
                    });
            }
        }
    )
};