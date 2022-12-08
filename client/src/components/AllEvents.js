import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import './AllEvents.css'


function AllEvents() {
    console.log("In AllEvents")

    const { allEvents, setCurrentEvent, setDirectionsResponse, isAdmin } = useContext(AppContext);
    const user = useSelector((state) => state.user);

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
    function displayEvent(event){
        setCurrentEvent(event)
        setDirectionsResponse(null)
    }



  return (
        <>
        <div className="display-center">
            <h2>All Events</h2>
        </div>
        <div>
            {/* {users[0].name} */}
            {allEvents && allEvents.map((e) => (
                
                <div key={e._id} className="user-list-item"  >
                    <div>
                        {e.title}
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm event-btn-container" onClick={ () => { displayEvent(e) }}>View</button>
                        {!isAdmin && (
                            <button className="btn btn-primary btn-success btn-sm event-btn-container" onClick={ () => { registerEventHandler(e) }}>Register</button>
                        )}
                        
                    </div>

                </div>
                
            ))}
        </div>
        </>
  )
}

export default AllEvents