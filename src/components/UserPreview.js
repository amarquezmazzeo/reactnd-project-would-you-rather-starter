import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserPreview extends Component {
  render() {
    const asked = this.props.user.questions.length
    const answered = Object.keys(this.props.user.answers).length

    return (
      <div className='user-prev'>
        <h2>{this.props.num}</h2>
        <div className='avatar'>
          <img src={this.props.user.avatarURL} alt='avatar' />
        </div>
        <h3>Name: {this.props.user.name}</h3>
        <div className='stats'>
          <div className='stats-flex'>
            <p>Asked: {asked}</p>
            <p>Answered: {answered}</p>
          </div>
          <p>
            <b>Total points: {answered + asked}</b>
          </p>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }, { id, num }) {
  const user = users[id]
  return {
    user,
    num,
  }
}

export default connect(mapStateToProps)(UserPreview)
