const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../database')
const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist' )));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/api/pokemon/:type', (req, res) => {
  db.find({type: req.params.type})
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})
app.get('/api/pokemon', (req, res) => {
  db.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.post('/api/pokemon', (req, res) => {
  db.create(req.body)
    .then(() => {
      res.status(200).json('POSTED')
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.put('/api/pokemon/:id', (req, res) => {
  db.updateOne({id: req.params._id}, req.body)
    .then(() => {
      res.status(200).json('UPDATED');
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.delete('/api/pokemon/:name', (req, res) => {
  db.findOneAndDelete({name: req.params.name})
    .then(() => {
      res.status(200).json('DELETED');
    })
    .catch((err) => {
      console.error(err);
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})