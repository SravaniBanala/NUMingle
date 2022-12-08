import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner, Dropdown, DropdownButton } from "react-bootstrap";
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { AppContext } from "../context/appContext";
import logo from '../assets/logo.png'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("Login As");
    const navigate = useNavigate();
    const { socket, loggedinAs, setLoggedinAs, isAdmin, setIsAdmin } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handleLogin(e) {
        e.preventDefault();

        if (type == "Login As") {
            return
        }
        // login for admin
        if (type == "Admin") {
            if(email == "admin@northeastern.edu" && password == "admin"){
                setIsAdmin(true)
                localStorage.setItem('loggedinAs', "Admin");
                navigate("/dashboardAdmin");
                return
            }
            else {
                alert("Invalid Admin Login Crendentails")
                return
            }
        }
        // login logic
        loginUser({ email, password }).then(({ data }) => {
            // socket work
            if(data){
                setIsAdmin(false)
                socket.emit("new-user");
                navigate("/dashboard");
            }   
        });
    }

    function loginStudentHandler() {
        setType("Student")
    }
    function loginAdminHandler() {
        setType("Admin")
    }


    return (
        <Container>
            <Row>
                <Col md={5} className="login__bg"></Col>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>

                        <div className="login-title">
                            <img src={logo} height="100px" width="100px" />
                            
                        </div>
                        <h2>Login</h2>

                        <div className="login-title">
                        <DropdownButton id="dropdown-basic-button" title={type}>
                            <Dropdown.Item onClick={()=>{loginStudentHandler()}}>Student</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{loginAdminHandler()}}>Admin</Dropdown.Item>
                        </DropdownButton>
                        </div>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {error && <p className="alert alert-danger">{error.data}</p>}
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isLoading ? <Spinner animation="grow" /> : "Login"}
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Don't have an account ? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
