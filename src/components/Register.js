import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ``,
            email: ``,
            password: ``
        }
    }

    handleRegisterInputName = e => {
        this.setState({
            name: e.target.value
        })
    }

    handleRegisterInputEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    handleRegisterInputPassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleRegister = () => {
        axios.post(`http://localhost:5000/users`, {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password
        })
        .then(res => {
            this.props.onRouteChange('home')
        })
    }

    render() {
        return (
            <div className="App">
              <Form className="registerForm">
                <FormGroup>
                  <Label for="exampleName">Name</Label>
                  <Input onChange={this.handleRegisterInputName} type="text" name="name" id="exampleName" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input onChange={this.handleRegisterInputEmail} type="email" name="email" id="exampleEmail" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input onChange={this.handleRegisterInputPassword} type="password" name="password" id="examplePassword" placeholder="Enter Password" />
                </FormGroup>
                <Button onClick={this.handleRegister}>Register</Button>
              </Form>
            </div>
        )
    }
}

export default Register