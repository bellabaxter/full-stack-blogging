import express from "express";
import cors from "cors";
import signupRouter from "./routes/signup.js";
import postRouter from "./routes/posts.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'https://full-stack-blogging-front.onrender.com',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const uploadDir = path.resolve("../frontend/public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '_' + Date.now() 
        + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json(file.filename);
});


app.use("/api/signup", signupRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRoute);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
