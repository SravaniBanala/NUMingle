import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar() {
    console.log("in Sidebar")
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);
    //to toggle sidebar for chat and lobby
    const { isChat, isLobby } = useContext(AppContext);

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Please login");
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        // dispatch for notifications
        dispatch(resetNotifications(room));
    }

    socket.off("new-user").on("new-user", (payload) => {
        setMembers(payload);
    });

    return (
        <>
            {isLobby && 
            <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room == currentRoom} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                        {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            }


        </>
    );
}

export default Sidebar;
