const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost/pokemans", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to mongoose!')
  })
  .catch((err) => {
    console.error(err);
  })

const pokemonSchema = new Schema({
  name: String,
  type: String,
  img: String
})

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;