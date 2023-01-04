import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { formatQuestion } from '../utils/helpers'

class QuestionPreview extends Component {
  render() {
    return (
      <div className='question-prev'>
        <div className='top-bar'>
          <h3>{this.props.question.name} Asks</h3>
        </div>
        <div className='question-container'>
          <div className='avatar'>
            <img src={this.props.question.avatar} alt='avatar' />
          </div>
          <div className='options'>
            <h4>Would you rather:</h4>
            <p>{`${this.props.question.textOne.slice(0, 30)}...`}</p>
            <Link to={`/questions/${this.props.question.id}`}>
              <button className='view-poll'>View Poll</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id]
  const author = users[question.author]

  return {
    authedUser,
    question: question ? formatQuestion(question, author, authedUser) : null,
  }
}

export default connect(mapStateToProps)(QuestionPreview)
