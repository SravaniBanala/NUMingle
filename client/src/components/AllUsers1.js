
import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";



function AllUsers() {

    console.log("in All Users")
    const user = useSelector((state) => state.user);
    const { setMembers, members } = useContext(AppContext);

    fetch("http://localhost:5001/connect/getAllUsers", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
            setMembers(data);
        });
    
    function createConnection(member) {
        console.log(" Button - clicked - createConnection")
        console.log(member)
        // const payload = {
        //     first: user,
        //     second: member
        // }
        // fetch("http://localhost:5001/connect/createConnection", {
        //     method: "POST",
        //     body: payload
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data)
        // });
    }

  return (

    // members.map((member) => (
    //     <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} onClick={createConnection} hidden={member._id === user._id}>
    //         <Row>
    //             <Col xs={1} className="member-status">
    //                 <img src={member.picture} className="member-status-img" />
    //                 {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
    //             </Col>
    //             <Col xs={8}>
    //                 {member.name}
    //             </Col>
    //             <Col xs={3}>
    //                 {/* <button class="btn btn-primary" onClick={createConnection(member)}>Connect</button> */}
    //                 {/* <button class="btn btn-primary" type="submit" onSubmit={createConnection}>Button</button> */}
    //             </Col>
    //         </Row>
    //     </ListGroup.Item>
    // ))

    // members.map((member, idx) => (

    //     <div className="list-item">
    //         <span className="member-status">
    //         <img src={member.picture} className="member-status-img" />
    //         {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
    //         </span>
    //         {member.name}
    //         {/* <button class="btn btn-primary" onClick={createConnection(member)}>Connect</button> */}
    //     </div>
    // ))
    <div>
        Hello
    </div>
  )
}

export default AllUsers



// import React, { useContext, useEffect } from "react";
// import { Col, ListGroup, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { AppContext } from "../context/appContext";
// import { addNotifications, resetNotifications } from "../features/userSlice";
// import "./Sidebar.css";

// function AllUsers() {
//     const user = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);
//     //to toggle sidebar for chat and lobby
//     const { isChat, isLobby } = useContext(AppContext);

//     function joinRoom(room, isPublic = true) {
//         if (!user) {
//             return alert("Please login");
//         }
//         socket.emit("join-room", room, currentRoom);
//         setCurrentRoom(room);

//         if (isPublic) {
//             setPrivateMemberMsg(null);
//         }
//         // dispatch for notifications
//         dispatch(resetNotifications(room));
//     }

//     socket.off("notifications").on("notifications", (room) => {
//         if (currentRoom != room) dispatch(addNotifications(room));
//     });

//     useEffect(() => {
//         if (user) {
//             setCurrentRoom("general");
//             getRooms();
//             socket.emit("join-room", "general");
//             socket.emit("new-user");
//         }
//     }, []);

//     socket.off("new-user").on("new-user", (payload) => {
//         setMembers(payload);
//     });

//     function getRooms() {
//         fetch("http://localhost:5001/rooms")
//             .then((res) => res.json())
//             .then((data) => setRooms(data));
//     }

//     function orderIds(id1, id2) {
//         if (id1 > id2) {
//             return id1 + "-" + id2;
//         } else {
//             return id2 + "-" + id1;
//         }
//     }

//     function handlePrivateMemberMsg(member) {
//         setPrivateMemberMsg(member);
//         const roomId = orderIds(user._id, member._id);
//         joinRoom(roomId, false);
//     }

//     if (!user) {
//         return <></>;
//     }

//   return (
//     members.map((member) => (
//         <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member?._id} onClick={() => handlePrivateMemberMsg(member)} hidden={member._id === user._id}>
//             <Row>
//                 <Col xs={2} className="member-status">
//                     <img src={member.picture} className="member-status-img" />
//                     {member.status == "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
//                 </Col>
//                 <Col xs={9}>
//                     {member.name}
//                     {member._id === user?._id && " (You)"}
//                     {member.status == "offline" && " (Offline)"}
//                 </Col>
//                 <Col xs={1}>
//                     <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
//                 </Col>
//             </Row>
//         </ListGroup.Item>
//     ))
//   )
// }

// export default AllUsers