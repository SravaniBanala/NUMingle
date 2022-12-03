import React, { useState, useContext } from "react";
import { Col, Container, Form, Row, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./AdminAddEvent.css";
import { AppContext } from "../context/appContext";

function AdminAddEvent() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if(!mapCordinates){
      alert("Please select event location on map")
    }
    const payload = {
      title: title,
      description: description,
      latlng: mapCordinates,
      date: date,
      time: time
    }
    const raw = await fetch("http://localhost:5001/events/addEvent", {
      method: "POST",
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  })
  const data = await raw.json();
  console.log("Add Event resp -> ", data)
  alert("Event created Succesfuly")
  setTitle("")
  setDescription("")
  setDate("")
  setTime("")
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="d-flex align-items-center justify-content-center flex-direction-column">

      <form className="formContainer" name="addEventForm" onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="display-center">
          <h2>Add Event</h2>
        </div>

        <label >
          Title
        </label>
        <input type="text" className="input-text" value={title} id="title" placeholder="Enter title" name="title" onChange={(e) => { setTitle(e.target.value) }} required />

        <label >
          Description
        </label>
        <input type="text" className="input-text" value={description} id="des" placeholder="Enter Description" name="description" onChange={(e) => { setDescription(e.target.value) }} required />
        
        <label >
          Select Location
        </label>

        <label className="lbl-date">
          Event Date
        </label>
        <input type="date" className="input-text" value={date} id="date" min="" placeholder="Select Date" name="date" onChange={(e) => { setDate(e.target.value) }}  required />

        <label >
          Event Time
        </label>
        <input type="time" className="input-text" value={time} id="time" placeholder="Select Time" name="time" onChange={(e) => { setTime(e.target.value) }} required />
        
        <div className="display-center">
          <button type='submit' className="btn btn-primary btn-add-event" >Add</button>
        </div>
      </form>



    </div>
  )
}

export default AdminAddEvent