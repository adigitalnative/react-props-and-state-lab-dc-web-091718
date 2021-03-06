import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (filterValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: filterValue
      }
    })
  }

  onFindPetsClick = () => {
    fetch(this.fetchUrl())
      .then(response => response.json())
      .then(petsJson => {
        this.setState({
          pets: petsJson
        })
      })
  }

  fetchUrl = () => {
    const BASE_STR = "/api/pets"
    const type = this.state.filters.type

    if (type === "all") {
      return BASE_STR
    } else {
      return (BASE_STR + "?type=" + type)
    }

  }

  onAdoptPet = (petId) => {
    const updatedPets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true } : pet
    })
    this.setState({ pets: updatedPets })
  }

  render() {
    let{pets} = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
