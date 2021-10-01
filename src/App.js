import React, { Component } from 'react'; 
import './styles.css';
import Game from './Game'; 

class App extends Component {
  constructor() { 
    super(); 
    this.state = { 

    }
  }
  
  render() { 
  
    return (
      <div>
           <Game /> 
      </div>
    )
  }  
}

export default App;
