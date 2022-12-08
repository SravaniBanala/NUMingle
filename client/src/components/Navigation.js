import React, {useContext} from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "../context/appContext";
import logo from "../assets/logo.png";


function Navigation() {
    const user = useSelector((state) => state.user);
    const { isAdmin, setIsAdmin } = useContext(AppContext);
    const [logoutUser] = useLogoutUserMutation();

    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        localStorage.removeItem("loggedinAs");
        // redirect to home page
        window.location.replace("/");
    }
    async function handleAdminLogout(e) {
        e.preventDefault();
        setIsAdmin(false)
        window.location.replace("/");
    }
    return (
        <Navbar bg="dark" expand="lg" className="navbar">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} style={{ width: 50, height: 50 }} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )} */}
                        {user && (
                            <LinkContainer to="/dashboard">
                                <Nav.Link> <span className="navbar-color dashboard-title">Dashboard</span> </Nav.Link>
                            </LinkContainer>
                        )}
                        {/* <LinkContainer to="/chat">
                            <Nav.Link>Chat</Nav.Link>
                        </LinkContainer> */}
                        {isAdmin && (
                            <LinkContainer to="/dashboardAdmin">
                                <Nav.Link><span className="navbar-color dashboard-title">Dashboard</span></Nav.Link>
                            </LinkContainer>
                        )

                        }
                        {isAdmin && (
                            
                            <NavDropdown
                                title={
                                    <>
                                        <span className="navbar-color">Admin</span>
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>
                                    <Button variant="danger" className="logout-btn" onClick={handleAdminLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                                        <span className="navbar-color">{user.name}</span>
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item>
                                    <Button variant="danger" className="logout-btn" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
