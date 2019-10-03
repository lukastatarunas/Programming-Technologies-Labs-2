import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ``,
            password: ``
        }
    }

    handleLoginInputEmail = e => {
      this.setState({
          email: e.target.value
      })
    }

    handleLoginInputPassword = e => {
      this.setState({
          password: e.target.value
      })
    }

    handleLogin = () => {
      axios.get(`http://localhost:5000/users`)
        .then(res => {
          res.data.map(item => {
            if (item.email === this.state.email && item.password === this.state.password) {
              this.props.onRouteChange('home')
            }
          })
      })
    }

    render() {
        return (
            <div className="App">
              <Form className="loginForm">
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input onChange={this.handleLoginInputEmail} type="email" name="email" id="exampleEmail" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input onChange={this.handleLoginInputPassword} type="password" name="password" id="examplePassword" placeholder="Enter Password" />
                </FormGroup>
                <Button onClick={this.handleLogin}>Login</Button>
              </Form>
            </div>
        )
    }
}

export default Login