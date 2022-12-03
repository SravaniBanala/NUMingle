import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Nav, Navbar, Container, Button, NavDropdown, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './AdminDashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function AdminDashboard() {
    console.log("In Admin Dashboard")
    const user = useSelector((state) => state.user);
    const { setAllEvents } = useContext(AppContext);

    function fetchAllEvents() {
        const fetchAllEvents = async () => {
            const raw = await fetch("http://localhost:5001/events/getAllEvents", { method: "GET" })
            const data = await raw.json();
            console.log("fetchAllEvents resp -> ", data)
            setAllEvents(data)
        }
        fetchAllEvents()
    }

    return (
        <div>
            <div className="dashboard-title">
                <h1>Admin Dashboard</h1>
            </div>
            <Container className="dashboard-container">
                <Row md={3}>
                    <Col md={3}>
                        <LinkContainer to="/addEvent">
                            <div className="dashboard-tile">
                                <i class="fa-solid fa-map-location-dot fa-5x"></i>
                                <h4 className="tile-title">Add Event</h4>
                            </div>
                        </LinkContainer>
                    </Col>
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