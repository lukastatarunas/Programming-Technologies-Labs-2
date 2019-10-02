import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ``,
            password: ``
        }
    }

    handleLoginInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="App">
              <Form className="loginForm">
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" />
                </FormGroup>
                <Button>Login</Button>
              </Form>
            </div>
        )
    }
}

export default Login