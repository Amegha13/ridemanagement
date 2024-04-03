import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

function Home() {


  const token = localStorage.getItem("jwt")
  const navgitor = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("jwt")
    window.location.reload()
  }

  return (

    <div className='home'>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">HOME</a><br></br>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">


              <li>
                <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Profile")}>Profile</a>
              </li>

              <li>
                <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Rides")}>Rides</a>
              </li>

            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

              {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
              {
                token ?

                  <Button id='ww' onClick={() => handleLogout()}>Logout</Button>
                  :
                  <Button id='ww' onClick={() => navgitor("/Login")}>Login</Button>
              }
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Home

