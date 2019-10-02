import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="nav">
        <p onClick={ () => onRouteChange('logOut') } className='nav-button f3 link dim black underline pa3 pointer'>Logout</p>
      </nav>
    )
  } else {
    return (
      <nav className="nav">
        <p onClick={ () => onRouteChange('logIn') } className='nav-button'>Login</p>
        <p onClick={ () => onRouteChange('register') } className='nav-button'>Register</p>
      </nav>
    )
  }
}

export default Navigation