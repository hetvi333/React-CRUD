import React, { useState } from "react";
import style from "./TableInput.module.css";
import axios from "axios";

function TableInput({ setInputChange, inputChange }) {
  // Initializing state variables
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:3000/users/").then((response) => {
      setId(response.data.length + 1);
      console.log(response.data.length);
    });
    await axios
      .post("http://localhost:3000/users/", {
        name: name,
        email: email,
        city: city,
      })
      .then((response) => {
        console.log(response?.data);
        setInputChange(!inputChange);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <table className={style.input_table}>
          <thead>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)} //onChange is triggered whenever the input value changes, capture the new value and update the corresponding state variable and target retrieves the new value entered in the input field, set("functions") are to update the state with the new value.
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Your City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </td>
              <td>
                <button className={style.btn} onClick={handleSubmit}>
                  Add
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </form>
    </div>
  );
}

export default TableInput;
