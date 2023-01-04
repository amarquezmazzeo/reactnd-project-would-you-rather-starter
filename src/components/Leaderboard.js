import React, { Component } from 'react'
import UserPreview from './UserPreview'
import { connect } from 'react-redux'
import '../App.css'
import { Navigate } from 'react-router-dom'

class Leaderboard extends Component {
  render() {
    if (!this.props.authedUser) {
      return <Navigate to='/login' />
    }

    return (
      <div className='leaderboard'>
        <h1>Leaderboard</h1>
        <ul className='user-list'>
          {this.props.userIDs.map((id, num) => (
            <li className='u-li' key={id}>
              <UserPreview id={id} num={num + 1} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const userIDs = Object.keys(users).sort(
    (a, b) =>
      users[b].questions.length +
      Object.keys(users[b].answers).length -
      users[a].questions.length -
      Object.keys(users[a].answers).length
  )

  return {
    userIDs,
    authedUser,
  }
}

export default connect(mapStateToProps)(Leaderboard)
