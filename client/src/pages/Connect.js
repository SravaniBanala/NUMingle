import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Connections from "../components/Connections";
import ConnectionRequests from "../components/ConnectionRequests";
import AllUsers from "../components/AllUsers";

import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";


function Connect() {
    const user = useSelector((state) => state.user);
    const { setAllUsers, allUsers, setConnections, setconnectionReqs, connections, connectionReqs } = useContext(AppContext);

    useEffect(() => {
        console.log("In Reload")

        const fetchAllUsers = async () => {
            const raw = await fetch("http://localhost:5001/connect/getAllUsers", {method: "GET"})
            const data = await raw.json();
            setAllUsers(data)
            //localStorage.setItem('allUsers', JSON.stringify(data) );
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
            //localStorage.setItem('allConnReq', JSON.stringify(data) );

        }
        fetchConnectionReqs()

        const fetchConnections = async () => {
            const raw = await fetch("http://localhost:5001/connect/getAllConnections", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await raw.json();
            setConnections(data)
            //localStorage.setItem('allConn', JSON.stringify(data) );

        }
        fetchConnections()

      }, []);


    return (
        <Container>
            <Row>
                <Col md={4}>
                    <AllUsers />
                </Col>
                <Col md={4}>
                    <ConnectionRequests />
                </Col>
                <Col md={4}>
                    <Connections />
                </Col>
            </Row>
        </Container>
    );
}

export default Connect;