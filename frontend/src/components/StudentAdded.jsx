import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function StudentAdded({name}) {

    return (
       <Row>
           <Col>
           <h4>Student {name} has been added. <Link to="/">Go back</Link></h4>
           </Col>
       </Row>
    )
}

export default StudentAdded
