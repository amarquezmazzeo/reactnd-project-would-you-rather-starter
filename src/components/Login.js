import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Navigate } from 'react-router-dom'
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

class Login extends Component {
  state = {
    authedUser: '',
    authed: false,
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ authedUser: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userToAuth = this.state.authedUser
    this.setState({
      authedUser: '',
      authed: true,
    })
    this.props.dispatch(setAuthedUser(userToAuth))
  }

  render() {
    const userList = this.props.usernames.map((username) => (
      <option key={username} value={username}>
        {username}
      </option>
    ))
    if (this.state.authed === true) {
      return this.props.location ? (
        <Navigate to={this.props.location} />
      ) : (
        <Navigate to='/' />
      )
    }
    return (
      <div className='login-component'>
        <h2>Welcome to Would You Rather</h2>
        <div className='login-box'>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <label>Select user:</label>
            <select
              value={this.state.authedUser}
              id='user-select'
              onChange={this.handleChange}
            >
              <option value=''></option>
              {userList}
            </select>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }, props) {
  return {
    usernames: Object.keys(users),
    location: props.location.state ? props.location.state.data : null,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
// export default connect(mapStateToProps)(Login)
