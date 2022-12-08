
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import './Connections.scss'

function Connections() {

    console.log("In Connections")

    const { connections, setConnections } = useContext(AppContext);
    const user = useSelector((state) => state.user);

    const fetchConnections = async () => {
        console.log("---In fetchConnections----")
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

    function removeConnection(member) {
        console.log(" Button - clicked - createConnection")
        const payload = {
            sender: user,
            receiver: member
        }
        const removeUser = async () => {
            const raw = await fetch("http://localhost:5001/connect/removeConnection", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await raw.json();
            fetchConnections()
            if (data.hasOwnProperty('err')) {
                alert(data.err)
            }
        }
        removeUser()

        // refresh Connections

    }


  return (
    <>
    <div className="display-center">
        <h2>Your Connections</h2>
    </div>
    <div>
        {/* {users[0].name} */}
        {connections.map((n) => (
            
            <div key={n._id} className="user-list-item"  hidden={n._id === user._id}>
                <div>
                    <img src={n.picture} className="member-status-img" />
                    {n.name}
                </div>
                <button class="btn btn-danger" onClick={ () => { removeConnection(n) }}>Remove</button>
            </div>
            
        ))}
    </div>
    </>
  )
}

export default Connections