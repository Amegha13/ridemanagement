import { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const token = localStorage.getItem("jwt")

  const navigate = useNavigate()

  const handleClick = () => {
    console.log({ email, password });

    axios.post("http://localhost:1003/Login", {

      email: email,
      password: password
    }).then((res) => {
      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("jwt", res.data.token)
        navigate("/")

      }

    }).catch((err) => {

      console.log(err);

    })

  }


  return (


    <div>
<div className='new button'>
  <button onClick={() => navigate("/")}  >Back To Home</button>
</div>

      <div className="form1">
        <h1>LOG IN </h1>

        <form>

          <label>Email:
            <input type="Email" onChange={(e) => setemail(e.target.value)} />
          </label><br></br><br></br>

          <label> Password:
            <input type="password" onChange={(e) => setpassword(e.target.value)} />
          </label>
          <br></br><br></br>

        </form>

        <button className='txt1' onClick={handleClick}>Login</button>
        <a href="/register" >create account</a>
      </div>

    </div>
  )
}

export default Login
