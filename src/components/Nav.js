import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  handleClick = (e) => {
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    return (
      <nav className='nav'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/add'>New Question</Link>
          <Link to='/leaderboard'>Leaderboard</Link>
        </div>
        {this.props.authedUser ? (
          <div className='login-info'>
            <p>Welcome, {this.props.authedUser}</p>
            <button onClick={this.handleClick}>Log out</button>
          </div>
        ) : (
          <div className='login-info'>
            <Link to='/login'>Login</Link>
          </div>
        )}
      </nav>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(Nav)
