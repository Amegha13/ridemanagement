import React, { useEffect, useState } from 'react'
import './Rides.css'
// import image from "../assets/Ride1.jpg"
// import image2 from "../assets/Ride2.jpg"
// import image3 from "../assets/Ride3.jpg"
// import image4 from "../assets/Ride4.jpg"
// import image5 from "../assets/Ride5.jpg"
// import image20 from "../assets/Ride6.jpg"
// import image9 from "../assets/Ride7.jpg"
// import image8 from "../assets/Ride8.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'


function Rides() {


    const token = localStorage.getItem("jwt")
    const navgitor = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem("jwt")
        window.location.reload()
    }


    {

        const navgitor = useNavigate()

        const [rides, setrides] = useState([])


        const viewRide = () => {
            axios.post("http://localhost:1003/viewride").then(res => {
                console.log(res.data);
                setrides(res.data)
            }).catch(err => {
                console.log(err);
            })
        }

        console.log(rides);

        useEffect(() => {
            viewRide()

        }, [])

        return (
            <div className='Rides1'>

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">RIDES</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                                </li>


                                <li class="nav-item">
                                    <a class="nav-link" href="" onClick={() => navgitor("/TechnicianSection")}>TechnicianSection</a>
                                </li>



                                <li>
                                    <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Register")}>Register</a>
                                </li>

                                {
                                    token ?
                                        <Button id='PP' onClick={() => handleLogout()}>Logout</Button>
                                        :
                                        <Button id='PP' onClick={() => navgitor("/Login")}>Login</Button>
                                }


                            </ul>
                            <form class="d-flex">
                                <div className='searchbar'>
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                                    {/* <button class="btn btn-primary" type="submit">Search</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>

                <div className='bg'>

                    {rides.map((element, index) =>

                        <div className='Ride1'>
                            <img src={"http://localhost:1003/" + element.rideimg} class="card-img-top" alt="..." /><br></br><br></br>
                            <div class="card-body">
                                <h5 class="card-title">{element.ridename}</h5><br></br>
                                <a href="" class="btn btn-primary" onClick={() => navgitor("/Rideprofile/" + element._id)}>View</a>
                                <p class="card-text"></p>

                            </div>
                        </div>
                    )}
                </div>
            </div>

        )
    }

}
export default Rides

