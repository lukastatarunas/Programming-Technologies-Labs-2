import React, { Component } from 'react'
import './App.css'
import Authentication from './components/Authentication'
import Home from './components/Home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      userId: ``
    }
  }

  checkAuthentification = (authenticated, userIdCallBack) => {
    this.setState({ isAuthenticated: authenticated, userId: userIdCallBack })
  }

  render() {
    return (
      <div className="App">
        {this.state.isAuthenticated === false ? <Authentication checkForAuthentification={this.checkAuthentification}/> 
        : <Home userId={this.state.userId} />}
      </div>
    )
  }
}

export default App