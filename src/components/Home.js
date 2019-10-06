import React, { Component } from 'react'
import axios from 'axios'
import { Form, FormGroup, Modal, ModalHeader, ModalFooter, ModalBody, Input, Button, Label, Table } from 'reactstrap'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authenticatedUser: this.props.userId ,
            authenticatedUserData: null,
            projects: [],
            modalProject: false,
            projectInputData: {
                projectTitle: ``,
                projectStartDate: ``,
                projectEndDate: ``
            },
            currentProject: ``,
            tasks: [],
            modalTask: false,
            taskInputData: {
                taskTitle: ``,
                taskStartDate: ``,
                taskEndDate: ``,
            }
        }
    }

    componentDidMount = () => {
        this.readData()
    }

    readData = () => {
        axios.get(`http://localhost:5000/users/${this.state.authenticatedUser}`)
            .then(res => {
                this.setState({
                    authenticatedUserData: res.data.projects
                })
                return (res.data.projects)
            })
            .then(projects => {
                if(projects !== undefined) {
                const projectsAll = []
                const projectRequests = projects.map(project => {
                    return axios.get(`http://localhost:5000/projects/${project}`).then(res => {
                        projectsAll.push(res.data)
                    })
                })
                    Promise.all(projectRequests).then(() => {
                        this.setState({
                            projects: projectsAll
                        })
                    })
                }
            })
    }

    createProject = () => {
        axios.post(`http://localhost:5000/projects/`, {
            projectTitle: this.state.projectInputData.projectTitle,
            projectStartDate: this.state.projectInputData.projectStartDate,
            projectEndDate: this.state.projectInputData.projectEndDate,
            tasks: []
        })
            .then(() => {
                axios.get(`http://localhost:5000/projects?projectTitle=${this.state.projectInputData.projectTitle}`)
                    .then(res => {
                        let projectIdArray = [...this.state.authenticatedUserData, res.data[0].id]
                        axios.patch(`http://localhost:5000/users/${this.state.authenticatedUser}`, {
                            projects: projectIdArray
                        })
                            .then(() => {
                                this.readData()
                            })
                    })
            })
        this.setState({modalProject: !this.state.modalProject})
    }

    createTask = () => {
        let taskArray = [
            {
                taskTitle: this.state.taskInputData.taskTitle,
                taskStartDate: this.state.taskInputData.taskStartDate,
                taskEndDate: this.state.taskInputData.taskEndDate,
                users: [`${this.state.authenticatedUser}`]
            }
        ]
        axios.get(`http://localhost:5000/projects/${this.state.currentProject}`)
        .then(res => {
            const promise = res.data.tasks.map(task => {
                return taskArray.push(task)
            })
            Promise.all(promise).then(() => {
                axios.patch(`http://localhost:5000/projects/${this.state.currentProject}`, {
                    tasks: taskArray
                })
                .then(() => {
                    this.readData()
                })
            })
        })
        this.setState({modalTask: !this.state.modalTask})
    }

    toggle = e => {
        this.setState({
            currentProject: e.target.id,
            [e.target.name]: !this.state[e.target.name]
        })
    }

    handleProjectData = e => {
        this.setState({
            projectInputData: {
                ...this.state.projectInputData,
                [e.target.name]: e.target.value
            }
        })
    }

    handleTaskData = e => {
        this.setState({
            taskInputData: {
                ...this.state.taskInputData,
                [e.target.name]: e.target.value
            }
        })
    }

    deleteProject = e => {
        let newProjectIdArray = this.state.authenticatedUserData.filter(item => item !== e.target.name)
        axios.delete(`http://localhost:5000/projects/${e.target.name}`)
            .then(() => {
                axios.patch(`http://localhost:5000/users/${this.state.authenticatedUser}`, {
                    projects: newProjectIdArray
                })
                    .then(() => {
                        this.readData()
                    })
            })
    }

    deleteTask = e => {
        let taskArray = []
        const projectId = e.target.name
        let taskTitle = e.target.id
        axios.get(`http://localhost:5000/projects/${e.target.name}`)
        .then(res => {
            res.data.tasks.forEach((task) => {
                if (task.taskTitle !== taskTitle){
                    return taskArray.push(task)
                }
            })
            return res.data
        })
        .then(data => {
            data.tasks = taskArray
            return data
        })
        .then(data => {
            axios.patch(`http://localhost:5000/projects/${projectId}`, data)
        })
        .then(() => {
            this.readData()
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Button className="createProjectButton" color="primary" name="modalProject" onClick={this.toggle}>Create Project</Button>
                    <Modal isOpen={this.state.modalProject} name="modalProject" toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Create Project</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label >Project Title</Label>
                                    <Input type="text" name="projectTitle" onChange={this.handleProjectData} />
                                </FormGroup>
                                <FormGroup>
                                    <Label >Project Start Date</Label>
                                    <Input type="text" name="projectStartDate" onChange={this.handleProjectData} />
                                </FormGroup>
                                <FormGroup>
                                    <Label >Project End Date</Label>
                                    <Input type="text" name="projectEndDate" onChange={this.handleProjectData} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.createProject}>Create Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Delete Project or Create Task</th>
                            <th>Project Title</th>
                            <th>Project Start Date</th>
                            <th>Project End Date</th>
                            <th>Project Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <Button color="danger" onClick={this.deleteProject} name={project['id']}>Delete Project</Button>
                                            <Button color="primary" name="modalTask" id={project['id']} onClick={this.toggle}>Create Task</Button>
                                            <Modal isOpen={this.state.modalTask} name="modalTask" toggle={this.toggle} className={this.props.className}>
                                                <ModalHeader toggle={this.toggle}>Create Task</ModalHeader>
                                                <ModalBody>
                                                    <Form>
                                                        <FormGroup>
                                                            <Label>Task Title</Label>
                                                            <Input type="text" name="taskTitle" onChange={this.handleTaskData} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label >Task Start Date</Label>
                                                            <Input type="text" name="taskStartDate" onChange={this.handleTaskData} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label >Task End Date</Label>
                                                            <Input type="text" name="taskEndDate" onChange={this.handleTaskData} />
                                                        </FormGroup>
                                                    </Form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onClick={this.createTask} name={project['id']}>Create Task</Button>
                                                    <Button color="secondary" name="modalTask" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </td>
                                        <td>{project['projectTitle']}</td>
                                        <td>{project['projectStartDate']}</td>
                                        <td>{project['projectEndDate']}</td>
                                        <td>
                                            {project.tasks.map((task, i) => {
                                                return <tr key={i}>
                                                    <p>{task.taskTitle}</p>
                                                    <Button className="deleteTaskButton" color="danger" name={project['id']} id={task.taskTitle} onClick={this.deleteTask}>Delete Task</Button>
                                                </tr>
                                            })}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Home