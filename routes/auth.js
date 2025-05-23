// import express from 'express';
// import User from "../models/users.js";
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken";
// import 'dotenv/config';
// import fetchUser from "../middleware/fetchUser.js";

// const router = express.Router();

// /*
//     router.get('/', (req, res) => {
//         let obj = {
//             name: "Kamal Nayan Upadhyay",
//             rollNumber: 15,
//             branch: "CSE"
//         }
//         res.json(obj);
//     })

//     router.post('/', (req, res) => {
//         console.log(req.body);
//         const user = User(req.body);
//         user.save();
//         res.send(req.body);
// })
// */

// //* ROUTE 1 : Create a User using: POST "/api/auth/signup". No login required
// router.post('/signup', async (req, res) => {
    
//     //* data comimg from body(frontend)
//     const { name, email, password } = (req.body);

//     try{
//         //* Validation
//         if( !name || !email || !password){
//             return res.status(400).json({ error: "All fields are required" });
//         }
//         //* Email Validation 
//         if(!email.includes("@")){
//             return res.status(400).json({ error: "Please enter a valid email" })
//         }

//         //* Find Unique User with email
//         const user = await User.findOne({ email });

//         if(user){
//             return res.status(400).json({ error: "email already exists"})
//         }

//         //* Byccript the password
//         //* generating salt 
//         const salt = await bcrypt.genSalt(10);

//         //* hash password
//         const hashedPassword = await bcrypt.hash(password, salt);

//         //* Save Data into database
//         const newUser = await User({
//             name, email, password : hashedPassword
//         })

//         await newUser.save();

//         console.log(newUser);
//         res.status(201).json({success: "Signup Successfully"})
        
//     } catch(error){
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// })

// //* ROUTE 2 : Login a User using: POST "/api/auth/login". No login required
// router.post('/login', async (req, res) => {
//     //* data comimg from body(frontend)
//     const { email, password } = req.body;

//     try {
//         //* Validation 
//         if (!email || !password) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         //* Email Validation 
//         if (!email.includes("@")) {
//             return res.status(400).json({ error: "Please enter a valid email" });
//         }

//         //* Find Unique User with email
//         const user = await User.findOne({ email });

//         console.log(user);

//         //* if user not exists with that email
//         if (!user) {
//             res.status(400).json({ error: "User Not Found" });
//         }

//         //* matching user password to hash password with bcrypt.compare()
//         const doMatch = await bcrypt.compare(password, user.password);
//         console.log(doMatch);

//         //* if match password then generate token 
//         if (doMatch) {
//             const token = jwt.sign({ userId: user.id }, "" + process.env.JWT_SECRET, {
//                 expiresIn: '7d'
//             })

//             res.status(201).json({ token });
//         }
//         else {
//             res.status(404).json({ error: 'Email And Password Not Found' });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// })

// //* ROUTE 3 : get logged in User details using: POST "/api/auth/getuser". login required

// router.get("/getuser", fetchUser, async (req, res) => {
//     try{
//         const userId = req.userId;
    
//         const user = await User.findById(userId).select("-password");
//         res.send(user);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// /*
// router.post('/getuser', fetchUser, async (req, res) => {
//     try {
//         const userId = req.userId;
//         console.log("getuser Id", userId);

//         const user = await User.findById(userId).select("-password");
//         res.send(user);

//         console.log("getuser", user);
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }
// })
// */
// export default router;

import express from "express";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetchUser from "../middleware/fetchUser.js";

dotenv.config();
const router = express.Router();

// ✅ ROUTE 1: Signup
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // ✅ Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Email Validation
        if (!email.includes("@")) {
            return res.status(400).json({ error: "Please enter a valid email" });
        }

        // ✅ Check if user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // ✅ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Save user to DB
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: "Signup successful" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ ROUTE 2: Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const doMatch = await bcrypt.compare(password, user.password);
        if (!doMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ ROUTE 3: Get User
router.get("/getuser", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
