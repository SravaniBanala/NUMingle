import React, { useState, useContext } from "react";
import { Col, Container, Form, Row, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import profile_img from "../assets/profile_img.jpeg";
import { AppContext } from "../context/appContext";

function Signup() {
    const [email, setEmail] = useState("");
    const [nuid, setNuid] = useState("");
    const [type, setType] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const { loggedinAs, setLoggedinAs } = useContext(AppContext);
    const navigate = useNavigate();
    
    async function handleSignup(e) {
        e.preventDefault();
        // signup the user
        signupUser({ name, nuid, email, password, picture: url, type }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/dashboard");
                //navigate("/chat");
            }
        });
    }
    // function loginStudentHandler() {
    //     setLoggedinAs("Student")
    //     setType("Student")
    //     localStorage.setItem('loggedinAs', "Student");
    // }
    // function loginAluminiHandler() {
    //     setLoggedinAs("Alumini")
    //     setType("Alumini")
    //     localStorage.setItem('loggedinAs', "Alumini");
    // }

    return (
        <Container>
            <Row>
                <Col md={5} className="login__bg"></Col>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                        <h2 className="text-center">Create account</h2>
                       
                        {/* <div className="signup-dropdown">
                        <DropdownButton id="dropdown-basic-button" title={loggedinAs}>
                            <Dropdown.Item onClick={()=>{loginStudentHandler()}}>Student</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{loginAluminiHandler()}}>Alumini</Dropdown.Item>
                        </DropdownButton>
                        </div> */}

                        {error && <p className="alert alert-danger">{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNUID">
                            <Form.Label>NUID</Form.Label>
                            <Form.Control type="text" placeholder="Your NUID" onChange={(e) => setNuid(e.target.value)} value={nuid} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {upladingImg || isLoading ? "Signing you up..." : "Signup"}
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                {/* <Col md={5} className="signup__bg"></Col> */}
            </Row>
        </Container>
    );
}

export default Signup;
