const express = require('express');
const router = express.Router();
const Rank = require('../models/rank');

router.post('/add', async (req, res) => {

    const newRank = new Rank({
        movieTitle: req.body.movieTitle,
        movieId: req.body.movieId,
        movieImg: req.body.movieImg,
        count: req.body.count
    });

    try{
        const savedRank = await newRank.save();
        res.status(201).json(savedRank);

    }catch(err){
        console.log(err);}
     });

   
router.put('/count/:movieId', async (req, res) => {

     const movieId = req.params.movieId;
     const update = req.body;

     try{

       const updated = await Rank.findOneAndUpdate(
        movieId,
        update,
        {
            new: true
        }
        );

        if(!updated){
            return res.status(404).json({ message: 'count not found' });
        }

        res.status(200).json(updated);
 
     }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }


}
);   


router.get('/find/:movieTitle', async (req, res) => {
     
    const movieTitle = req.params.movieTitle;
    try{

          const movie = await Rank.findOne({ movieTitle: movieTitle });

          if(!movie){
            return res.status(404).json({ message: 'Movie not found' });
          }

          res.status(200).json(movie); 

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }

});
 

module.exports = router;    