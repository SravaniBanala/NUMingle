import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import AllEvents from "../components/AllEvents";
import EventDetails from "../components/EventDetails";


function Events() {
  return (
    <Container>
    <Row>
        <Col md={5}>
            <AllEvents />
        </Col>
        <Col md={7}>
            <EventDetails />
        </Col>
    </Row>
</Container>
  )
}

export default Events