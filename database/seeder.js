const seedData = require('../pokemon.json');
const db = require('./');

var seederFunction = () => {
  seedData.forEach(pokemon => {
    db.create(pokemon);
  })
}

seederFunction();