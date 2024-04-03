import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {


    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [imagepath, setimagepath] = useState("")

    const navigate = useNavigate()

    const getUser = () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            axios.post("http://localhost:1003/getUser", {
                token: token
            }).then((res) => {
                console.log(res.data.email);
                setimagepath(res.data.profile_image)
                setname(res.data.name)
                setemail(res.data.email)

            }).catch((err) => {
                console.log(err);
            })
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {

        getUser()

    }, [])


    return (
        <>
            <button onClick={() => navigate("/")}  >Back To Home</button>

            <div className='Heading'>
                <h1>Profile page</h1><br></br>

                <div>

                    {/* Username:{name}
            Email:{email}
         password:{password} 
            
        */}
                </div>
                <img src={"http://localhost:1003/" + imagepath} />
                <br></br>

                <div className='container'>

                    <h2><b>{name}</b></h2>
                    <h2><b>{email}</b></h2>

                    <h2></h2>
                </div>
            </div>
        </>

    )
}

export default Profile

