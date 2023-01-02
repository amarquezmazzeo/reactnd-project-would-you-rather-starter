import React, { Component } from "react"
import { connect } from "react-redux"
import { setAuthedUser } from "../actions/authedUser"

class Login extends Component {
    state = {
        authedUser: '',
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({authedUser : e.target.value})
       
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const userToAuth = this.state.authedUser
        this.setState({authedUser: ''})
        this.props.dispatch(setAuthedUser(userToAuth))
    }
    
    render() {

        const userList = this.props.usernames.map(
            (username) => (
                <option
                    key={username}
                    value={username}>
                        {username}
                </option>
            )
        )

        return (
            <div className="login-component">
                <h2>Welcome to Would You Rather</h2>
                <div className="login-box">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <label>Select user:</label>
                        <select value={this.state.authedUser} id="user-select" onChange={this.handleChange}>
                            <option value=''></option>
                            {userList}
                        </select>
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        usernames: Object.keys(users)
        }
}

export default connect(mapStateToProps)(Login)