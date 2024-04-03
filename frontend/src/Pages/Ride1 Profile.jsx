import React, { useEffect, useState } from 'react'
import './Ride1.css'
import Button from 'react-bootstrap/esm/Button'
import image from "../assets/Ride1.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function Ride1() {

  const { rideid } = useParams()

  const [ridename, setridename] = useState("")
  const [ridedesc, setridedesc] = useState("")
  const [rideimgpath, setrideimgpath] = useState("")


  console.log(rideid);

  const navigate = useNavigate()

  const [feedbackname, setfeedbackname] = useState("")
  const [feedbackdescription, Setfeedbackdescription] = useState("")
  const [feedbacks, Setfeedbacks] = useState([])


  const getRide_id = () => {
    axios.post("http://localhost:1003/ride_with_id/" + rideid).then((res) => {
      console.log(res.data);


      setridename(res.data.ridename)
      setridedesc(res.data.ridedesc)
      setrideimgpath(res.data.rideimg)



    }).catch(err => {
      console.log(err);
    })
  }


  const handleClick = () => {
    console.log({ feedbackname, feedbackdescription });
    axios.post("http://localhost:1003/addfeedback", {
      ride_name: ridename,
      ride_id: rideid,
      feedbackname: feedbackname,
      feedbackdesc: feedbackdescription,
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const [state, Setstate] = useState(0)



  const getfeedback = () => {
    axios.post("http://localhost:1003/viewfeedback")
      .then((res) => {
        console.log(res.data);

        Setfeedbacks(res.data)
      }).catch((err) => {
        console.log(err);
      })
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  useEffect(() => {
    getfeedback()
    getRide_id()
  }, [])



  return (

    <>


      <div className='new'>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Ride1</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">


                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Register")}>Register</a>
                </li>


                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Login")}>Login </a>
                </li>


                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="" onClick={() => navgitor("/Rides")}>Rides </a>
                </li>



                {/* <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Deal change</a>
              </li> */}
              </ul>

              <form class="d-flex">
                <div className='search1'>
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                  {/* <button class="btn btn-primary" type="submit">Search</button> */}
                </div>
              </form>

            </div>
          </div>
        </nav>




        <div className='nav1'>

          <ul>
            <li><a class="#active" onClick={() => Setstate(0)} >PROFILE </a></li><br></br>

            <li><a class="#active" onClick={() => Setstate(1)}>PROBLEMS </a></li><br></br>


          </ul>
        </div>


        <div className='back button'>
          <button onClick={() => navigate("/")}  >Back To Home</button>
        </div>


        {state == 0 ?
          <div className='Ride11'>
            <img src={"http://localhost:1003/" + rideimgpath} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{ridename}</h5>
              <h5 class="card-title">{ridedesc}</h5>

              <p class="card-text"></p>

            </div>
          </div> :

          <div className='Ride12'>

            <div className='feedback'>
              <h1>Add.Feedback</h1><br></br><br></br>

              <form>
                <label form='fname'>TITLE :
                  <input type='text' onChange={(e) => setfeedbackname(e.target.value)}></input><br></br><br></br>

                  <div className='discription'>
                    <h>Description:</h>
                  </div>
                  <textarea name="message" rows="6" cols="30" onChange={(e) => Setfeedbackdescription(e.target.value)}></textarea>
                </label>
              </form>

              <button className='txt' onClick={handleClick}>submit</button>

            </div>

            <div className="viewfeedback">
              {
                feedbacks.map((ele, index) =>
                  <div className="feedback_each">
                    <div className="feedname">{ele.feedbackname}</div>
                    <div className="feedname">{ele.feedbackdesc}</div>
                    <div className="feedname">Date :{formatDate(ele.date)}</div>
                    <div className="feedname">issue :{ele.verify ? "solved" : "pending"(ele.date)}</div>

                  </div>
                )
              }
            </div>
          </div>


        }

      </div>
    </>
    // </div>
  )
}


export default Ride1




