import React from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'

const initialState = {
  route: 'logIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: ''
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  onRouteChange = route => {
    if (route === 'logOut') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, route} = this.state
    return (
      <div className="App">
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
        { route === 'home'
          ? <div>
              CRUD
            </div>
          : (
             route === 'logIn'
             ? <Login onRouteChange={ this.onRouteChange } />
             : <Register onRouteChange={ this.onRouteChange } />
            )
        }
      </div>
    )
  }
}

export default App