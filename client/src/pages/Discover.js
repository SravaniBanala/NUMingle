
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Discover.css'

function Discover() {

    console.log("In Discover")
    const navigate = useNavigate();
    const { discoverList, allUsers, setCurrentEvent, setDirectionsResponse } = useContext(AppContext);
    const user = useSelector((state) => state.user);

    Discover.js
    Discover.css
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
    </div>
  )
}

export default Discover