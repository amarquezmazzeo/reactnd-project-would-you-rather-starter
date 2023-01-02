import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

import { formatQuestion } from '../utils/helpers'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    questionSubmitted: false,
  }

  handleChange = (e) => {
    e.preventDefault()
    const { value, name } = e.target
    this.setState(() => ({
      [name]: value,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const question = {
      authedUser: this.props.authedUser.authedUser,
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
    }

    this.props.dispatch(handleAddQuestion(question))

    this.setState({
      optionOne: '',
      optionTwo: '',
      questionSubmitted: true,
    })

    // TODO: Handle errors (ie API failure)
    // TODO: Prevent submit if options are blank
  }

  render() {
    if (this.state.questionSubmitted === true) {
      return <Navigate to='/' />
    }
    return (
      <div className='new-question'>
        <div className='header'>
          <h1>Post a New Question</h1>
        </div>
        <div className='form-container'>
          <form className='new-question-form' onSubmit={this.handleSubmit}>
            <h2>Submit available options</h2>
            <p className='option-para'>
              <input
                type='text'
                value={this.state.optionOne}
                name='optionOne'
                onChange={this.handleChange}
              />
            </p>
            <p className='option-para'>
              <input
                type='text'
                value={this.state.optionTwo}
                name='optionTwo'
                onChange={this.handleChange}
              />
            </p>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(authedUser) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
