import React, { Component } from 'react'
import axios from 'axios'
import { InputGroup, Input, Button } from 'reactstrap'

class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: `login`,
            username: ``,
            password: ``,
            userType: `Individual`,
            authenticated: null,
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUserType = e => {
        this.setState({
            userType: e.target.value
        })
    }

    checkIfUserExists = () => {
        axios.get(`http://localhost:5000/users?username=${this.state.user}&password=${this.state.userType}/big`)
            .then(res => {
                if (res.data.length === 0) {
                    this.setState({
                        authenticated: false
                    })
                } else {
                    this.setState({
                        authenticated: true
                    })
                }
            })
    }

    switchToRegistration = () => {
        this.setState({
            step: `registration`
        })
    }

    registerUser = () => {
        if (this.state.authenticated) return
        axios.post(`http://localhost:5000/users/`, {
            "username": this.state.username,
            "password": this.state.password,
            "userType": this.state.userType,
            "projects": [],
        })
        .then(() => {
            this.setState({step: `login`})
        })
    }

    loginUser = () => {
        axios.get(`http://localhost:5000/users?username=${this.state.username}&password=${this.state.password}`)
            .then(res => {
                if (res.data.length === 0) {
                    this.setState({
                        authenticated: false,
                        username: '',
                        password: ''
                    })
                } else {
                    this.props.checkForAuthentification(true, res.data[0].id)
                    this.setState({
                        authenticated: true,
                        username: '',
                        password: ''
                    })
                }
            })
    }

    render() {
        return (
            <div>
                {this.state.step === `login` ? (
                    <div>
                        <div className="d-inline-flex p-2 d-flex flex-column">
                            <h1>LOGIN</h1>
                            <InputGroup className="">
                                <Input onChange={this.handleInput} name="username" placeholder="Enter Username" />
                            </InputGroup>
                            <InputGroup>
                                <Input onChange={this.handleInput} name="password" placeholder="Enter Password" />
                            </InputGroup>
                        </div>
                        <div className="login-btn">
                            <Button onClick={this.loginUser} color="primary" size="large">Login</Button>
                            <Button onClick={this.switchToRegistration} color="secondary" size="large">Register</Button>
                        </div>
                    </div>)
                    : (<div>
                        <div>
                            <div className="d-inline-flex p-2 d-flex flex-column" style={{ width: '300px' }}>
                                <h1>REGISTER</h1>
                                <InputGroup className="d-flex ">
                                    <Input onChange={this.handleInput} name="username" placeholder="Enter Username" />
                                </InputGroup>
                                <InputGroup>
                                    <Input onChange={this.handleInput} name="password" placeholder="Enter Password" />
                                </InputGroup>
                                <div className="input-group mb-3">
                                    <select onChange={this.handleUserType} className="custom-select" id="inputGroupSelect02">
                                        <option value>Choose User Type</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Company">Company</option>
                                    </select>
                                </div>
                            </div>
                            <div className="login-btn">
                                <Button onClick={this.registerUser} color="secondary" size="large">Register</Button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}

export default Authentication