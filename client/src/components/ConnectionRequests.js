import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import './ConnectionRequests.scss'

function ConnectionRequests() {

    console.log("In ConnectionRequests")

    const { connectionReqs, setconnectionReqs, setConnections } = useContext(AppContext);
    const user = useSelector((state) => state.user);

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
    function createConnection(member) {
        console.log(" Button - clicked - createConnection")
        const payload = {
            sender: user,
            receiver: member
        }
        const connectUsers = async () => {
            const raw = await fetch("http://localhost:5001/connect/createConnection", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await raw.json();
            // refresh
            fetchConnectionReqs()
            fetchConnections()
            if (data.hasOwnProperty('err')) {
                alert(data.err)
            }
            else{
                alert("Connection created successfully")
            }
        }
        connectUsers()

        
    }

    function rejectConnection(member) {
        console.log(" Button - clicked - createConnection")
        const payload = {
            sender: user,
            receiver: member
        }
        const rejectUser = async () => {
            const raw = await fetch("http://localhost:5001/connect/rejectConnection", {
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await raw.json();
            // refresh
            fetchConnectionReqs()
            fetchConnections()
            if (data.hasOwnProperty('err')) {
                alert(data.err)
            }
        }
        rejectUser()


    }


  return (
    <>
    <div className="display-center">
        <h2>Connection Requests</h2>
    </div>
    <div>
        {/* {users[0].name} */}
        {connectionReqs.map((n) => (
            
            <div key={n._id} className="user-list-item"  hidden={n._id === user._id}>
                <div>
                    <img src={n.picture} className="member-status-img" />
                    {n.name}
                </div>
                <div>
                    <button class="btn btn-success btn-sm btn-conn-req" onClick={ () => { createConnection(n) }}>Accept</button>
                    <button class="btn btn-danger btn-sm btn-conn-req" onClick={ () => { rejectConnection(n) }}>Reject</button>
                </div>


            </div>
            
        ))}
    </div>
    </>
  )
}

export default ConnectionRequests