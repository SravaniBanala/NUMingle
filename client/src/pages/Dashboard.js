import React, { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Nav, Navbar, Container, Button, NavDropdown, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import profile_img from "../assets/profile.png";
import { useSelector } from "react-redux";
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
    console.log("In Dashboard")
    const user = useSelector((state) => state.user);
    const { isChat, setIsChat, isLobby, setIsLobby, setAllUsers, allUsers, setConnections, setconnectionReqs,
    setAllEvents, setDiscoverList, setPollsChoices } = useContext(AppContext);

    function setChat() {
        setIsChat(true);
        setIsLobby(false);
        localStorage.setItem('isChat', true);
        localStorage.setItem('isLobby', false);
    }
    function setLobby() {
        setIsChat(false); 
        setIsLobby(true);
        localStorage.setItem('isChat', false);
        localStorage.setItem('isLobby', true);
    }
    
    function fetchAllEvents() {
        const fetchAllEvents = async () => {
            const raw = await fetch("http://localhost:5001/events/getAllEvents", {method: "GET"})
            const data = await raw.json();
            console.log("fetchAllEvents resp -> ", data)
            setAllEvents(data)
        }
        fetchAllEvents()
    }
    function setupConnectionLists() {
        const fetchAllUsers = async () => {
            const raw = await fetch("http://localhost:5001/connect/getAllUsers", {method: "GET"})
            const data = await raw.json();
            setAllUsers(data)
            localStorage.setItem('allUsers', JSON.stringify(data) );

        }
        fetchAllUsers()

        const fetchConnectionReqs = async () => {
            const raw = await fetch("http://localhost:5001/connect/getAllConnectionRequests", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await raw.json();
            setconnectionReqs(data)
            console.log("fetchConnectionReqs ->", data)
            localStorage.setItem('allConnReq', JSON.stringify(data) );

        }
        
    }

    return (
        <div>
            <div className="dashboard-title">
                <h1>Dashboard</h1>
            </div>
            <Container className="dashboard-container">
                <Row md={3}>
                    <Col md={3}>
                        <LinkContainer to="/profile" >
                            <div className="dashboard-tile">
                                <i class="fas fa-edit fa-5x"></i>
                                <h4 className="tile-title">Update Profile</h4>
                            </div>
                        </LinkContainer>
                    </Col>
                    <Col md={3}>
                        <LinkContainer to="/connect" onClick={ () => {setupConnectionLists()}}>
                            <div className="dashboard-tile">
                                <i class="fa-solid fa-link fa-5x"></i>
                                <h4>Connect</h4>
                            </div>
                        </LinkContainer>
                    </Col>
                    <Col md={3}>
                        <LinkContainer to="/chat" onClick={setChat}>
                            <div className="dashboard-tile">
                                <i class="fa-regular fa-comments fa-5x"></i>
                                <h4 className="tile-title">Chat</h4>
                            </div>
                        </LinkContainer>
                    </Col>
                    <Col md={3}>
                        <LinkContainer to="/alumini" onClick={setLobby}>
                            <div className="dashboard-tile">
                                <i class="fa-solid fa-users fa-5x"></i>
                                <h4 className="tile-title">Career Lobby</h4> 
                            </div>
                        </LinkContainer>    
                    </Col>
                </Row>
                
                <Row md={3}>
                    <Col md={3}>
                        <LinkContainer to="/events" onClick={fetchAllEvents}>
                            <div className="dashboard-tile">
                                <i class="fa-solid fa-magnifying-glass-location fa-5x"></i>
                                <h4 className="tile-title">Events</h4> 
                            </div>
                        </LinkContainer>
                    </Col>
                
                      

                </Row>


            </Container>

        </div>
    );
}

export default Dashboard;