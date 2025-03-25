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


import connectToMongo from "./database/db.js";
import express from "express";
import cors from 'cors';
import auth from './routes/auth.js';
import notes from './routes/notes.js';

// database connection to backend
connectToMongo();

// create express app
const app = express();
const port = process.env.PORT || 2000;  // ✅ Use dynamic port for Vercel

//* middleware
app.use(express.json());
app.use(cors({
    origin: "https://e-notebook-frontend-main-git-main-alok21296s-projects.vercel.app", 
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));
app.options('*', cors());  // ✅ Allow preflight requests

// Routes
app.get('/', (req, res) => {
    res.json("eNotebook backend API");
});

//* Available routes
app.use('/api/auth', auth);
app.use('/api/notes', notes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
