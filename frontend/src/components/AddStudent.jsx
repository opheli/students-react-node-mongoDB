import React, { useState } from 'react'
import { Col, Form, Button, } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


function AddStudent({ changeStudentAdded }) {
    const history = useHistory()
    const [studentName, setStudentName] = useState('')
    const [studentAge, setStudentAge] = useState()
    const [studentCity, setStudentCity] = useState('')

    const sendStudent = () => {
        const url = ('http://localhost:8000/students')
        fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ name: studentName, age: studentAge, city: studentCity }),
        })
            .then(res => res.json())
            .then(data => {
                changeStudentAdded(studentName, studentAge, studentCity)
                history.push('/studentAdded')
            })
            .catch(err => console.log(err))
    }

    return (
        <Col className="bg-light text-dark p-2 rounded">
            <h5> Add Student</h5>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Student name : </Form.Label>
                    <Form.Control type="text" name="name" onChange={(e) => setStudentName(e.target.value)} placeholder="Enter name" />
                    <Form.Label>Age : </Form.Label>
                    <Form.Control type="number" name="age" onChange={(e) => setStudentAge(e.target.value)} min="1" />
                    <Form.Label>City : </Form.Label>
                    <Form.Control type="text" name="city" onChange={(e) => setStudentCity(e.target.value)} placeholder="Enter your city" />
                    <Form.Label>Languages : </Form.Label>
					<>
                    <Form.Select aria-label="languages">
                        <option>Open this select menu</option>
                        <option value="french">French</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="arabic">Arabic</option>
                        <option value="mandarin">Mandarin</option>
                    </Form.Select>
					</>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendStudent}>
                    Send
                </Button>
            </Form>
        </Col>
    )
}

export default AddStudent
