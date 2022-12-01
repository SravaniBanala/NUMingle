import React, { useContext } from "react";
import { Nav, Navbar, Container, Button, NavDropdown, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './AdminDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function AdminDashboard() {
    console.log("In Admin Dashboard")

    function fetchAllEvents() {
    
    }
    
    return (
        <div>
            <div className="dashboard-title">
                <h1>Admin Dashboard</h1>
            </div>
            <Container className="dashboard-container">
                <Row md={3}>
                   
                    <Col md={3}>
                        <LinkContainer to="/events" onClick={fetchAllEvents}>
                            <div className="dashboard-tile">
                                <i class="fa-solid fa-magnifying-glass-location fa-5x"></i>
                                <h4 className="tile-title">View Events</h4>
                            </div>
                        </LinkContainer>
                    </Col>

                </Row>

            </Container>

        </div>
    );
}

export default AdminDashboard;