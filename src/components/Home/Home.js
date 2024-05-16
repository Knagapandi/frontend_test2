import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { useAuth } from "../Context/auth";

const Home = () => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
 const [role,setrole]=useState("");

  useEffect(() => {
    getData();
    console.log(auth)
  }, []);

  const getData = async () => {
    try {
      const data = localStorage.getItem("auth");
      const parseData = JSON.parse(data);
      console.log("authdata",parseData)
      setrole(parseData.role)
    console.log(data)
      const res = await axios.get(`http://localhost:8000/findModel?organization=${parseData?.organization}`);
      console.log(res.data)
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const selectedItem = data.find((item) => item._id === id);
    setEditedData(selectedItem);
    // setShowPopup(true);
  };

  const handleSave = async () => {
    try {
      console.log(editingId)
       
      await axios.put(`http://localhost:8000/updateModel`, {editedData});
      // If the API call is successful, update the local data state
      const updatedData = data.map((item) => (item._id === editingId ? editedData : item));
      setData(updatedData);
    console.log(updatedData[editingId-1])

      // setShowPopup(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/deleteModel/${id}`);
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid home">
      <div className="col home_header">
        <span className="home_title">
          <strong>Welcome to our dashboard</strong>
        </span>
        <div className={`col home_img ${role !== "user" ? "" : "small"}`}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {role!=="user"?<>
                <th>Role</th>
                <th>Organizations</th>
                <th>Actions</th></>:""}
              </tr>
            </thead>
            <tbody>
              {data.map((item,index) => (
                <tr key={item._id}>
                  <td>{index+1}</td>
                  <td>
                    {editingId === item._id ? (
                      <input
                        type="text"
                        name="username"
                        value={editedData.username}
                        onChange={handleChange}
                      />
                    ) : (
                      item.username
                    )}
                  </td>
                  <td>
                    {editingId === item._id ? (
                      <input
                        type="text"
                        name="role"
                        value={editedData.role}
                        onChange={handleChange}
                      />
                    ) : (
                      <>{role!=="user"?item.role:""}</>
                    )}
                  </td>
                  <td>{item.organizationName}</td>
                  <td>
                    {editingId === item._id ? (
                      <button onClick={handleSave}>Save</button>
                    ) : (
                      <>{role!=="user"?
                        <>
                        <button onClick={() => handleEdit(item._id)}>Edit</button>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </>:""}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
        </div>
      </div>
    </div>
  );
};

export default Home;
