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

     
 

