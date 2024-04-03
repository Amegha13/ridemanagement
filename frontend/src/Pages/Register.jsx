import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Register() {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [image, setimage] = useState(null)


  const navigate = useNavigate()


  const handleClick = () => {



    const formData = new FormData()

    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("file", image)

    console.log({ name, email, password });


    axios.post("http://localhost:1003/Register", formData)
      .then((res) => {
        console.log(res.data);
        navigate("/Login")
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (

    <div>
      <div className='Headings'>
        <h1>Register</h1><br></br>

        <div className='bb'>
          <label>Enter Your Username:
            <input type="text" onChange={(e) => setname(e.target.value)} />
          </label><br /><br />
        </div>
        <div className='cc'>
          <label>Enter Your Email:
            <input type="email" onChange={(e) => setemail(e.target.value)} />
          </label><br /><br />
        </div>

        <div className='rr'>
          <label>Enter Your Password:
            <input type="password" onChange={(e) => setpassword(e.target.value)} />
          </label>
        </div>
        <br /><br />

        <div className='zz'>

          <label>profile:
            <input type="file"onChange={(e) => setimage(e.target.files[0])} />
          </label><br /><br />
          
          <button className='txtt' onClick={handleClick}> Sumbit</button>

        </div>

      </div>

    </div>


  )
}

export default Register


