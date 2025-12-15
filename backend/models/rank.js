const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  movieId: { type: String, required: true, unique: true },
  movieImg: { type: String },
  count: { type: Number, required: true, default: 1 }
  
}, 
{ timestamps: false }
);

const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;