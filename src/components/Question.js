import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router'
import { handleSubmitVote } from '../actions/questions'
import { Navigate } from 'react-router-dom'
import NotFound from './NotFound'

import { formatQuestion } from '../utils/helpers'

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    />
  )
}
class Question extends Component {
  state = {
    option: '',
  }

  handleChange = (e) => {
    const option = e.target.name

    this.setState(() => ({
      option,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { option } = this.state
    const { dispatch, question, authedUser } = this.props

    dispatch(
      handleSubmitVote({
        id: question.id,
        vote: option,
        authedUser,
      })
    )

    this.setState(() => ({
      toHome: true,
    }))
  }

  render() {
    if (!this.props.authedUser) {
      return (
        <Navigate to='/login' state={{ data: this.props.location.pathname }} />
      )
    }
    if (!this.props.question) {
      return <NotFound />
    }

    const { name, textOne, textTwo, votesOne, votesTwo, avatar, vote } =
      this.props.question
    const totalVotes = votesOne + votesTwo
    // if (this.state.toHome === true) {
    //     return <Navigate to='/question/xj352vofupe1dqz9emx13r'/>
    // }

    return (
      <div className='question'>
        <div className='top-bar'>
          <h3>{name} Asks</h3>
        </div>
        <div className='question-container'>
          <div className='avatar'>
            <img src={avatar} alt='avatar' />
          </div>
          {!vote ? (
            <div className='options'>
              <h4>Would you rather:</h4>

              <div className='buttons'>
                <button
                  key='optionOne'
                  name='optionOne'
                  className={
                    this.state.option === 'optionOne'
                      ? 'question-option question-option-active'
                      : 'question-option'
                  }
                  onClick={this.handleChange}
                >
                  {textOne}
                </button>
                <button
                  key='optionTwo'
                  name='optionTwo'
                  className={
                    this.state.option === 'optionTwo'
                      ? 'question-option question-option-active'
                      : 'question-option'
                  }
                  onClick={this.handleChange}
                >
                  {textTwo}
                </button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <button className='submit-poll'>Vote</button>
              </form>
            </div>
          ) : (
            <div className='results'>
              <h4>Would you rather:</h4>
              <div className='vote'>
                <div
                  className={`option
                  ${vote === 'one' ? 'active-vote' : null}
                  ${votesOne > votesTwo ? 'winner' : null}`}
                >
                  <div className='details'>
                    <p>{textOne}</p>
                  </div>
                  <div className='bar'>
                    {((votesOne / totalVotes) * 100).toFixed(2)}%
                  </div>
                  <p>
                    {votesOne} of {totalVotes} votes
                  </p>
                </div>
                <div
                  className={`option
                  ${vote === 'two' ? 'active-vote' : null} 
                  ${votesTwo > votesOne ? 'winner' : null}`}
                >
                  <div className='details'>
                    <p>{textTwo}</p>
                  </div>
                  <div className='bar'>
                    {((votesTwo / totalVotes) * 100).toFixed(2)}%
                  </div>
                  <p>
                    {votesTwo} of {totalVotes} votes
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.params
  const question = questions[id] ? questions[id] : null
  const author = question ? users[question.author] : null

  return {
    authedUser,
    question: question ? formatQuestion(question, author, authedUser) : null,
    location: props.location,
  }
}

export default withRouter(connect(mapStateToProps)(Question))
