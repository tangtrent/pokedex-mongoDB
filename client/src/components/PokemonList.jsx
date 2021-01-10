import React from 'react';
import PokemonElement from './PokemonElement.jsx';

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.pokemonList.map(pokemon => {
          return (
            <PokemonElement pokemon={pokemon} key={pokemon._id}/>
          )
        })}
      </div>
    )
  }
}

export default PokemonList;