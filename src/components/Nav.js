import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export default class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/new'>New Question</Link>
          <Link to='/login'>Login</Link>
        </div>
      </nav>
    )
  }
}
