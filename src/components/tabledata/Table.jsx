import axios from "axios";
import style from "./Table.module.css";
import React, { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUpRightFromSquare } from "react-icons/fa6";

function Table({inputChange}) {
  const [data, setData] = useState([]); // usestate for manage and set the data fetched from API
  const [edit, setEdit] = useState(-1);

  // variables to manage the updated name, email, and city
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateCity, setUpdateCity] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/`);
      setData(response.data);
    } catch (error) {
      console.log("Error: error while getting users -", error);
    }
  };

  const editHandler = (id, name, email, city) => {
    setEdit(id);
    setUpdateCity(city);
    setUpdateName(name);
    setUpdateEmail(email);
  };

  const updateHandler = async () => {
    console.log(edit);
    await axios
      .put("http://localhost:3000/users/" + edit, {
        id: edit,
        name: updateName,
        email: updateEmail,
        city: updateCity,
      })
      .then((res) => {
        console.log(res.data);
        location.reload();
        setEdit(-1);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = async (id) => {
    await axios.delete("http://localhost:3000/users/" + id).then((res) => {
      getUsers();
    });
  };

  useEffect(() => {
    // use useEffect for run the code first time after the component is rendered
    getUsers();
  }, [inputChange]);

  return (
    <div className={style.container}>
      <table className={style.list_container}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(data)}
          {data.map((user, index) =>
            user._id === edit ? (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={updateCity}
                    onChange={(e) => setUpdateCity(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={updateHandler} className={style.updatebtn}>
                    <FaUpRightFromSquare />
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>
                  <button
                    className={style.editbtn}
                    onClick={() =>
                      editHandler(user._id, user.name, user.email, user.city)
                    }
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={style.deletebtn}
                    onClick={() => deleteHandler(user._id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
