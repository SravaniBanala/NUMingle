
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Discover.scss'

function Discover() {

    console.log("In Discover")
    const navigate = useNavigate();
    const { discoverList, allUsers, setCurrentEvent, setDirectionsResponse } = useContext(AppContext);
    const user = useSelector((state) => state.user);

    function createConnectionReq(member) {
        console.log(" Button - clicked - createConnection")
        const payload = {
            sender: user,
            receiver: member
        }
        const connectUsers = async () => {
            const raw = await fetch("http://localhost:5001/connect/createConnectionReq", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await raw.json();
            if (data.hasOwnProperty('err')) {
                alert(data.err)
            }
            else{
                alert("Connection request send")
            }
            
        }
        connectUsers()
    }
    function registerEventHandler(event) {
        console.log("In registerEventHandler")
        const payload = {
            event: event,
            user: user
        }
        console.log("payload", payload)
        const registerEvent = async () => {
            const raw = await fetch("http://localhost:5001/events/registerEvent", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await raw.json();
            if (data.hasOwnProperty('err')) {
                alert(data.err)
            }
            else{
                alert("Registered for event successfully")
            }
        }
        registerEvent()
    }
    function viewEventHandler(event) {
        setCurrentEvent(event)
        setDirectionsResponse(null)
        navigate("/events")
    }

  return (
    <div className="discover-main-page">
    <div className="display-center">
        <h2>Discover activites of your connections </h2>
    </div>
    <div>
        {/* {users[0].name} */}
        {discoverList && discoverList.map((dis) => (
            
            <div key={dis._id} className="discover-list-item"  >
                <div>
                    {dis.type == "connection" && (
                        <>
                            <h4>New Connection Recommendation</h4>
                            <div>Your friend <b>{dis.connectedBy.name}</b> has connected with  <b>{dis.connectedTo.name}</b></div>
                            <div> You can send connection request to {dis.connectedTo.name}</div>
                        </>
                    )}
                    {dis.type == "event" && (
                        <>
                            <h4>New Event Registration Recommendation</h4>
                            <div>Your friend <b>{dis.registeredBy.name}</b> has registered for and will be attending <b>{dis.event.title}</b></div>
                            <div>Consider registering for {dis.event.title}</div>
                        </>                    
                    )}
                </div>
                <div>
                    {dis.type == "connection" && (
                        <button className="btn btn-primary event-btn-container" onClick={ () => { createConnectionReq(dis.connectedTo) }}>Connect</button>
                    )}
                    {dis.type == "event" && (
                        <button className="btn btn-primary event-btn-container" onClick={ () => { viewEventHandler(dis.event) }}>View</button>
                    )}
                    {dis.type == "event" && (
                        <button className="btn btn-primary btn-success event-btn-container" onClick={ () => { registerEventHandler(dis.event) }}>Register</button>
                    )}
                </div>

            </div>
            
        ))}
    </div>
    </div>
  )
}

export default Discover