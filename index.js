// import connectToMongo from "./database/db.js";
// import express from "express";
// import cors from 'cors';
// import auth from './routes/auth.js';
// import notes from './routes/notes.js';

// // database connection to backend
// connectToMongo();


// // create express app
// const app = express();
// const port = 2000;

// //* middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.get('/', (req, res) => {
//     res.json("eNotebook backend Api")
// });

// //* Available routes
// app.use('/api/auth', auth)
// app.use('/api/notes', notes)

// /* 
// INEFFICIENT WAY OF USING 
//     app.get('/', (req, res)  => {
//         res.send('hello world')
//     })

//     app.get('/api/login', (req, res) => {
//         res.send('api is logged in')
//     })

//     app.get('/api/signup', (req, res) => {
//         res.send('api is signed up')
//     }) 
// */

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// ✅ Fix CORS Error
app.use(cors({
    origin: "https://e-notebook-frontend-main.vercel.app", // ✅ Allow frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));
app.options('*', cors()); // ✅ Handle preflight requests

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => console.log("MongoDB Connection Error:", error));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Welcome to eNotebook API");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
