const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var CryptoJS = require("crypto-js");
 var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");


// Encrypt
var ciphertext = CryptoJS.AES.encrypt('monSuperMDPTopSecret',key, { iv: iv }).toString();
var ciphertext2 = CryptoJS.AES.encrypt('monSuperMDPTopSecret',key, { iv: iv }).toString();

console.log("cryptage  : ", ciphertext);
console.log("cryptage2 : ", ciphertext);
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });
var bytes2  = CryptoJS.AES.decrypt(ciphertext2, key, { iv: iv });
var originalText = bytes.toString(CryptoJS.enc.Utf8);
var originalText2 = bytes2.toString(CryptoJS.enc.Utf8);
 
console.log("decryptage  : ", originalText);
console.log("decryptage2 : ", originalText2);


const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.USER_SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};