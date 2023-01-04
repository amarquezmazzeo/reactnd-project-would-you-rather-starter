import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class NotFound extends Component {
  render() {
    if (!this.props.authedUser) {
      return (
        <Navigate to='/login' state={{ data: this.props.location.pathname }} />
      )
    }
    return <h1>Error 404: Page not found</h1>
  }
}

function mapStateToProps({ authedUser }, props) {
  return {
    authedUser,
    location: props.location,
  }
}

export default withRouter(connect(mapStateToProps)(NotFound))
