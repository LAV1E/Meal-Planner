// const mongoose = require('mongoose');


// const recipeSchema = new mongoose.Schema({
//     name: { type: String, required: true ,unique: true  },
//     image: { type: String, required: true },
//     description: { type: String, required: true },
//     youtubeLink: { type: String, required: true }
// });


// module.exports = mongoose.model('Recipe', recipeSchema);

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);