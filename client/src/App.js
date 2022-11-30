import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {

    const chatPrev = localStorage.getItem('isChat') == "true" ? true : false;
    const lobbyPrev = localStorage.getItem('isLobby') == "true" ? true : false;

    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);

    const user = useSelector((state) => state.user);
    return (
        <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, 
        privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages, isChat, setIsChat, isLobby, 
        setIsLobby  }}>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
