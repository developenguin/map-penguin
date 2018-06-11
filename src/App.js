import React, { Component } from 'react';
import Header from './components/Header/Header';
import MapContainer from './components/MapContainer/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <Sidebar/>
        <MapContainer/>
      </div>
    );
  }

}

export default App;
