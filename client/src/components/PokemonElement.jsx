import React from 'react';
import axios from 'axios';

class PokemonElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      currentName: this.props.pokemon.name,
      currentId: this.props.pokemon._id,
      nameInput: ''
    }

    this.clickToStartUpdate = this.clickToStartUpdate.bind(this);
    this.inputNewName = this.inputNewName.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.clickToDelete = this.clickToDelete.bind(this);
  }

  clickToStartUpdate() {
    this.setState({updating: true});
  }

  inputNewName(e) {
    this.setState({nameInput: e.target.value});
  }

  onUpdate(e) {
    e.preventDefault();

    axios.put(`/api/pokemon/${this.state.currentId}`, {name: this.state.nameInput})
      .then(() => {
        this.setState({currentName: this.state.nameInput, nameInput: '', updating: false})
      })
      .catch((err) => {
        console.error(err);
      })
  }

  clickToDelete() {
    axios.delete(`/api/pokemon/${this.state.currentName}`)
      .then(() => {

      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <div>
        {this.state.updating ?
        <form>
          <input onChange={this.inputNewName}></input>
          <button onClick={this.onUpdate}>Update!</button>
        </form> :
        <div>
          <h3 onClick={this.clickToStartUpdate}>{this.state.currentName}</h3><button onClick={this.clickToDelete}>Delete</button>
        </div>}
        <img src={this.props.pokemon.img} />
      </div>
    )
  }
}

export default PokemonElement;