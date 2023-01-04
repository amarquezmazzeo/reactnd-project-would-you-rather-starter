import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import { useLocation, useParams, useNavigate } from 'react-router'

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
      authedUser: this.props.authedUser,
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
    }

    if (question.optionOneText !== '' && question.optionTwoText !== '') {
      this.props.dispatch(handleAddQuestion(question))

      this.setState({
        optionOne: '',
        optionTwo: '',
        questionSubmitted: true,
      })
    } else {
      alert('You must input both options!')
    }
  }

  render() {
    if (!this.props.authedUser) {
      return (
        <Navigate to='/login' state={{ data: this.props.location.pathname }} />
      )
    }
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
                placeholder='Option # 1'
                onChange={this.handleChange}
              />
            </p>
            <p className='option-para'>
              <input
                type='text'
                value={this.state.optionTwo}
                name='optionTwo'
                placeholder='Option # 2'
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

function mapStateToProps({ authedUser }, props) {
  return {
    authedUser,
    location: props.location,
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
