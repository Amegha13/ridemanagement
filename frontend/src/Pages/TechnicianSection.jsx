import React from 'react'
import './Ride.css'
import { useNavigate } from 'react-router-dom'
import image8 from "../assets/Ride8.jpg"
import image7 from "../assets/Ridenew.jpg"
import image12 from "../assets/Ridenew2.jpg"

function TechnicianSection() {

  const navgitor = useNavigate()


  return (
    <div className=' class1'>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Technician Section</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/")}>Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Register")}>Register</a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Rides")}>Rides </a>
              </li>
            </ul>

            <form class="d-flex">

              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
              <button class="btn btn-primary" type="submit">Search</button>

            </form>

          </div>
        </div>
      </nav>

      <div className='background'>
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img className='image1' src={image8} class="d-block w-100" alt="slide1" />
            </div>
            <div class="carousel-item">
              <img src={image7} class="d-block w-100" alt="slide2" />
            </div>
            <div class="carousel-item">
              <img src={image12} class="d-block w-100" alt="slide3" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

      </div>


    </div>
  )
}

export default TechnicianSection
