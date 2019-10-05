import React from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap'
import { userId } from './Register'

let projectsForUser = []

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalProject: false,
            projectInputData: {
                projectTitle: ``,
                startDate: ``,
                endDate: ``,
            },
            fecthedProjects: [],
            modalTask: false,
            taskInputData: {
                taskTitle: ``,
                startDate: ``,
                endDate: ``,
                users: []
            },
            fecthedTasks: []
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

    toggleProject = () => {
        this.setState(prevState => ({
            modalProject: !prevState.modalProject
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
                projectsForUser.push(res.data.id)
                axios.patch(`http://localhost:5000/users/${userId}`, {
                    projects: projectsForUser
                })
                .then(() => {

                })
            })
        this.setState(prevState => ({
            modalProject: !prevState.modalProject
        }))
    }

    deleteProject = e => {
        axios.delete(`http://localhost:5000/projects/${e.target.name}`)
            .then(res => {
                console.log(res.data)
                projectsForUser.pop()
                axios.patch(`http://localhost:5000/users/${userId}`, {
                    projects: projectsForUser
                })
                .then(() => {

                })
            })
    }

    toggleTask = () => {
        this.setState(prevState => ({
            modalTask: !prevState.modalTask
        }))
    }

    handleTaskInputData = e => {
        this.setState({
            taskInputData: {
                ...this.state.taskInputData,
                [e.target.name]: e.target.value
            }
        })
    }

    createTask = () => {
        axios.post(`http://localhost:5000/projects`, this.state.taskInputData)
            .then(res => {

            })
        this.setState(prevState => ({
            modalTask: !prevState.modalTask
        }))
    }

    componentWillUnmount = () => {

    }

    render() {
        return (
            <div className="App">
                <Button color="primary" onClick={this.toggleProject}>Create Project</Button>
                <br></br>
                <br></br>
                <Modal isOpen={this.state.modalProject} toggle={this.toggleProject} className={this.props.className}>
                    <ModalHeader toggle={this.toggleProject}>Create Project</ModalHeader>
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
                        <Button color="secondary" onClick={this.toggleProject}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Create Task or Delete Project</th>
                            <th>Project Title</th>
                            <th>Project Start Date</th>
                            <th>Project End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.fecthedProjects.map((project, i) => {
                        return (
                            <tr key={i + 1}>
                                <td>
                                    <Button color="success" onClick={this.toggleTask}>Create Task</Button>
                                    <Button color="danger" onClick={this.deleteProject} name={project.id}>Delete Project</Button>
                                    <Modal isOpen={this.state.modalTask} toggle={this.toggleTask} className={this.props.className}>
                                        <ModalHeader toggle={this.toggleTask}>Create Task</ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label >Task Title</Label>
                                                    <Input type="text" name="projectTitle" onChange={this.handleTaskInputData} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label >Start Date</Label>
                                                    <Input type="text" name="startDate" onChange={this.handleTaskInputData} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label >Finnish Date</Label>
                                                    <Input type="text" name="endDate" onChange={this.handleTaskInputData} />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.createTask}>Create Task</Button>{' '}
                                            <Button color="secondary" onClick={this.toggleTask}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </td>
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