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
    

    return (
        <div>
            <div className="dashboard-title">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard;