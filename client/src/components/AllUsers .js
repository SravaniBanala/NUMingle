import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import './AllUsers.css'

function AllUsers() {
    console.log("In AllUsers")

    const { allUsers } = useContext(AppContext);
    const user = useSelector((state) => state.user);

    function createConnectionReq(member) {
        console.log(" Button - clicked - createConnection")
        const payload = {
            sender: user,
            receiver: member
        }
    }

    return (
        <>
        <div className="display-center">
            <h2>All Users</h2>
        </div>
        <div>
            {/* {users[0].name} */}
            {allUsers.map((n) => (
                
                <div key={n._id} className="user-list-item" onClick={ () => { createConnectionReq(n) }} hidden={n._id === user._id}>
                    <div>
                        <img src={n.picture} className="member-status-img" />
                        {n.name}
                    </div>
                    <button class="btn btn-primary">Connect</button>
                </div>
                
            ))}
        </div>
        </>


    )
}

export default AllUsers