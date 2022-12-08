import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";


function Profile() {

  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
//   const [address, setAddress] = useState("");
//   const [course, setCourse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      user: user,
      name: name,
      email: email,

    }

    const raw = await fetch("http://localhost:5001/users/update", {
      method: "POST",
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  })
  const data = await raw.json();
  console.log("Add Event resp -> ", data)
  alert("User Details Succesfuly")
  setName("")
  setEmail("")


  }

  return (
    <div className="d-flex align-items-center justify-content-center flex-direction-column">

      <form className="formContainer" name="addEventForm" onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="display-center">
          <h2>Update Profile</h2>
        </div>
        <label >
          Name
        </label>
        <input type="text" className="input-text" value={name} id="name" name="name" onChange={(e) => { setName(e.target.value) }} required />

        <label >
          Email
        </label>
        <input type="text" className="input-text" value={email} id="des" name="email" onChange={(e) => { setEmail(e.target.value) }} required />

        {/* <label >
          Address
        </label>
        <input type="text" className="input-text" value={optionA} id="name" placeholder="Enter Option A" name="name" onChange={(e) => { setOptionA(e.target.value) }} required />

        <label >
          Course
        </label>
        <input type="text" className="input-text" value={optionB} id="name" placeholder="Enter Option B" name="name" onChange={(e) => { setOptionB(e.target.value) }} required /> */}

        <div className="display-center">
          <button type='submit' className="btn btn-primary btn-add-event" >Update</button>
        </div>

      </form>



    </div>
  )
}

export default Profile