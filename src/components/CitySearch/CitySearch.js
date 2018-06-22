import React, { Component } from 'react';
import './CitySearch.css';

export default class CitySearch extends Component {

  state = {
    currentValue: this.props.cityName
  };

  /**
   * Event handler for input changes
   * @param e
   */
  onChangeInput = e => {
    this.setState({
      currentValue: e.target.value
    });
  };

  /**
   * Event handler for when the user presses the search button
   */
  handleSearchRequest = () => {
    this.props.onSearchCity(this.state.currentValue);
  };

  render() {
    return (
      <div className="row city-search-row">
        <div className="col d-flex justify-content-center my-3">
          <h2 className="mx-3">Exploring</h2>
          <input onChange={this.onChangeInput} className="px-3" type="text" id="city-input" defaultValue={this.props.cityName} />
          <button onClick={this.handleSearchRequest}>Search!</button>
        </div>
      </div>
    );
  }

};

