const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllStuff = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.like = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
<<<<<<< HEAD
      console.log(req.body);
      let operations = {};
      if(sauce.usersLiked.includes(req.body.userIdFromToken)){
        if(!req.body.like){ 
          operations["$pull"] = { usersLiked: req.body.userIdFromToken }
          operations["$inc"] = { likes: -1 }
        } else if (req.body.like == -1){
          operations["$pull"] = { usersLiked: req.body.userIdFromToken }
          operations["$push"] = { usersDisliked: req.body.userIdFromToken }
          operations["$inc"] = { likes: -1, dislikes: 1 }
          
        }
      } else if (sauce.usersDisliked.includes(req.body.userIdFromToken)) {
        if(!req.body.like){
          operations["$pull"] = { usersDisliked: req.body.userIdFromToken }
          operations["$inc"] = { dislikes: -1 }
        } else if (req.body.like) {
          operations["$pull"] = { usersDisliked: req.body.userIdFromToken }
          operations["$push"] = { usersLiked: req.body.userIdFromToken }
          operations["$inc"] = { dislikes: -1, likes: 1 }
        }
      } else {
        if (req.body.like == -1) {
          console.log("ICI");
          operations["$push"] = { usersDisliked: req.body.userIdFromToken }
          operations["$inc"] = { dislikes: 1}
        } else if(req.body.like){
          console.log("LA");
          operations["$push"] = { usersLiked: req.body.userIdFromToken }
          operations["$inc"] = { likes: 1 }
        }
      }

      console.log(operations);

      Sauce.updateOne(
        { _id: req.params.id },
        operations
     )
     .then(
      () => res.status(200).json({ message: 'like modifié !'})
     )
=======
      console.log(sauce);
      // if(sauce.usersLiked.includes(req.body.userIdFromToken)){
      //   console.log("1");
      //   if(!req.body.like){
      //     console.log("11");
      //     sauce.usersLiked.splice(req.body.userIdFromToken);
      //   } else if (req.body.like == -1){
      //     console.log("12");
      //     sauce.usersLiked.splice(req.body.userIdFromToken);
      //     sauce.usersDisliked.push(req.body.userIdFromToken);
      //   }
      // } else if(sauce.usersDisliked.includes(req.body.userIdFromToken)){
      //   console.log("2");
      //   if(!req.body.like){
      //     console.log("21");
      //     sauce.usersDisliked.splice(req.body.userIdFromToken);
      //   } else if (req.body.like){
      //     console.log("22");
      //     sauce.usersDisliked.splice(req.body.userIdFromToken);
      //     sauce.usersLiked.push(req.body.userIdFromToken);
      //   }
      // } else {
        // console.log("3", req.body);
        // if(req.body.like){
        //   console.log("31");
        //   sauce.usersLiked.push(req.body.userIdFromToken);
        // } else if(req.body.like == -1){
        //   console.log("32");
        //   sauce.usersDisliked.push(req.body.userIdFromToken);
        // }
      // }
      console.log(req.body);
      console.log(sauce);
      Sauce.updateOne(
        { _id: req.params.id },
        { 
          $push: { usersLiked: req.body.userIdFromToken },
          $inc:  { likes: 1} 
        }
     )
     .then(
      () => res.status(200).json({ message: 'like modifié !'})
     )

      // console.log("ici", sauce);
      // Sauce.updateOne({ _id: req.params.id }, { ...sauce })
      // .then(
      //   () => res.status(200).json({ message: 'like modifié !'})
      //  )
      // res.status(200).json({ message: 'like modifié !'})
>>>>>>> 22c9da74ac3744d0aaf145263acff430e30ffe26
    }
  )
};
