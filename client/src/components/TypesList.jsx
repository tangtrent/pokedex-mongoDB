import React from 'react';

class TypesList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <select id="type" onChange={this.props.typeFilter}>
        {this.props.pokemonList.map(pokemon => {
          return (
            <option>{pokemon.type}</option>
          )
        })}
      </select>
    )
  }
}

export default TypesList;