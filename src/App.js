import React from 'react'
import './App.css'
import Navigation from './components/Navigation'
import { Register } from './components/Register'
import { Login } from './components/Login'
import Home from './components/Home'

const initialState = {
  route: `logIn`,
  isSignedIn: false,
  user: {
    id: ``,
    name: ``,
    email: ``,
    password: ``
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = data => {
    this.setState({ user: {
      name: data.name,
      email: data.email,
      password: data.password,
      projects: data.projects,
      id: data.id
    }})
  }

  onRouteChange = route => {
    if (route === `logOut`) {
      this.setState(initialState)
    } else if (route === `home`) {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, route} = this.state
    return (
      <div className="App">
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
        { route === `home`
          ? <Home />
          : (
             route === `logIn`
             ? <Login onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } />
             : <Register onRouteChange={ this.onRouteChange } loadUser={ this.loadUser } />
            )
        }
      </div>
    )
  }
}

export default App