import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Polls.css'
 
function Polls() {

    console.log("In Polls")
    const { allPolls, setAllPolls, pollsChoices, setPollsChoices } = useContext(AppContext);
    const user = useSelector((state) => state.user);

    // checked={opt[0] == pollsChoices[p._id]}

    async function onChangeHandler(value, poll) {
        console.log("CHANGED")

        // increment choice count
        async function incrementChoiceCount() {
            console.log("--In incrementChoiceCount")
            const payloadIncrement = {
                user: user,
                value: value,
                poll: poll
            }
            const rawIncrement = await fetch("http://localhost:5001/polls/incrementChoiceCount", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payloadIncrement)
            })
            const data = await rawIncrement.json();
            setAllPolls(data)
        }
        await incrementChoiceCount()

        // store choice in backend
        async function storeChoice() {
            console.log("--In storeChoice")
            const payload = {
                user: user,
                value: value,
                poll: poll
            }
            const raw = await fetch("http://localhost:5001/polls/storeChoice", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const data = await raw.json();
            await setPollsChoices(data)
            console.log("----------",pollsChoices[allPolls[0]._id])
            //console.log("storeChoice data---", data)
        }
        await storeChoice()

        


    }

    return (
        <div className="polls-main-page">
            <div className="display-center">
                <h2>Polls </h2>
            </div>
            <div>
                {allPolls && pollsChoices && allPolls.map((p) => (

                    <div key={p._id} className="poll-item"  >
                        <Row>
                            <h3> {p.title} </h3>
                            <Col md={6}>
                                <div className="poll-desc-container"> {p.description} </div>
                                <fieldset id={p._id}>
                                {p.options.map((opt) => (
                                    <div className="form-check poll-options-container">
                                        <input name={p._id} className="form-check-input" onChange={(e) => { onChangeHandler(e.target.value, p) }} value={opt[0]} checked={opt[0] == pollsChoices[p._id]} type="radio" id="flexRadioDefault1"></input>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            {opt[0]}
                                        </label>
                                    </div>
                                ))}
                                </fieldset>
                            </Col>
                        </Row>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Polls