import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Alumini from "./pages/Alumini";
import Connect from "./pages/Connect";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddEvent from "./pages/AdminAddEvent";
import AdminAddPoll from "./pages/AdminAddPoll";
import Events from "./pages/Events";
import Discover from "./pages/Discover";
import Polls from "./pages/Polls";
import AdminViewPolls from "./pages/AdminViewPolls";
import CalendarEvents from "./pages/CalendarEvents";
import AdminApp from "./pages/AdminApp";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {

    const user = useSelector((state) => state.user);    
    // get initial values from localstorage 
    const chatPrev = localStorage.getItem('isChat') == "true" ? true : false;
    const lobbyPrev = localStorage.getItem('isLobby') == "true" ? true : false;
    const loggedinAsPrev = localStorage.getItem('loggedinAs') || "Login As";
    // login
    const [loggedinAs, setLoggedinAs] = useState(loggedinAsPrev);
    const [isAdmin, setIsAdmin] = useState(false);
    // chat
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [privateMemberMsg, setPrivateMemberMsg] = useState({});
    const [newMessages, setNewMessages] = useState({});
    const [isChat, setIsChat] = useState(chatPrev);
    const [isLobby, setIsLobby] = useState(lobbyPrev);
    // connect
    const [allUsers, setAllUsers] = useState([]);
    const [connections, setConnections] = useState([]);
    const [connectionReqs, setconnectionReqs] = useState([]);
    // events
    const [allEvents, setAllEvents] = useState(() => {getAllEvents()});
    const [currentEvent, setCurrentEvent] = useState(() => {getCurrentEvent()});
    const [directionsResponse, setDirectionsResponse] = useState(null);
    // discover
    const [discoverList, setDiscoverList] = useState(() => {getDiscoverList()});
    // polls
    const [allPolls, setAllPolls] = useState(() => {getAllPolls()});
    const [pollsChoices, setPollsChoices] = useState(() => {getPollsChoices()});

    async function getAllEvents() {
        const raw = await fetch("http://localhost:5001/events/getAllEvents", {method: "GET"})
        const data = await raw.json();
        setAllEvents(data)
    }
    async function getAllPolls() {
        const raw = await fetch("http://localhost:5001/polls/getAllPolls", {method: "GET"})
        const data = await raw.json();
        setAllPolls(data)
    }

    async function getCurrentEvent() {
        const raw = await fetch("http://localhost:5001/events/getAllEvents", {method: "GET"})
        const data = await raw.json();
        setCurrentEvent(data[0])
    }
    async function getDiscoverList() {
        const raw = await fetch("http://localhost:5001/discover/getDiscoverList", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await raw.json();
        setDiscoverList(data)
    }
    async function getPollsChoices() {
        console.log(" --- Sending getPollsChoices ---")
        const raw = await fetch("http://localhost:5001/polls/getUserPollsChoices", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await raw.json();
        setPollsChoices(data)

    }


    return (
        <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, 
        privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages, isChat, setIsChat, isLobby, 
        setIsLobby, allUsers, setAllUsers, connections, setConnections, connectionReqs, setconnectionReqs ,
        allEvents, setAllEvents, currentEvent, setCurrentEvent, discoverList, setDiscoverList, allPolls, setAllPolls,
        pollsChoices, setPollsChoices, directionsResponse, setDirectionsResponse, loggedinAs, setLoggedinAs,
        isAdmin, setIsAdmin}}>
            <BrowserRouter>
                <Navigation />
                <div className="space-div"></div>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    {isAdmin && (
                        <>
                            <Route path="/" element={<AdminDashboard />} />
                            <Route path="/login" element={<AdminDashboard />} />
                            <Route path="/signup" element={<AdminDashboard />} />
                        </>
                    )}
                    {!user && (
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}
                    {user && (
                        <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/login" element={<Dashboard />} />
                            <Route path="/signup" element={<Dashboard />} />
                        </>
                    )}
                    
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/alumini" element={<Alumini />} />
                    <Route path="/connect" element={<Connect />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/polls" element={<Polls />} />
                    <Route path="/calenderEvents" element={<CalendarEvents />} />

                    <Route path="/dashboardAdmin" element={<AdminDashboard />} />
                    <Route path="/addEvent" element={<AdminAddEvent />} />
                    <Route path="/addPoll" element={<AdminAddPoll />} />
                    <Route path="/adminViewPolls" element={<AdminViewPolls />} />
                    <Route path="/allStudents" element={<AdminApp />} />

                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
