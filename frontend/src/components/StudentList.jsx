import React, { useState, useEffect } from 'react'
import { Col, Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function StudentList() {
    const history = useHistory()
    const [students, setStudents] = useState([])

    const refreshData = () => {
        const url = 'http://localhost:8000/students'

        fetch(url)
            .then(res => res.json())
            .then(data => setStudents(data))
    }

    useEffect(() => {
        refreshData()
    }, [])

    const deleteStudent = (name) => {
        const url = (`http://localhost:8000/students/${name}`)
        fetch(url, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refreshData()
            })
            .catch(err => console.log(err))
    }


    return (
        <Col>
            <h5>List Students</h5>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Languages</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Button
                                            onClick={() => deleteStudent(student.name)}
                                            variant="outline-danger"
                                            className="p-0" size="sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </Button>
                                    </td>
                                    <td> {student.name}</td>
                                    <td>{student.age}</td>
                                    <td>{student.city}</td>
                                    <td>{student.languages.join(" ")}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table >



        </Col >
    )
}

export default StudentList
