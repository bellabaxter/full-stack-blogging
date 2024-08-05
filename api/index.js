// import express from "express";
// import cors from "cors";
// import signupRouter from "./routes/signup.js";
// import postRouter from "./routes/posts.js";
// import userRoute from "./routes/users.js";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const app = express();
// const port = process.env.PORT;

// app.use(cors({
//     origin: 'https://full-stack-blogging-frontend-9zoz3s5lb-mahaks-projects-d83aed4b.vercel.app/',
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// const uploadDir = path.resolve("../frontend/public/uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null,file.fieldname + '_' + Date.now() 
//         + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage });


// app.post("/api/upload", upload.single("file"), function (req, res) {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }
//     res.status(200).json(file.filename);
// });


// app.use("/api/signup", signupRouter);
// app.use("/api/posts", postRouter);
// app.use("/api/users", userRoute);


// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });

import express from 'express';
import cors from 'cors';
import signupRouter from './routes/signup.js';
import postRouter from './routes/posts.js';
import userRoute from './routes/users.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
    origin: 'https://full-stack-blogging-frontend-9zoz3s5lb-mahaks-projects-d83aed4b.vercel.app',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

// Configure Multer to use Cloudinary
const storage = multerStorageCloudinary({
    cloudinary: cloudinary,
    folder: 'uploads', // You can adjust the folder name as needed
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Allow specific formats
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // `req.file` contains information about the uploaded file
    res.status(200).json({
        url: req.file.secure_url, // Cloudinary URL of the uploaded file
        public_id: req.file.public_id, // Cloudinary public ID of the file
    });
});

app.use('/api/signup', signupRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
