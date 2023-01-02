import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import Login from './Login'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/question/:id'
              element={!this.props.loading ? <Question /> : null}
            />
            <Route path='/new' element={<NewQuestion />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)
