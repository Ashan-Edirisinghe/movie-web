const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  movieId: { type: String, required: true, unique: true },
  movieImg: { type: URL },
  count: { type: Number, required: true }
  
}, 
{ timestamps: false }
);

const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;