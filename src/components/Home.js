import React from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            projectInputData: {
                projectTitle: ``,
                startDate: ``,
                endDate: ``
            },
            fecthedProjects: []
        }
    }

    componentDidMount = () => {
        this.readProjects()
    }

    componentDidUpdate = () => {
        this.readProjects()
    }

    readProjects = () => {
        axios.get(`http://localhost:5000/projects`)
            .then(res => {
                this.setState({fecthedProjects: res.data})
            })
    }

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
    }

    handleProjectInputData = e => {
        this.setState({
            projectInputData: {
                ...this.state.projectInputData,
                [e.target.name]: e.target.value
            }
        })
    }

    createProject = () => {
        axios.post(`http://localhost:5000/projects`, this.state.projectInputData)
            .then(res => {

            })
        this.setState(prevState => ({
                modal: !prevState.modal
        }))
    }

    componentWillUnmount = () => {

    }

    render() {
        return (
            <div className="App">
                <Button color="primary" onClick={this.toggle}>Create Project</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Project</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label >Project Title</Label>
                                <Input type="text" name="projectTitle" onChange={this.handleProjectInputData} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Start Date</Label>
                                <Input type="text" name="startDate" onChange={this.handleProjectInputData} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Finnish Date</Label>
                                <Input type="text" name="endDate" onChange={this.handleProjectInputData} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createProject}>Create Project</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Title</th>
                        <th>Project Start Date</th>
                        <th>Project End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.fecthedProjects.map((project, i) => {
                        return (
                            <tr key={i + 1}>
                                <th scope="row">{i + 1}</th>
                                <td>{project.projectTitle}</td>
                                <td>{project.startDate}</td>
                                <td>{project.endDate}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Home