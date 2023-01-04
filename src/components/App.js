import React, { Component } from 'react'
import '../App.css'
import Login from './Login'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Nav'

export default class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Nav />
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/questions/:id' element={<Question />} />
            <Route path='/add' element={<NewQuestion />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
