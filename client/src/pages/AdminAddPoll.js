import React, { useState, useContext } from "react";

function AdminAddPoll() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const options = [
      [optionA, 0],
      [optionB, 0],
      [optionC, 0],
      [optionD, 0]
    ]

    const payload = {
      title: title,
      description: description,
      options: options
    }

    const raw = await fetch("http://localhost:5001/polls/addPoll", {
      method: "POST",
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  })
  const data = await raw.json();
  console.log("Add Event resp -> ", data)
  alert("Poll created Succesfuly")
  setTitle("")
  setDescription("")
  setOptionA("")
  setOptionB("")
  setOptionC("")
  setOptionD("")

  }


  return (
    <div className="d-flex align-items-center justify-content-center flex-direction-column">

      <form className="formContainer" name="addEventForm" onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="display-center">
          <h2>Add Poll</h2>
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
          Option A
        </label>
        <input type="text" className="input-text" value={optionA} id="title" placeholder="Enter Option A" name="title" onChange={(e) => { setOptionA(e.target.value) }} required />

        <label >
          Option B
        </label>
        <input type="text" className="input-text" value={optionB} id="title" placeholder="Enter Option B" name="title" onChange={(e) => { setOptionB(e.target.value) }} required />

        <label >
          Option C
        </label>
        <input type="text" className="input-text"value={optionC} id="title" placeholder="Enter Option C" name="title" onChange={(e) => { setOptionC(e.target.value) }} required />

        <label >
          Option D
        </label>
        <input type="text" className="input-text" value={optionD} id="title" placeholder="Enter Option D" name="title" onChange={(e) => { setOptionD(e.target.value) }} required />

        <div className="display-center">
          <button type='submit' className="btn btn-primary btn-add-event" >Add</button>
        </div>
      </form>



    </div>
  )
}

export default AdminAddPoll