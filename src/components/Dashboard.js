import React, { Component } from 'react'
import QuestionPreview from './QuestionPreview'
import { connect } from 'react-redux'
import '../App.css'
import { Navigate } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    showAnswered: false,
  }

  handleChange = (e) => {
    const showAnswered = e.target.name === 'Answered' ? true : false
    this.setState(() => ({
      showAnswered,
    }))
  }

  render() {
    if (!this.props.authedUser) {
      return <Navigate to='/login' />
    }

    const questionIDs = Object.keys(this.props.questionVotes).filter(
      (key) => this.props.questionVotes[key] === this.state.showAnswered
    )
    return (
      <div className='dashboard'>
        <div className='buttons'>
          <button
            key='unanswered'
            name='Unanswered'
            onClick={this.handleChange}
            className={
              this.state.showAnswered ? 'custom-button' : 'custom-button active'
            }
          >
            Unanswered
          </button>
          <button
            key='answered'
            name='Answered'
            onClick={this.handleChange}
            className={
              this.state.showAnswered ? 'custom-button active' : 'custom-button'
            }
          >
            Answered
          </button>
        </div>
        <ul className='question-list'>
          {questionIDs.map((id) => (
            <li className='q-li' key={id}>
              <QuestionPreview id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function questionPlusIDs(ids, questions, user) {
  let result = {}
  ids.forEach((i) => {
    // result[i] = questions[i].optionOne.votes.length + questions[i].optionTwo.votes.length > 0
    result[i] =
      questions[i].optionOne.votes.includes(user) ||
      questions[i].optionTwo.votes.includes(user)
  })
  return result
}

function mapStateToProps({ questions, authedUser }) {
  const questionIDs = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )

  return {
    questionVotes: questionPlusIDs(questionIDs, questions, authedUser),
    questions: {},
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)
