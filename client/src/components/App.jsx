import React from 'react';
import PokemonList from './PokemonList.jsx';
import TypesList from './TypesList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemonList: [],
      chosenType: '',
      nameInput: '',
      typeInput: '',
      imgInput: ''
    }
    this.typeFilter = this.typeFilter.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
    this.onTypeInput = this.onTypeInput.bind(this);
    this.onImageInput = this.onImageInput.bind(this);
    this.onInsert = this.onInsert.bind(this);
  }

  componentDidMount() {
    this.getAllPokemon();
  }

  getAllPokemon() {
    axios.get('/api/pokemon')
    .then((results) => {
      this.setState({pokemonList: results.data})
    })
    .catch((err) => {
      console.error(err);
    })
  }

  typeFilter(e) {
    if (e.target.value !== 'Sort by Type') {
      axios.get(`/api/pokemon/${e.target.value}`)
        .then((results) => {
          this.setState({pokemonList: results.data});
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  onNameInput(e) {
    this.setState({nameInput: e.target.value})
  }

  onTypeInput(e) {
    this.setState({typeInput: e.target.value})
  }

  onImageInput(e) {
    this.setState({imgInput: e.target.value})
  }

  onInsert() {
    axios.post('/api/pokemon', {name: this.state.nameInput, type: this.state.typeInput, img: this.state.imgInput})
      .then(() => {
        this.getAllPokemon()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Pokemon!</h1>
          <button onClick={this.getAllPokemon}>Show All</button>
          {/* <select id="type" onChange={this.typeFilter}>
            <option>Sort by Type</option> */}
            {/* <option >Grass</option>
            <option>Fire</option>
            <option>Water</option>
            <option>Normal</option>
            <option>Poison</option>
            <option>Electric</option>
            <option>Ground</option>
            <option>Fighting</option>
            <option>Psychic</option>
            <option>Rock</option>
            <option>Ghost</option>
            <option>Dragon</option> */}
            <TypesList pokemonList={this.state.pokemonList} typeFilter={this.typeFilter}/>
          {/* </select><br></br><br></br> */}
          <label>Name:</label>
          <input onChange={this.onNameInput}></input>
          <label>Type:</label>
          <input onChange={this.onTypeInput}></input>
          <label>Image URL:</label>
          <input onChange={this.onImageInput}></input>
          <button onClick={this.onInsert}>INSERT</button>
          <PokemonList pokemonList={this.state.pokemonList} />
        </div>
      </div>
    )
  }
}

export default App;