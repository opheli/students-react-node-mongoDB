import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap'
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import StudentAdded from './components/StudentAdded';


function App() {
  const [studentAdded, setStudentAdded] = useState('')

  return (
    <BrowserRouter>
      <Container className="p-5 rounded-bottom">
        <h1>Students</h1>

        <Switch>

          <Route exact path="/">
            <Row>
              <StudentList />
              <AddStudent changeStudentAdded={(name) => setStudentAdded(name)} />
            </Row>
          </Route>

          <Route exact path="/studentAdded/">
            <StudentAdded name={studentAdded} />
          </Route>

        </Switch>
      </Container>
    </BrowserRouter>

  )
}

export default App
