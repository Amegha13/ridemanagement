
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")

app.use(cors({
    orgin: true
}))

app.get("/", (req, res) => {
    res.send("haiii")
})

app.use(express.json())

//making uploads folder static and access with api /uploads
app.use("/uploads", express.static("uploads"))

const imageupload = multer({

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },

        filename: (req, file, cb) => {

            cb(null, Date.now() + "-" + file.originalname)


        }
    })

})

console.log(Date.now() + "-" + "diya");


app.post("/fileuploads", imageupload.single("file"), (req, res) => {
    console.log(req.file);

    res.send("upload image success")

})


app.post("/", (req, res) => {


    const { name, email, password } = req.body

    console.log(email);


    res.send(req.body)

})

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String

    },
    profile_image: {
        type: String
    }
})


const User = mongoose.model("USER", userSchema)

app.post("/Register", imageupload.single("file"), (req, res) => {

    console.log(req.file);

    User.findOne({ email: req.body.email }).then((user_present) => {
        console.log(user_present);

        if (user_present) {
            res.send("User already present")
        } else {


            bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
                console.log(hashedPassword);
                if (hashedPassword) {

                    const table = User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword,
                        profile_image: req.file.path

                    })


                    table.save().then(() => {
                        res.send("saved success")
                    }
                    ).catch((err) => {
                        res.send("failed")
                    })
                }
            }).catch(err => {
                res.send("cannot hash password")
            })


        }

    })

})


app.post("/Login", (req, res) => {
    User.findOne({ email: req.body.email }).then((user_present) => {
        console.log(user_present);
        if (user_present) {

            bcrypt.compare(req.body.password, user_present.password, (err, result) => {
                if (err) {
                    res.send({ token: null, msg: "error on comparing passwords" })

                } else {
                    if (result) {

                        const token = jwt.sign(req.body.email, "amegha133")
                        console.log(token);
                        res.send({ token: token, msg: "Login success" })
                    } else {
                        res.send({ token: null, msg: "not matching" })
                    }
                }
            })

        } else {
            res.send({ token: null, msg: "login not success" })
        }

    }).catch(err => {
        res.send({ token: null, msg: "something went wrong" })

    })

})


app.post("/getUser", (req, res) => {
    const token = req.body.token;

    // console.log(token);


    jwt.verify(token, "amegha133", (err, decoded) => {
        if (err) {
            res.send("jwt verification failed")

        } else {

            console.log(decoded);

            User.findOne({ email: decoded }).then(user_present => {
                console.log(user_present);
                res.send(user_present)
            })

        }
    })


})

const rideschema = new mongoose.Schema({
    ridename: {
        type: String,
    },
    ridedesc: {
        type: String,
    },
    rideimg: {
        type: String,
    }
})

const Ride = mongoose.model("RIDE", rideschema)

app.post("/addride", imageupload.single("rideimage"), (req, res) => {

    console.log(req.body);
    console.log(req.file);

    const ride = Ride({
        ridename: req.body.ridename,
        ridedesc: req.body.ridedescription,
        rideimg: req.file.path

    })

    ride.save().then(() => {
        res.send("ride add success")
    }).catch(err => {
        res.send(err)
    })

})

app.post("/viewride", (req, res) => {
    Ride.find().then(ride_output => {
        res.send(ride_output)
    }).catch(err => {
        res.send(err)
    })
})


//view ride with rideid
app.post("/ride_with_id/:id", (req, res) => {

    const id = req.params.id

    Ride.findById({ _id: id }).then(ride_output => {
        res.send(ride_output)
    }).catch(err => {
        res.send(err)
    })
})



// app.post("/addfeedback",(req,res) => {
//     Ride.find().then(ride_output => {
//         res.send(ride_output)
//     }).catch(err =>{
//         res.send(err)
//     })
// })


const feedbackSchema = new mongoose.Schema({
    feedbackname: String,
    feedbackdesc: String,
    ride_id: String,
    ride_name: String,
    verify: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


app.post('/addfeedback', async (req, res) => {
    try {
        const { feedbackname, feedbackdesc, ride_id, ride_name } = req.body;
        const feedback = new Feedback({ feedbackname, feedbackdesc, ride_id, ride_name });
        await feedback.save();
        res.status(201).json({ message: 'Feedback added successfully', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post("/viewfeedback", (req, res) => {
    Feedback.find({ride_id:req.params.rideid}).then(feedback_output => {
        console.log(feedback_output);
        res.send(feedback_output)

    }).catch(err => {
        res.send(err)
    })
})

mongoose.connect("mongodb+srv://ameghak265:pUMlmgSkdlKu6CXm@cluster0.jyqkgc0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log("not connected", err);
}
)


app.listen(1003, () => {
    console.log("server listen at port 1003");
})






