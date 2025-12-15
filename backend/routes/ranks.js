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
     const { count } = req.body;

     console.log('Update request - movieId:', movieId, 'new count:', count);

     try{

       const updated = await Rank.findOneAndUpdate(
        { movieId: movieId },
        { $set: { count: count } },
        {
            new: true
        }
        );

        console.log('Update result:', updated);

        if(!updated){
            console.log('Movie not found in database');
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(updated);
 
     }catch(err){
        console.error('Update error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
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


router.get('/top', async (req, res) => {
    try{
        const topRanks = await Rank.find().sort({ count: -1 }).limit(4);

        if(!topRanks){
            return res.status(404).json({ message: 'No ranks found' });
        }

        res.status(200).json(topRanks);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
 

module.exports = router;    