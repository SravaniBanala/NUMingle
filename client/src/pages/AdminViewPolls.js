import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { Container, Row, Col } from "react-bootstrap";
import './Polls.css'
import PollsChart from '../components/PollsChart'


function AdminViewPolls() {

    console.log("In Admin Polls")
    const { allPolls, setAllPolls, pollsChoices, setPollsChoices } = useContext(AppContext);

    return (
        <div className="polls-main-page">
            <div className="display-center">
                <h2>Polls </h2>
            </div>
            <div>
                {allPolls && allPolls.map((p) => (

                    <div key={p._id} className="poll-item"  >
                        <Row>
                            <h3> {p.title} </h3>
                            <Col md={6}>
                                <div className="poll-desc-container"> {p.description} </div>

                            </Col>
                            <Col md={6}>
                                <PollsChart 
                                curPoll = {p}
                                />
                            </Col>
                        </Row>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminViewPolls