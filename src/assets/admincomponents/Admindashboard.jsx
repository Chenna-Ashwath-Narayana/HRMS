import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate , useNavigate } from 'react-router-dom';

import '../Admincomponentsstyles/Admindashboard.css'


const Admindashboard = () => {

  

  const [employeecount, setCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:9000/employee/count")
            .then(response => {
                setCount(response.data);
            })
            .catch(error => {
                console.error("Error fetching employee count:", error);
            });
    }, []);

  const[projectscount , setProjectsCount] = useState(0);
    useEffect(() => {
      axios.get("http://localhost:9000/project/count")
      .then(response => {
        setProjectsCount(response.data);
        })
        .catch(error => {
          console.error("Error fetching project count:", error);
          });
    }, []);

    const[clientscount, setClientsCount] = useState(0);
    useEffect(() => {
      axios.get("http://localhost:9000/client/count")
      .then(response => {
        setClientsCount(response.data);
        })
        .catch(error => {
          console.error("Error fetching client count:", error);
          });
    }, []);

  return (
    <>
    <div className='dashboard-container'>
      <div></div>
        <div className='count-of-all'> 
          <div className='employeecount-container'>
            <h2>Employee Count:</h2>
            <p>{employeecount}</p>
          </div>
          <div className='projectcount-container'>
            <h2>No of Projects:</h2>
            <p>{projectscount}</p>
            </div>
          <div className='clientcount-container'>
            <h2>No Of Clients:</h2>
            <p>{clientscount}</p>
          </div>
        </div>
        <div></div>
        <div>
          
        </div>
    </div>
    </>
  )
}

export default Admindashboard
